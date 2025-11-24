import svgPaths from "../imports/svg-wpj1llmjl1";
import { useRef } from "react";

interface MobileToolsPanelProps {
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
  weavingStyle?: string;
  onWeavingStyleChange?: (style: any) => void;
}

export function MobileToolsPanel({
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
  weavingStyle,
  onWeavingStyleChange,
}: MobileToolsPanelProps) {
  const patterns = [1, 2, 3, 4];
  const warpInputRef = useRef<HTMLInputElement>(null);
  const weftInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {/* Cloud button - top LEFT - always visible with responsive spacing */}
      <button
        onClick={onToggleToolbars}
        className="fixed left-[24px] top-[50px] size-[34px] z-50 group cursor-pointer"
        title={toolbarsVisible ? "Hide toolbars" : "Show toolbars"}
      >
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
          <circle cx="17" cy="17" fill="white" className="opacity-[0.6] group-hover:opacity-100 transition-opacity" r="17" />
        </svg>
        <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold h-[25px] leading-[17px] left-[17px] text-[18px] text-black text-center top-[9px] translate-x-[-50%] w-[26px] pointer-events-none" style={{ fontVariationSettings: "'wdth' 100" }}>
          🌤️
        </p>
      </button>

      {toolbarsVisible && (
        <>
          {/* Eyes button - top LEFT, next to cloud button */}
          {onLearn && (
            <button
              onClick={onLearn}
              className="fixed left-[68px] top-[50px] size-[34px] z-50 group cursor-pointer"
              title="Learn how to weave"
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                <circle cx="17" cy="17" fill="white" className="opacity-[0.6] group-hover:opacity-100 transition-opacity" r="17" />
              </svg>
              <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold h-[25px] leading-[17px] left-[17px] text-[18px] text-black text-center top-[9px] translate-x-[-50%] w-[26px] pointer-events-none" style={{ fontVariationSettings: "'wdth' 100" }}>
                👀
              </p>
            </button>
          )}

          {sliderExpanded ? (
            /* SLIDER EXPANDED STATE - Only show slider - centered */
            <div 
              ref={sliderRef} 
              className="fixed left-1/2 -translate-x-1/2 bottom-[7%] z-[60]"
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
              {/* Share button - top right with responsive spacing */}
              <button
                onClick={onShare}
                className="fixed right-[63px] top-[50px] size-[34px] z-50 group"
                title="Share to gallery"
              >
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                  <circle cx="17" cy="17" fill="white" className="opacity-[0.6] group-hover:opacity-100 transition-opacity" r="17" />
                  <path d={svgPaths.p32939c00} fill="#72686F" />
                </svg>
              </button>

              {/* Close button - top right with responsive spacing */}
              <button
                onClick={onClose}
                className="fixed right-[24px] top-[50px] size-[34px] z-50 group"
                title="Save and go to gallery"
              >
                <div className="absolute bottom-[-0.24%] left-[-0.24%] right-0 top-0">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
                    <circle cx="17" cy="17.0806" fill="white" className="opacity-[0.6] group-hover:opacity-100 transition-opacity" r="17" />
                    <path d={svgPaths.p32a69400} fill="#72686F" />
                  </svg>
                </div>
              </button>

              {/* Bottom toolbar background - centered */}
              <div className="fixed left-1/2 -translate-x-1/2 bottom-[12%] bg-[rgba(255,255,255,0.3)] h-[65px] rounded-[30px] w-[327px] z-40" />

              {/* Heddle toolbar - centered container with absolute positioning inside */}
              <div className="fixed left-1/2 -translate-x-1/2 bottom-[12%] w-[327px] h-[65px] z-50">
                {/* Heddle buttons 1-4 - absolute positioning within container */}
                {patterns.map((num) => {
                  const leftPositions = [15, 74, 133, 192];
                  const isSelected = selectedDrafts.includes(num);
                  return (
                    <button
                      key={num}
                      onClick={() => onToggleDraft(num)}
                      className="absolute group"
                      style={{ 
                        left: `${leftPositions[num - 1]}px`,
                        top: '11px',
                        width: '44px', 
                        height: '44px' 
                      }}
                    >
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
                        <circle 
                          cx="22" 
                          cy="22" 
                          fill={isSelected ? "rgba(255, 193, 6, 1)" : "white"}
                          className={isSelected ? "opacity-100 transition-opacity" : "opacity-[0.6] group-hover:opacity-100 transition-opacity"}
                          r="22" 
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

                {/* Reed button (down arrow) - absolute positioning within container */}
                <button 
                  onClick={onAddWarpRow}
                  className="absolute group"
                  style={{ 
                    left: '268px',
                    top: '10px',
                    width: '45px',
                    height: '45px'
                  }}
                  title="Weave row (or press Enter/Space)"
                >
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45 45">
                    <circle cx="22.5" cy="22.5" fill="white" className="opacity-[0.6] group-hover:opacity-100 transition-opacity" r="22.5" />
                    <path d={svgPaths.p13269a00} fill="#72686F" />
                  </svg>
                </button>
              </div>

              {/* Warp Color - left aligned with heddle toolbar */}
              <div className="fixed left-1/2 bottom-[6%] size-[34px] cursor-pointer z-50 group" style={{ transform: 'translateX(-146.5px)' }}>
                <label htmlFor="warp-color-mobile" className="cursor-pointer block size-full" title="Change warp color">
                  <svg className="block size-full pointer-events-none" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                    <circle cx="17" cy="17" fill="white" className="opacity-70 group-hover:opacity-80 transition-opacity" r="17" />
                    <circle cx="17" cy="17" fill={warpColor} r="14.0857" />
                  </svg>
                </label>
                <input
                  ref={warpInputRef}
                  id="warp-color-mobile"
                  type="color"
                  value={warpColor}
                  onChange={(e) => onWarpColorChange(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  style={{ width: '34px', height: '34px' }}
                />
              </div>

              {/* Weft Color - next to warp */}
              <div className="fixed left-1/2 bottom-[6%] size-[34px] cursor-pointer z-50 group" style={{ transform: 'translateX(-107.5px)' }}>
                <label htmlFor="weft-color-mobile" className="cursor-pointer block size-full" title="Change weft color">
                  <svg className="block size-full pointer-events-none" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                    <circle cx="17" cy="17" fill="white" className="opacity-70 group-hover:opacity-80 transition-opacity" r="17" />
                    <circle cx="17.1219" cy="17.2462" fill={weftColor} r="14.0421" />
                  </svg>
                </label>
                <input
                  ref={weftInputRef}
                  id="weft-color-mobile"
                  type="color"
                  value={weftColor}
                  onChange={(e) => onWeftColorChange(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  style={{ width: '34px', height: '34px' }}
                />
              </div>

              {/* Slider button - rotated 270deg - in middle area */}
              <button
                onClick={onSliderToggle}
                className="fixed left-1/2 bottom-[6%] size-[34px] z-50 group"
                style={{ transform: 'translateX(-68.5px)' }}
                title="Adjust thread size"
              >
                <div className="flex h-full items-center justify-center rotate-[270deg]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                    <circle cx="17" cy="17" fill="white" className="opacity-[0.6] group-hover:opacity-100 transition-opacity" r="17" transform="rotate(90 17 17)" />
                    <path d={svgPaths.pe258200} fill="#9A8494" />
                    <path d={svgPaths.p180e2800} fill="#9A8494" />
                    <circle cx="17" cy="17" fill="#9A8494" r="4" transform="rotate(90 17 17)" />
                  </svg>
                </div>
              </button>

              {/* Undo button - rotated 270deg - right aligned with heddle toolbar */}
              <button
                onClick={onUndo}
                className="fixed left-1/2 bottom-[6%] size-[34px] z-50 group"
                style={{ transform: 'translateX(80.5px)' }}
                title="Undo last weft row"
              >
                <div className="flex h-full items-center justify-center rotate-[270deg]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                    <circle cx="17" cy="17" fill="white" className="opacity-[0.6] group-hover:opacity-100 transition-opacity" r="17" transform="rotate(90 17 17)" />
                    <path d={svgPaths.p10d35800} fill="#72686F" />
                  </svg>
                </div>
              </button>

              {/* Auto-weave button (🧵️ emoji) - right aligned with heddle toolbar */}
              <button
                onClick={onAutoWeave}
                className="fixed left-1/2 bottom-[6%] size-[34px] z-50 group"
                style={{ transform: 'translateX(119.5px)' }}
                title="Auto weave"
              >
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                  <circle cx="17" cy="17" fill="white" className="opacity-[0.6] group-hover:opacity-100 transition-opacity" r="17" />
                </svg>
                <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold h-[15px] leading-[11px] left-[17px] text-[18px] text-black text-center top-[12px] translate-x-[-50%] w-[26px] pointer-events-none" style={{ fontVariationSettings: "'wdth' 100" }}>
                  🧵️
                </p>
              </button>
            </>
          )}
        </>
      )}
    </>
  );
}