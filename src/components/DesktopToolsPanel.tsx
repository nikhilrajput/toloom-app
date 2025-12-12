import svgPaths from "../imports/svg-99sv6ds4ul";
import { CustomColorPicker } from './CustomColorPicker';
import { useRef } from 'react';

interface DesktopToolsPanelProps {
  warpColor: string;
  weftColor: string;
  onWarpColorChange: (color: string) => void;
  onWeftColorChange: (color: string) => void;
  selectedDrafts: number[];
  onToggleDraft: (draft: number) => void;
  threadSize: number;
  onThreadSizeChange: (size: number) => void;
  onAddWarpRow: () => void;
  onAutoWeave: () => void;
  onUndo: () => void;
  onDeleteAll: () => void;
  toolbarsVisible: boolean;
  onToggleToolbars: () => void;
  onShare?: () => void;
  onLearn?: () => void;
  onClose?: () => void;
  sliderExpanded: boolean;
  onSliderToggle: () => void;
  sliderRef: React.RefObject<HTMLDivElement>;
  warpColorPickerOpen: boolean;
  setWarpColorPickerOpen: (open: boolean) => void;
  weftColorPickerOpen: boolean;
  setWeftColorPickerOpen: (open: boolean) => void;
  savedColors: string[];
  onSaveColor: (color: string) => void;
  onRemoveColor: (color: string) => void;
  weavingStyle?: string;
  onWeavingStyleChange?: (style: any) => void;
}

