import { useState, useEffect, useRef } from 'react';
import imgHue from "figma:asset/6ea72ef8462da9867a998ac36b79c812e922b4a7.png";

interface CustomColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  onClose: () => void;
  savedColors?: string[];
  onSaveColor?: (color: string) => void;
  onRemoveColor?: (color: string) => void;
  position?: 'top' | 'bottom';
  buttonRef?: React.RefObject<HTMLButtonElement>;
  warpColor?: string;
  weftColor?: string;
}

// Convert hex to HSV
function hexToHSV(hex: string): { h: number; s: number; v: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  if (diff !== 0) {
    if (max === r) {
      h = 60 * (((g - b) / diff) % 6);
    } else if (max === g) {
      h = 60 * ((b - r) / diff + 2);
    } else {
      h = 60 * ((r - g) / diff + 4);
    }
  }
  if (h < 0) h += 360;

  const s = max === 0 ? 0 : diff / max;
  const v = max;

  return { h, s, v };
}

// Convert HSV to hex
function hsvToHex(h: number, s: number, v: number): string {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r = 0, g = 0, b = 0;
  if (h >= 0 && h < 60) {
    r = c; g = x; b = 0;
  } else if (h >= 60 && h < 120) {
    r = x; g = c; b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0; g = c; b = x;
  } else if (h >= 180 && h < 240) {
    r = 0; g = x; b = c;
  } else if (h >= 240 && h < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function CustomColorPicker({ 
  color, 
  onChange, 
  onClose, 
  savedColors = [], 
  onSaveColor,
  onRemoveColor,
  position = 'bottom',
  buttonRef,
  warpColor,
  weftColor
}: CustomColorPickerProps) {
  const { h: initialH, s: initialS, v: initialV } = hexToHSV(color);
  const [hue, setHue] = useState(initialH);
  const [saturation, setSaturation] = useState(initialS);
  const [value, setValue] = useState(initialV);
  const [hexInput, setHexInput] = useState(color.toUpperCase());
  
  const colorspaceRef = useRef<HTMLDivElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  const saturationRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const [actualPosition, setActualPosition] = useState<'top' | 'bottom'>(position);
  const [pickerCoords, setPickerCoords] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    const newColor = hsvToHex(hue, saturation, value);
    setHexInput(newColor.toUpperCase());
    onChange(newColor);
  }, [hue, saturation, value]);

  // Calculate picker position from buttonRef
  useEffect(() => {
    const calculatePosition = () => {
      if (!buttonRef?.current || !pickerRef.current) {
        // Fallback: render at screen center if no button ref
        setPickerCoords({ top: window.innerHeight / 2 - 250, left: window.innerWidth / 2 - 110 });
        return;
      }
      
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const pickerRect = pickerRef.current.getBoundingClientRect();
      
      const PICKER_WIDTH = 220;
      const PICKER_HEIGHT = pickerRect.height || 450; // Use actual or estimated height
      const GAP = 8;
      
      // Calculate horizontal position (center picker under button)
      let left = buttonRect.left + (buttonRect.width / 2) - (PICKER_WIDTH / 2);
      
      // Clamp to viewport
      left = Math.max(20, Math.min(left, window.innerWidth - PICKER_WIDTH - 20));
      
      // Calculate vertical position
      let top: number;
      let finalPosition: 'top' | 'bottom' = position;
      
      if (position === 'top') {
        top = buttonRect.top - PICKER_HEIGHT - GAP;
        // Check if would overflow top
        if (top < 20) {
          top = buttonRect.bottom + GAP;
          finalPosition = 'bottom';
        }
      } else {
        top = buttonRect.bottom + GAP;
        // Check if would overflow bottom
        if (top + PICKER_HEIGHT > window.innerHeight - 20) {
          top = buttonRect.top - PICKER_HEIGHT - GAP;
          finalPosition = 'top';
        }
      }
      
      // CRITICAL: Clamp top to viewport to ensure all content is visible
      top = Math.max(20, Math.min(top, window.innerHeight - PICKER_HEIGHT - 20));
      
      setPickerCoords({ top, left });
      setActualPosition(finalPosition);
    };
    
    // Initial position immediately, then refine after layout
    calculatePosition();
    
    // Recalculate after a short delay to get accurate measurements
    const timer = setTimeout(calculatePosition, 50);
    return () => clearTimeout(timer);
  }, [buttonRef, position]);

  const handleColorspaceClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!colorspaceRef.current) return;
    const rect = colorspaceRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    setSaturation(x);
    setValue(1 - y);
  };

  const handleHueSlider = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hueRef.current) return;
    const rect = hueRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHue(x * 360);
  };

  const handleSaturationSlider = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!saturationRef.current) return;
    const rect = saturationRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setSaturation(x);
  };

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.toUpperCase();
    if (!input.startsWith('#')) input = '#' + input;
    setHexInput(input);
    
    if (/^#[0-9A-F]{6}$/i.test(input)) {
      const { h, s, v } = hexToHSV(input);
      setHue(h);
      setSaturation(s);
      setValue(v);
    }
  };

  const handleAddColor = () => {
    if (onSaveColor) {
      onSaveColor(hexInput);
    }
  };

  const pureHueColor = hsvToHex(hue, 1, 1);

  // Add click-outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node) &&
          buttonRef?.current && !buttonRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, buttonRef]);

  return (
    <div 
      ref={pickerRef}
      className="bg-white rounded-[8px] shadow-[0px_10px_15px_0px_rgba(31,41,55,0.1),0px_4px_6px_0px_rgba(31,41,55,0.05)] z-[100] w-[220px]"
      style={{
        position: 'fixed',
        top: pickerCoords ? `${pickerCoords.top}px` : '50%',
        left: pickerCoords ? `${pickerCoords.left}px` : '50%',
        transform: pickerCoords ? 'none' : 'translate(-50%, -50%)'
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="box-border flex flex-col gap-[12px] p-[12px]">
        {/* Colorspace */}
        <div 
          ref={colorspaceRef}
          className="h-[188px] rounded-[4px] cursor-crosshair relative"
          style={{ 
            background: `linear-gradient(0deg, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%), ${pureHueColor}`
          }}
          onMouseDown={(e) => {
            handleColorspaceClick(e);
            const handleMove = (moveEvent: MouseEvent) => {
              if (!colorspaceRef.current) return;
              const rect = colorspaceRef.current.getBoundingClientRect();
              const x = Math.max(0, Math.min(1, (moveEvent.clientX - rect.left) / rect.width));
              const y = Math.max(0, Math.min(1, (moveEvent.clientY - rect.top) / rect.height));
              setSaturation(x);
              setValue(1 - y);
            };
            const handleUp = () => {
              document.removeEventListener('mousemove', handleMove);
              document.removeEventListener('mouseup', handleUp);
            };
            document.addEventListener('mousemove', handleMove);
            document.addEventListener('mouseup', handleUp);
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            if (!colorspaceRef.current) return;
            const touch = e.touches[0];
            const rect = colorspaceRef.current.getBoundingClientRect();
            const x = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
            const y = Math.max(0, Math.min(1, (touch.clientY - rect.top) / rect.height));
            setSaturation(x);
            setValue(1 - y);

            const handleTouchMove = (moveEvent: TouchEvent) => {
              if (!colorspaceRef.current) return;
              const touch = moveEvent.touches[0];
              const rect = colorspaceRef.current.getBoundingClientRect();
              const x = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
              const y = Math.max(0, Math.min(1, (touch.clientY - rect.top) / rect.height));
              setSaturation(x);
              setValue(1 - y);
            };
            const handleTouchEnd = () => {
              document.removeEventListener('touchmove', handleTouchMove);
              document.removeEventListener('touchend', handleTouchEnd);
            };
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleTouchEnd);
          }}
        >
          {/* Color picker cursor */}
          <div 
            className="absolute w-[12px] h-[12px] border-2 border-white rounded-full shadow-lg pointer-events-none"
            style={{
              left: `${saturation * 100}%`,
              top: `${(1 - value) * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>

        {/* Hue slider */}
        <div className="h-[14px] relative rounded-[100px] w-full">
          <div 
            ref={hueRef}
            className="absolute h-[14px] left-0 right-0 rounded-[100px] cursor-pointer"
            onMouseDown={(e) => {
              handleHueSlider(e);
              const handleMove = (moveEvent: MouseEvent) => {
                if (!hueRef.current) return;
                const rect = hueRef.current.getBoundingClientRect();
                const x = Math.max(0, Math.min(1, (moveEvent.clientX - rect.left) / rect.width));
                setHue(x * 360);
              };
              const handleUp = () => {
                document.removeEventListener('mousemove', handleMove);
                document.removeEventListener('mouseup', handleUp);
              };
              document.addEventListener('mousemove', handleMove);
              document.addEventListener('mouseup', handleUp);
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              if (!hueRef.current) return;
              const touch = e.touches[0];
              const rect = hueRef.current.getBoundingClientRect();
              const x = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
              setHue(x * 360);

              const handleTouchMove = (moveEvent: TouchEvent) => {
                if (!hueRef.current) return;
                const touch = moveEvent.touches[0];
                const rect = hueRef.current.getBoundingClientRect();
                const x = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
                setHue(x * 360);
              };
              const handleTouchEnd = () => {
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleTouchEnd);
              };
              document.addEventListener('touchmove', handleTouchMove, { passive: false });
              document.addEventListener('touchend', handleTouchEnd);
            }}
          >
            <img alt="" className="absolute inset-0 object-cover pointer-events-none rounded-[100px] w-full h-full" src={imgHue} />
          </div>
          <div 
            className="absolute top-0 w-[14px] h-[14px] pointer-events-none"
            style={{ left: `${(hue / 360) * 100}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute inset-[-50%_-50%_-50%_-50%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
                <g filter="url(#filter0_dd_hue)" id="Ellipse 1">
                  <circle cx="14" cy="14" r="6" stroke="white" strokeWidth="2" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="28" id="filter0_dd_hue" width="28" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="3" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.121569 0 0 0 0 0.160784 0 0 0 0 0.215686 0 0 0 0.1 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_hue" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="2" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.121569 0 0 0 0 0.160784 0 0 0 0 0.215686 0 0 0 0.06 0" />
                    <feBlend in2="effect1_dropShadow_hue" mode="normal" result="effect2_dropShadow_hue" />
                    <feBlend in="SourceGraphic" in2="effect2_dropShadow_hue" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Saturation slider */}
        <div className="h-[14px] relative rounded-[100px] w-full">
          <div 
            ref={saturationRef}
            className="absolute h-[14px] left-0 right-0 rounded-[100px] cursor-pointer"
            style={{
              background: `linear-gradient(90deg, white 0%, ${pureHueColor} 100%)`
            }}
            onMouseDown={(e) => {
              handleSaturationSlider(e);
              const handleMove = (moveEvent: MouseEvent) => {
                if (!saturationRef.current) return;
                const rect = saturationRef.current.getBoundingClientRect();
                const x = Math.max(0, Math.min(1, (moveEvent.clientX - rect.left) / rect.width));
                setSaturation(x);
              };
              const handleUp = () => {
                document.removeEventListener('mousemove', handleMove);
                document.removeEventListener('mouseup', handleUp);
              };
              document.addEventListener('mousemove', handleMove);
              document.addEventListener('mouseup', handleUp);
            }}
            onTouchStart={(e) => {
              e.preventDefault();
              if (!saturationRef.current) return;
              const touch = e.touches[0];
              const rect = saturationRef.current.getBoundingClientRect();
              const x = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
              setSaturation(x);

              const handleTouchMove = (moveEvent: TouchEvent) => {
                if (!saturationRef.current) return;
                const touch = moveEvent.touches[0];
                const rect = saturationRef.current.getBoundingClientRect();
                const x = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
                setSaturation(x);
              };
              const handleTouchEnd = () => {
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleTouchEnd);
              };
              document.addEventListener('touchmove', handleTouchMove, { passive: false });
              document.addEventListener('touchend', handleTouchEnd);
            }}
          />
          <div 
            className="absolute top-0 w-[14px] h-[14px] pointer-events-none"
            style={{ left: `${saturation * 100}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute inset-[-50%_-50%_-50%_-50%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
                <g filter="url(#filter0_dd_sat)" id="Ellipse 1">
                  <circle cx="14" cy="14" r="6" stroke="white" strokeWidth="2" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="28" id="filter0_dd_sat" width="28" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="3" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.121569 0 0 0 0 0.160784 0 0 0 0 0.215686 0 0 0 0.1 0" />
                    <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_sat" />
                    <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="2" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.121569 0 0 0 0 0.160784 0 0 0 0 0.215686 0 0 0 0.06 0" />
                    <feBlend in2="effect1_dropShadow_sat" mode="normal" result="effect2_dropShadow_sat" />
                    <feBlend in="SourceGraphic" in2="effect2_dropShadow_sat" mode="normal" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Hex input */}
        <div className="flex gap-[8px] items-center">
          <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[4px]">
            <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_1px_2px_0px_rgba(31,41,55,0.08)]" />
            <div className="flex flex-row items-center size-full">
              <input
                type="text"
                value={hexInput}
                onChange={handleHexInput}
                className="box-border w-full px-[6px] py-[4px] font-['Inter',sans-serif] text-[14px] text-gray-700 bg-transparent border-none outline-none leading-[20px]"
                placeholder="#000000"
              />
            </div>
          </div>
          <div className="w-[61.333px] bg-white relative rounded-[4px] shrink-0">
            <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_1px_2px_0px_rgba(31,41,55,0.08)]" />
            <div className="px-[6px] py-[4px] font-['Inter',sans-serif] text-[14px] text-gray-700 text-center leading-[20px]">
              {Math.round(value * 100)}%
            </div>
          </div>
        </div>

        {/* Saved Colors */}
        {onSaveColor && (
          <>
            <div className="flex font-['Inter',sans-serif] font-medium items-center justify-between text-[12px]">
              <div className="text-gray-700 leading-[16px]">Saved colors:</div>
              <button 
                onClick={handleAddColor}
                className="text-gray-500 leading-[16px] hover:text-gray-700 cursor-pointer"
              >
                + Add
              </button>
            </div>
            
            {savedColors.length > 0 && (
              <div className="flex flex-wrap gap-[8px]">
                {savedColors.map((savedColor, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const { h, s, v } = hexToHSV(savedColor);
                      setHue(h);
                      setSaturation(s);
                      setValue(v);
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      if (onRemoveColor) {
                        onRemoveColor(savedColor);
                      }
                    }}
                    className="rounded-[100px] size-[24px] cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: savedColor }}
                    title={`${savedColor} (right-click to remove)`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}