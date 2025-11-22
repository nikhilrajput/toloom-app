import imgHue from "../imports/ColorPicker-90-1275.tsx";
import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  onClose: () => void;
  title?: string;
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

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function ColorPicker({ color, onChange, onClose, title = "Color Picker", warpColor, weftColor }: ColorPickerProps) {
  const [hsv, setHsv] = useState(hexToHSV(color));
  const [hexInput, setHexInput] = useState(color.replace('#', '').toUpperCase());
  
  // Default colors that should always be present
  const defaultColors = [warpColor.toUpperCase(), weftColor.toUpperCase()];
  
  // Initialize with default colors, ensuring they're always included
  const [savedColors, setSavedColors] = useState<string[]>(() => {
    const normalizedWarp = warpColor.toUpperCase();
    const normalizedWeft = weftColor.toUpperCase();
    return [normalizedWarp, normalizedWeft];
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
    setHexInput(color.replace('#', '').toUpperCase());
  }, [color]);

  const updateColor = (newHsv: { h: number; s: number; v: number }) => {
    const newColor = hsvToHex(newHsv.h, newHsv.s, newHsv.v);
    setHsv(newHsv);
    setHexInput(newColor.replace('#', '').toUpperCase());
    onChange(newColor);
  };

  const handleColorspaceClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!colorspaceRef.current) return;
    const rect = colorspaceRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    updateColor({ h: hsv.h, s: x, v: 1 - y });
  };

  const handleHueClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hueRef.current) return;
    const rect = hueRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const h = Math.round(x * 360);
    updateColor({ h, s: hsv.s, v: hsv.v });
  };

  const handleHexInputChange = (value: string) => {
    setHexInput(value.toUpperCase());
    const cleanValue = value.replace('#', '');
    if (/^[0-9A-Fa-f]{6}$/.test(cleanValue)) {
      const newHsv = hexToHSV(`#${cleanValue}`);
      setHsv(newHsv);
      onChange(`#${cleanValue}`);
    }
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

  const handleRemoveSwatch = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const colorToRemove = savedColors[index];
    
    // Check if this is a default color (warp or weft) - prevent removal
    if (defaultColors.includes(colorToRemove.toUpperCase())) {
      return; // Don't allow removal of default colors
    }
    
    setSavedColors(savedColors.filter((_, i) => i !== index));
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

  // Mouse move handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingColorspace && colorspaceRef.current) {
        const rect = colorspaceRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
        updateColor({ h: hsv.h, s: x, v: 1 - y });
      } else if (isDraggingHue && hueRef.current) {
        const rect = hueRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const h = Math.round(x * 360);
        updateColor({ h, s: hsv.s, v: hsv.v });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDraggingColorspace && colorspaceRef.current) {
        const touch = e.touches[0];
        const rect = colorspaceRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (touch.clientY - rect.top) / rect.height));
        updateColor({ h: hsv.h, s: x, v: 1 - y });
      } else if (isDraggingHue && hueRef.current) {
        const touch = e.touches[0];
        const rect = hueRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
        const h = Math.round(x * 360);
        updateColor({ h, s: hsv.s, v: hsv.v });
      }
    };

    const handleMouseUp = () => {
      setIsDraggingColorspace(false);
      setIsDraggingHue(false);
    };

    const handleTouchEnd = () => {
      setIsDraggingColorspace(false);
      setIsDraggingHue(false);
    };

    if (isDraggingColorspace || isDraggingHue) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDraggingColorspace, isDraggingHue, hsv.h]);

  return (
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[100]">
      <div 
        ref={pickerRef}
        className="bg-white relative rounded-[8px] shadow-[0px_10px_15px_0px_rgba(31,41,55,0.1),0px_4px_6px_0px_rgba(31,41,55,0.05)] w-[280px]"
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X className="size-4" />
        </button>

        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px]">
          {/* Colorspace */}
          <div 
            ref={colorspaceRef}
            className="relative w-full h-[176px] rounded-[4px] cursor-crosshair"
            style={{ 
              backgroundImage: `linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, ${pureHueColor} 100%), linear-gradient(0deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)`,
              backgroundBlendMode: 'multiply, normal'
            }}
            onClick={handleColorspaceClick}
            onMouseDown={(e) => {
              setIsDraggingColorspace(true);
              handleColorspaceClick(e);
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              setIsDraggingColorspace(true);
              if (!colorspaceRef.current) return;
              const touch = e.touches[0];
              const rect = colorspaceRef.current.getBoundingClientRect();
              const x = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
              const y = Math.max(0, Math.min(1, (touch.clientY - rect.top) / rect.height));
              updateColor({ h: hsv.h, s: x, v: 1 - y });
            }}
          >
            {/* Colorspace cursor */}
            <div 
              className="absolute w-[12px] h-[12px] border-2 border-white rounded-full shadow-md pointer-events-none"
              style={{ 
                left: `calc(${hsv.s * 100}% - 6px)`,
                top: `calc(${(1 - hsv.v) * 100}% - 6px)`,
              }}
            />
          </div>

          {/* Hue Slider */}
          <div 
            ref={hueRef}
            className="h-[8px] relative rounded-[100px] w-full cursor-pointer"
            onClick={handleHueClick}
            onMouseDown={(e) => {
              setIsDraggingHue(true);
              handleHueClick(e);
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              setIsDraggingHue(true);
              if (!hueRef.current) return;
              const touch = e.touches[0];
              const rect = hueRef.current.getBoundingClientRect();
              const x = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
              const h = Math.round(x * 360);
              updateColor({ h, s: hsv.s, v: hsv.v });
            }}
          >
            <div 
              className="absolute h-[8px] left-0 right-0 rounded-[100px] top-1/2 translate-y-[-50%]"
              style={{
                background: 'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
              }}
            />
            {/* Hue cursor */}
            <div 
              className="absolute bottom-0 top-0 w-[8px]"
              style={{ left: `calc(${(hsv.h / 360) * 100}% - 4px)` }}
            >
              <div className="absolute inset-[-37.5%_-87.5%_-137.5%_-87.5%]">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
                  <g filter="url(#filter0_dd_90_1295)" id="Ellipse 1">
                    <circle cx="11" cy="7" r="4" stroke="white" strokeWidth="2" />
                  </g>
                  <defs>
                    <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="22" id="filter0_dd_90_1295" width="22" x="0" y="0">
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="3" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0.121569 0 0 0 0 0.160784 0 0 0 0 0.215686 0 0 0 0.1 0" />
                      <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_90_1295" />
                      <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                      <feOffset dy="2" />
                      <feGaussianBlur stdDeviation="2" />
                      <feColorMatrix type="matrix" values="0 0 0 0 0.121569 0 0 0 0 0.160784 0 0 0 0 0.215686 0 0 0 0.06 0" />
                      <feBlend in2="effect1_dropShadow_90_1295" mode="normal" result="effect2_dropShadow_90_1295" />
                      <feBlend in="SourceGraphic" in2="effect2_dropShadow_90_1295" mode="normal" result="shape" />
                    </filter>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Hex Input Field */}
          <div className="w-full bg-white relative rounded-[4px] h-[32px]">
            <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_1px_2px_0px_rgba(31,41,55,0.08)]" />
            <div className="flex items-center h-full px-[8px]">
              <span className="text-gray-400 text-[14px] mr-1">#</span>
              <input
                type="text"
                value={hexInput}
                onChange={(e) => handleHexInputChange(e.target.value)}
                className="flex-1 outline-none bg-transparent text-[14px] text-gray-700 font-['Inter:Regular',sans-serif]"
                maxLength={6}
                placeholder="000000"
              />
            </div>
          </div>

          {/* Saved Colors Header */}
          <div className="content-stretch flex font-['Inter:Medium',sans-serif] font-medium items-center justify-between leading-[0] not-italic relative shrink-0 text-nowrap w-full">
            <div className="flex flex-col justify-center relative shrink-0 text-gray-700 text-[12px]">
              <p className="leading-[16px] text-nowrap whitespace-pre">Saved colors:</p>
            </div>
            <button 
              onClick={handleSaveColor}
              className="flex flex-col justify-center relative shrink-0 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer text-[14px]"
            >
              <p className="leading-[18px] text-nowrap whitespace-pre">+ Add</p>
            </button>
          </div>

          {/* Swatches - Dynamic grid */}
          {savedColors.length > 0 && (
            <div className="content-stretch flex flex-wrap gap-[8px] items-start relative shrink-0 w-full">
              {savedColors.map((savedColor, index) => {
                const isDefaultColor = defaultColors.includes(savedColor.toUpperCase());
                return (
                  <div key={index} className="relative group">
                    <button
                      onClick={() => handleSwatchClick(savedColor)}
                      className="rounded-[100px] shrink-0 size-[24px] hover:scale-110 transition-transform relative"
                      style={{ backgroundColor: savedColor }}
                      title={savedColor}
                    >
                      {savedColor === hsvToHex(hsv.h, hsv.s, hsv.v) && (
                        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[102px] shadow-[0px_0px_0px_2px_rgba(0,0,0,0.25)]" />
                      )}
                    </button>
                    {/* Only show remove button for non-default colors */}
                    {!isDefaultColor && (
                      <button
                        onClick={(e) => handleRemoveSwatch(index, e)}
                        className="absolute -top-1 -right-1 size-3 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] leading-none"
                      >
                        ×
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}