export function DesktopToolsPanel({
  warpColor,
  weftColor,
  onWarpColorChange,
  onWeftColorChange,
  selectedDrafts,
  onToggleDraft,
  threadSize,
  onThreadSizeChange,
  onAddWarpRow,
  onAutoWeave,
  onUndo,
  onDeleteAll,
  toolbarsVisible,
  onToggleToolbars,
  onShare,
  onLearn,
  onClose,
  sliderExpanded,
  onSliderToggle,
  sliderRef,
  warpColorPickerOpen,
  setWarpColorPickerOpen,
  weftColorPickerOpen,
  setWeftColorPickerOpen,
  savedColors,
  onSaveColor,
  onRemoveColor,
  weavingStyle,
  onWeavingStyleChange,
}: DesktopToolsPanelProps) {
  const patterns = [1, 2, 3, 4, 5, 6];
  const warpButtonRef = useRef<HTMLButtonElement>(null);
  const weftButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      {/* Cloud button - top left - always visible */}
      <button
        onClick={onToggleToolbars}
        className="fixed left-[57px] top-[56px] size-[34px] z-[70] group cursor-pointer"
        title={toolbarsVisible ? "Hide toolbars" : "Show toolbars"}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
          <circle cx="17" cy="17" fill="white" r="17" className="opacity-[0.6] group-hover:opacity-100 transition-opacity" />
        </svg>
        <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold h-[25px] leading-[17px] left-[17px] text-[18px] text-black text-center top-[9px] translate-x-[-50%] w-[26px] pointer-events-none" style={{ fontVariationSettings: "'wdth' 100" }}>
          🌤️
        </p>
      </button>

      {toolbarsVisible && (
        <>
          {/* Eyes button - top left, next to cloud button */}
          {onLearn && (
            <button
              onClick={onLearn}
              className="fixed left-[101px] top-[56px] size-[34px] z-[70] group cursor-pointer"
              title="Learn how to weave"
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                <circle cx="17" cy="17" fill="white" r="17" className="opacity-[0.6] group-hover:opacity-100 transition-opacity" />
              </svg>
              <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold h-[25px] leading-[17px] left-[17px] text-[18px] text-black text-center top-[9px] translate-x-[-50%] w-[26px] pointer-events-none" style={{ fontVariationSettings: "'wdth' 100" }}>
                👀
              </p>
            </button>
          )}

          {sliderExpanded ? (
            /* SLIDER EXPANDED STATE - Only show slider */
            <div 
              ref={sliderRef} 
              className="fixed left-1/2 bottom-[70px] -translate-x-1/2 z-[60]"
            >
              <div className="box-border content-stretch flex gap-[6px] items-center relative w-[194px] h-[24px]">
                {/* Active Track (left side - grows with value) */}
                <div 
                  className="content-stretch flex flex-col h-[8px] items-center justify-center overflow-clip relative shrink-0"
                  style={{ width: `${15 + ((threadSize - 10) / (40 - 10)) * (136 - 15)}px` }}
                >
                  <div className="basis-0 bg-[rgba(255,255,255,0.5)] grow min-h-px min-w-px rounded-bl-[16px] rounded-br-[2px] rounded-tl-[16px] rounded-tr-[2px] shrink-0 w-full" />
                </div>
                
                {/* Handle - size changes based on thread size */}
                <div 
                  className="bg-[rgba(114,104,111,0.8)] overflow-clip rounded-[20px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.1)] shrink-0 cursor-grab active:cursor-grabbing"
                  style={{ 
                    width: `${14 + ((threadSize - 10) / (40 - 10)) * (24 - 14)}px`,
                    height: `${14 + ((threadSize - 10) / (40 - 10)) * (24 - 14)}px`
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    const sliderRect = e.currentTarget.parentElement!.getBoundingClientRect();
                    const sliderWidth = 194 - 6;
                    
                    const handleMouseMove = (moveEvent: MouseEvent) => {
                      const relativeX = moveEvent.clientX - sliderRect.left;
                      const clampedX = Math.max(0, Math.min(sliderWidth, relativeX));
                      const percentage = clampedX / sliderWidth;
                      const newSize = Math.round(10 + percentage * 30);
                      onThreadSizeChange(Math.max(10, Math.min(40, newSize)));
                    };
                    
                    const handleMouseUp = () => {
                      document.removeEventListener('mousemove', handleMouseMove);
                      document.removeEventListener('mouseup', handleMouseUp);
                    };
                    
                    handleMouseMove(e as unknown as MouseEvent);
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    const sliderRect = e.currentTarget.parentElement!.getBoundingClientRect();
                    const sliderWidth = 194 - 6;
                    
                    const handleTouchMove = (moveEvent: TouchEvent) => {
                      const touch = moveEvent.touches[0];
                      const relativeX = touch.clientX - sliderRect.left;
                      const clampedX = Math.max(0, Math.min(sliderWidth, relativeX));
                      const percentage = clampedX / sliderWidth;
                      const newSize = Math.round(10 + percentage * 30);
                      onThreadSizeChange(Math.max(10, Math.min(40, newSize)));
                    };
                    
                    const handleTouchEnd = () => {
                      document.removeEventListener('touchmove', handleTouchMove);
                      document.removeEventListener('touchend', handleTouchEnd);
                    };
                    
                    const touch = e.touches[0];
                    const relativeX = touch.clientX - sliderRect.left;
                    const clampedX = Math.max(0, Math.min(sliderWidth, relativeX));
                    const percentage = clampedX / sliderWidth;
                    const newSize = Math.round(10 + percentage * 30);
                    onThreadSizeChange(Math.max(10, Math.min(40, newSize)));
                    
                    document.addEventListener('touchmove', handleTouchMove, { passive: false });
                    document.addEventListener('touchend', handleTouchEnd);
                  }}
                />
                
                {/* Inactive Track (right side - shrinks as value grows) */}
                <div 
                  className="basis-0 content-stretch flex grow h-[8px] items-center justify-between min-h-px min-w-px overflow-clip relative shrink-0"
                >
                  <div className="basis-0 bg-[rgba(255,255,255,0.8)] grow h-full min-h-px min-w-px rounded-bl-[2px] rounded-br-[16px] rounded-tl-[2px] rounded-tr-[16px] shrink-0" />
                </div>
              </div>
            </div>
          ) : (
            /* NORMAL STATE - Show all buttons */
            <>
              {/* Share button - top right */}
              <button
                onClick={onShare}
                className="fixed right-[78px] top-[56px] size-[34px] z-50 group cursor-pointer"
                title="Share to gallery"
              >
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                  <circle cx="17" cy="17" fill="white" r="17" className="opacity-[0.6] group-hover:opacity-100 transition-opacity" />
                  <path d={svgPaths.p32939c00} fill="#72686F" />
                </svg>
              </button>

              {/* Close button - top right */}
              <button
                onClick={onClose}
                className="fixed right-[34px] top-[56px] size-[34px] z-50 group cursor-pointer"
                title="Save and go to gallery"
              >
                <div className="absolute bottom-[-0.24%] left-[-0.24%] right-0 top-0">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
                    <circle cx="17" cy="17.0806" fill="white" r="17" className="opacity-[0.6] group-hover:opacity-100 transition-opacity" />
                    <path d={svgPaths.p32a69400} fill="#72686F" />
                  </svg>
                </div>
              </button>

              {/* Warp Color - fixed at bottom left of center */}
              <button
                ref={warpButtonRef}
                onClick={() => {
                  setWarpColorPickerOpen(!warpColorPickerOpen);
                  setWeftColorPickerOpen(false);
                }}
                className="color-picker-button fixed left-1/2 bottom-[76px] size-[34px] cursor-pointer hover:opacity-80 transition-opacity z-50" 
                style={{ transform: 'translateX(-249.5px)' }}
              >
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                  <circle cx="17" cy="17" fill="white" fillOpacity="0.7" r="17" />
                  <circle cx="17" cy="17" fill={warpColor} r="14.0857" />
                </svg>
              </button>
              {warpColorPickerOpen && warpButtonRef.current && (
                <CustomColorPicker
                  color={warpColor}
                  onChange={onWarpColorChange}
                  onClose={() => setWarpColorPickerOpen(false)}
                  buttonRef={warpButtonRef}
                  position="top"
                  savedColors={savedColors}
                  onSaveColor={onSaveColor}
                  onRemoveColor={onRemoveColor}
                  warpColor={warpColor}
                  weftColor={weftColor}
                />
              )}

              {/* Weft Color - fixed at bottom left of center */}
              <button
                ref={weftButtonRef}
                onClick={() => {
                  setWeftColorPickerOpen(!weftColorPickerOpen);
                  setWarpColorPickerOpen(false);
                }}
                className="color-picker-button fixed left-1/2 bottom-[76px] size-[34px] cursor-pointer hover:opacity-80 transition-opacity z-50" 
                style={{ transform: 'translateX(-210.5px)' }}
              >
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                  <circle cx="17" cy="17" fill="white" fillOpacity="0.7" r="17" />
                  <circle cx="17.1219" cy="17.2462" fill={weftColor} r="14.0421" />
                </svg>
              </button>
              {weftColorPickerOpen && weftButtonRef.current && (
                <CustomColorPicker
                  color={weftColor}
                  onChange={onWeftColorChange}
                  onClose={() => setWeftColorPickerOpen(false)}
                  buttonRef={weftButtonRef}
                  position="top"
                  savedColors={savedColors}
                  onSaveColor={onSaveColor}
                  onRemoveColor={onRemoveColor}
                  warpColor={warpColor}
                  weftColor={weftColor}
                />
              )}

              {/* Main toolbar background - centered in viewport - 400px wide */}
              <div className="fixed left-1/2 bottom-[60.5px] bg-[rgba(255,255,255,0.3)] h-[65px] rounded-[30px] w-[400px] z-40" style={{ transform: 'translateX(-200px)' }} />

              {/* Heddle buttons 1-6 - evenly spaced */}
              {patterns.map((num) => {
                // Center-based positions for 6 heddles with 50px spacing
                const translateX = [-175, -125, -75, -25, 25, 75];
                const isSelected = selectedDrafts.includes(num);
                return (
                  <button
                    key={num}
                    onClick={() => onToggleDraft(num)}
                    className="fixed left-1/2 z-50 group cursor-pointer"
                    style={{ 
                      transform: `translateX(${translateX[num - 1]}px)`,
                      bottom: '71px', 
                      width: '44px', 
                      height: '44px' 
                    }}
                  >
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
                      <circle 
                        cx="22" 
                        cy="22" 
                        fill="white"
                        r="22"
                        className={isSelected ? "opacity-100 transition-opacity" : "opacity-[0.6] group-hover:opacity-100 transition-opacity"}
                      />
                    </svg>
                    <p 
                      className="absolute font-['Roboto:Medium',sans-serif] font-medium h-[15.714px] leading-[17px] text-[#72686f] text-[21px] text-center top-[13.75px] left-1/2 translate-x-[-50%] w-[19.905px] pointer-events-none" 
                      style={{ fontVariationSettings: "'wdth' 100" }}
                    >
                      {num}
                    </p>
                  </button>
                );
              })}

              {/* Reed button - positioned after heddles with proper spacing */}
              <button 
                onClick={onAddWarpRow}
                className="fixed left-1/2 bottom-[70.5px] size-[45px] z-50 group cursor-pointer"
                style={{ transform: 'translateX(130px)' }}
                title="Weave row (or press Enter/Space)"
              >
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45 45">
                  <circle cx="22.5" cy="22.5" fill="white" r="22.5" className="opacity-[0.6] group-hover:opacity-100 transition-opacity" />
                  <path d={svgPaths.p13269a00} fill="#72686F" />
                </svg>
              </button>

              {/* Undo button - 15px from the right edge of the reed button */}
              <button
                onClick={onUndo}
                className="fixed left-1/2 bottom-[76px] size-[34px] z-50 group cursor-pointer"
                style={{ transform: 'translateX(176.5px)' }}
                title="Undo last weft row"
              >
                <div className="flex h-full items-center justify-center rotate-[270deg]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                    <circle cx="17" cy="17" fill="white" r="17" transform="rotate(90 17 17)" className="opacity-[0.6] group-hover:opacity-100 transition-opacity" />
                    <path d={svgPaths.p10d35800} fill="#72686F" />
                  </svg>
                </div>
              </button>

              {/* Auto-weave button (🧵️ emoji) - positioned after undo */}
              <button
                onClick={onAutoWeave}
                className="fixed left-1/2 bottom-[76px] size-[34px] z-50 group cursor-pointer"
                style={{ transform: 'translateX(215.5px)' }}
                title="Auto weave"
              >
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                  <circle cx="17" cy="17" fill="white" r="17" className="opacity-[0.6] group-hover:opacity-100 transition-opacity" />
                </svg>
                <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold h-[15px] leading-[11px] left-[17px] text-[18px] text-black text-center top-[12px] translate-x-[-50%] w-[26px] pointer-events-none" style={{ fontVariationSettings: "'wdth' 100" }}>
                  🧵️
                </p>
              </button>

              {/* Slider button - positioned after auto-weave, rotated 270deg */}
              <button
                onClick={onSliderToggle}
                className="fixed left-1/2 bottom-[76px] size-[34px] z-50 group cursor-pointer"
                style={{ transform: 'translateX(254.5px)' }}
                title="Adjust thread size"
              >
                <div className="flex h-full items-center justify-center rotate-[270deg]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                    <circle cx="17" cy="17" fill="white" r="17" transform="rotate(90 17 17)" className="opacity-[0.6] group-hover:opacity-100 transition-opacity" />
                    <path d={svgPaths.pe258200} fill="#9A8494" />
                    <path d={svgPaths.p180e2800} fill="#9A8494" />
                    <circle cx="17" cy="17" fill="#9A8494" r="4" transform="rotate(90 17 17)" />
                  </svg>
                </div>
              </button>
            </>
          )}
        </>
      )}
    </>
  );
}