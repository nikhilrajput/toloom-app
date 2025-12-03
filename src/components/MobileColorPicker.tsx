import { useState, useRef, useEffect } from 'react';

interface MobileColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  onClose: () => void;
  warpColor: string;
  weftColor: string;
}

// Convert hex to HSV
function hexToHSV(hex: string): { h: number; s: number; v: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : delta / max;
  const v = max;

  return { h, s, v };
}

// Convert HSV to hex
function hsvToHex(h: number, s: number, v: number): string {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r = 0, g = 0, b = 0;
  if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
  else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
  else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
  else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
  else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
  else if (h >= 300 && h < 360) { r = c; g = 0; b = x; }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function MobileColorPicker({ color, onChange, onClose, warpColor, weftColor }: MobileColorPickerProps) {
  const [hsv, setHsv] = useState(hexToHSV(color));
  
  // Store original default colors on mount - these never change
  const [defaultColors] = useState<string[]>(() => [
    warpColor.toUpperCase(), 
    weftColor.toUpperCase()
  ]);
  
  // Initialize saved colors with defaults only once
  const [savedColors, setSavedColors] = useState<string[]>(() => {
    return [warpColor.toUpperCase(), weftColor.toUpperCase()];
  });
  
  const [isDraggingColorspace, setIsDraggingColorspace] = useState(false);
  const [isDraggingHue, setIsDraggingHue] = useState(false);
  
  const pickerRef = useRef<HTMLDivElement>(null);
  const colorspaceRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);

  // Get pure hue color for colorspace background
  const pureHueColor = hsvToHex(hsv.h, 1, 1);

  useEffect(() => {
    const newHsv = hexToHSV(color);
    setHsv(newHsv);
  }, [color]);

  const updateColor = (newHsv: { h: number; s: number; v: number }) => {
    const newColor = hsvToHex(newHsv.h, newHsv.s, newHsv.v);
    setHsv(newHsv);
    onChange(newColor);
  };

  const handleColorspaceInteraction = (clientX: number, clientY: number) => {
    if (!colorspaceRef.current) return;
    const rect = colorspaceRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    updateColor({ h: hsv.h, s: x, v: 1 - y });
  };

  const handleHueInteraction = (clientX: number) => {
    if (!hueRef.current) return;
    const rect = hueRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const h = Math.round(x * 360);
    updateColor({ h, s: hsv.s, v: hsv.v });
  };

  const handleSaveColor = () => {
    const currentColor = hsvToHex(hsv.h, hsv.s, hsv.v);
    if (!savedColors.includes(currentColor)) {
      setSavedColors([...savedColors, currentColor]);
    }
  };

  const handleSwatchClick = (swatchColor: string) => {
    const newHsv = hexToHSV(swatchColor);
    updateColor(newHsv);
  };

  const handleRemoveSwatch = (index: number, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const colorToRemove = savedColors[index];
    
    // Check if this is a default color (warp or weft) - prevent removal
    if (defaultColors.includes(colorToRemove.toUpperCase())) {
      return;
    }
    
    setSavedColors(savedColors.filter((_, i) => i !== index));
  };

  // Eyedropper functionality
  const handleEyeDropper = async () => {
    if ('EyeDropper' in window) {
      try {
        // @ts-ignore - EyeDropper API
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        const newHsv = hexToHSV(result.sRGBHex);
        updateColor(newHsv);
      } catch (e) {
        // User cancelled or error
      }
    }
  };

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Mouse/Touch move handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingColorspace) {
        handleColorspaceInteraction(e.clientX, e.clientY);
      } else if (isDraggingHue) {
        handleHueInteraction(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (isDraggingColorspace) {
        handleColorspaceInteraction(touch.clientX, touch.clientY);
      } else if (isDraggingHue) {
        handleHueInteraction(touch.clientX);
      }
    };

    const handleEnd = () => {
      setIsDraggingColorspace(false);
      setIsDraggingHue(false);
    };

    if (isDraggingColorspace || isDraggingHue) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleEnd);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleEnd);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDraggingColorspace, isDraggingHue, hsv.h, hsv.s, hsv.v]);

  const currentColor = hsvToHex(hsv.h, hsv.s, hsv.v);

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[100] p-4">
      <div 
        ref={pickerRef}
        className="bg-[#F5F3F5] relative rounded-[16px] shadow-[0px_10px_30px_0px_rgba(0,0,0,0.15)] w-full max-w-[300px] p-4"
      >
        {/* Value Spectrum (Saturation/Brightness) */}
        <div 
          ref={colorspaceRef}
          className="relative w-full aspect-square rounded-[12px] cursor-crosshair touch-none mb-4"
          style={{ 
            backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, ${pureHueColor} 100%), linear-gradient(0deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)`,
            backgroundBlendMode: 'multiply, normal'
          }}
          onMouseDown={(e) => {
            setIsDraggingColorspace(true);
            handleColorspaceInteraction(e.clientX, e.clientY);
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            setIsDraggingColorspace(true);
            const touch = e.touches[0];
            handleColorspaceInteraction(touch.clientX, touch.clientY);
          }}
        >
          {/* Colorspace cursor */}
          <div 
            className="absolute w-[20px] h-[20px] border-[3px] border-white rounded-full shadow-[0px_2px_8px_rgba(0,0,0,0.3)] pointer-events-none"
            style={{ 
              left: `calc(${hsv.s * 100}% - 10px)`,
              top: `calc(${(1 - hsv.v) * 100}% - 10px)`,
              backgroundColor: currentColor
            }}
          />
        </div>

        {/* Eyedropper and Hue Slider Row */}
        <div className="flex items-center gap-3 mb-4">
          {/* Eyedropper Button */}
          {'EyeDropper' in window && (
            <button
              onClick={handleEyeDropper}
              className="size-[36px] flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
              title="Pick color from screen"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#72686F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m2 22 1-1h3l9-9"/>
                <path d="M3 21v-3l9-9"/>
                <path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z"/>
              </svg>
            </button>
          )}

          {/* Hue Slider */}
          <div 
            ref={hueRef}
            className="flex-1 h-[24px] relative rounded-full cursor-pointer touch-none"
            onMouseDown={(e) => {
              setIsDraggingHue(true);
              handleHueInteraction(e.clientX);
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              setIsDraggingHue(true);
              const touch = e.touches[0];
              handleHueInteraction(touch.clientX);
            }}
          >
            <div 
              className="absolute h-full left-0 right-0 rounded-full"
              style={{
                background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
              }}
            />
            {/* Hue cursor */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-[20px] h-[20px] border-[3px] border-white rounded-full shadow-[0px_2px_8px_rgba(0,0,0,0.3)] pointer-events-none"
              style={{ 
                left: `calc(${(hsv.h / 360) * 100}% - 10px)`,
                backgroundColor: hsvToHex(hsv.h, 1, 1)
              }}
            />
          </div>
        </div>

        {/* Saved Colors */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[14px] text-[#72686F] font-medium">Saved</span>
          <button 
            onClick={handleSaveColor}
            className="text-[14px] text-[#8B7990] hover:text-[#72686F] transition-colors cursor-pointer font-medium"
          >
            + Add
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {savedColors.map((savedColor, index) => {
            const isDefaultColor = defaultColors.includes(savedColor.toUpperCase());
            const isSelected = savedColor.toUpperCase() === currentColor.toUpperCase();
            return (
              <div key={index} className="relative size-[32px]">
                <button
                  onClick={() => handleSwatchClick(savedColor)}
                  className="rounded-full w-[32px] h-[32px] transition-transform active:scale-95 cursor-pointer"
                  style={{ backgroundColor: savedColor }}
                  title={savedColor}
                />
                {isSelected && (
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[38px] h-[38px] border-[2px] border-white rounded-full pointer-events-none"
                    style={{ boxShadow: '0px 0px 0px 2px rgba(0,0,0,0.2)' }}
                  />
                )}
                {/* Remove button for non-default colors */}
                {!isDefaultColor && (
                  <button
                    onClick={(e) => handleRemoveSwatch(index, e)}
                    onTouchEnd={(e) => handleRemoveSwatch(index, e)}
                    className="absolute -top-1 -right-1 size-4 bg-[#9A8494] text-white rounded-full flex items-center justify-center text-[12px] leading-none cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
