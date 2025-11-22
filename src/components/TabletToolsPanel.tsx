import svgPaths from "../imports/svg-tj2d6yocc1";

interface TabletToolsPanelProps {
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
  onClose?: () => void;
  sliderExpanded: boolean;
  onSliderToggle: () => void;
  sliderRef: React.RefObject<HTMLDivElement>;
  weavingStyle?: string;
  onWeavingStyleChange?: (style: any) => void;
}

export function TabletToolsPanel({
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
  onClose,
  sliderExpanded,
  onSliderToggle,
  sliderRef,
  weavingStyle,
  onWeavingStyleChange,
}: TabletToolsPanelProps) {
  const patterns = [1, 2, 3, 4];

  return (
    <>
      {/* Cloud button - top left - rotated 90deg - always visible */}
      <button
        onClick={onToggleToolbars}
        className="fixed left-[744px] top-[57px] size-[34px] transition-transform hover:scale-110 z-50"
        title={toolbarsVisible ? "Hide toolbars" : "Show toolbars"}
      >
        <div className="flex h-full items-center justify-center rotate-[90deg]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
            <circle cx="17" cy="17" fill="white" fillOpacity="0.7" r="17" />
          </svg>
        </div>
        <div className="absolute flex h-full items-center justify-center left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rotate-[90deg]">
          <p className="font-['Roboto:SemiBold',sans-serif] font-semibold h-[25px] leading-[17px] text-[18px] text-black text-center w-[26px] pointer-events-none" style={{ fontVariationSettings: "'wdth' 100" }}>
            🌤️
          </p>
        </div>
      </button>

      {toolbarsVisible && (
        <>
          {sliderExpanded ? (
            /* SLIDER EXPANDED STATE - Only show slider */
            <div 
              ref={sliderRef} 
              className="fixed left-[79px] top-[666px] z-[60]"
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
              {/* Share button - rotated 90deg */}
              <button
                onClick={onShare}
                className="fixed left-[744px] top-[1064px] size-[34px] transition-transform hover:scale-110 z-50"
                title="Share to gallery"
              >
                <div className="flex h-full items-center justify-center rotate-[90deg]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                    <circle cx="17" cy="17" fill="white" fillOpacity="0.7" r="17" />
                    <path d={svgPaths.p32939c00} fill="#72686F" />
                  </svg>
                </div>
              </button>

              {/* Close button - rotated 90deg */}
              <button
                onClick={onClose}
                className="fixed left-[744px] top-[1108px] size-[34px] transition-transform hover:scale-110 z-50"
                title="Save and go to gallery"
              >
                <div className="flex h-full items-center justify-center rotate-[90deg]">
                  <div className="relative size-[34px]">
                    <div className="absolute bottom-[-0.24%] left-[-0.24%] right-0 top-0">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 35 35">
                        <circle cx="17" cy="17.0806" fill="white" fillOpacity="0.7" r="17" />
                        <path d={svgPaths.p32a69400} fill="#72686F" />
                      </svg>
                    </div>
                  </div>
                </div>
              </button>

              {/* Left toolbar background - rotated 90deg */}
              <div className="fixed left-[64px] top-[414px] h-[327px] w-[65px] bg-[rgba(255,255,255,0.3)] rounded-[30px] z-40" />

              {/* Warp Color - rotated 90deg */}
              <label className="fixed left-[79px] top-[326px] size-[34px] cursor-pointer z-50">
                <div className="flex h-full items-center justify-center rotate-[90deg]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                    <circle cx="17" cy="17" fill="white" fillOpacity="0.7" r="17" />
                    <circle cx="17" cy="17" fill={warpColor} r="14.0857" />
                  </svg>
                </div>
                <input
                  type="color"
                  value={warpColor}
                  onChange={(e) => onWarpColorChange(e.target.value)}
                  className="absolute opacity-0 w-0 h-0"
                />
              </label>

              {/* Weft Color - rotated 90deg */}
              <label className="fixed left-[79px] top-[365px] size-[34px] cursor-pointer z-50">
                <div className="flex h-full items-center justify-center rotate-[90deg]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                    <circle cx="17" cy="17" fill="white" fillOpacity="0.7" r="17" />
                    <circle cx="17.1219" cy="17.2462" fill={weftColor} r="14.0421" />
                  </svg>
                </div>
                <input
                  type="color"
                  value={weftColor}
                  onChange={(e) => onWeftColorChange(e.target.value)}
                  className="absolute opacity-0 w-0 h-0"
                />
              </label>

              {/* Heddle buttons 1-4 - rotated 90deg */}
              {patterns.map((num) => {
                const positions = [429, 488, 547, 606];
                const topPos = positions[num - 1];
                return (
                  <button
                    key={num}
                    onClick={() => onToggleDraft(num)}
                    className="fixed transition-all hover:scale-110 z-50"
                    style={{ left: '74px', top: `${topPos}px`, width: '44px', height: '44px' }}
                  >
                    <div className="flex h-full items-center justify-center rotate-[90deg]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
                        <circle 
                          cx="22" 
                          cy="22" 
                          fill={selectedDrafts.includes(num) ? "rgba(255, 193, 6, 0.3)" : "white"}
                          fillOpacity="0.4" 
                          r="22" 
                        />
                      </svg>
                    </div>
                    <div className="absolute flex h-full items-center justify-center left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rotate-[90deg]">
                      <p 
                        className="font-['Roboto:Medium',sans-serif] font-medium h-[15.714px] leading-[17px] text-[#72686f] text-[21px] text-center w-[19.905px] pointer-events-none" 
                        style={{ fontVariationSettings: "'wdth' 100" }}
                      >
                        {num}
                      </p>
                    </div>
                  </button>
                );
              })}

              {/* Reed button (down arrow) - rotated 90deg */}
              <button 
                onClick={onAddWarpRow}
                className="fixed left-[74px] top-[682px] size-[45px] transition-transform hover:scale-110 z-50"
                title="Weave row (or press Enter/Space)"
              >
                <div className="flex h-full items-center justify-center rotate-[90deg]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45 45">
                    <circle cx="22.5" cy="22.5" fill="white" fillOpacity="0.4" r="22.5" />
                    <path d={svgPaths.p13269a00} fill="#72686F" />
                  </svg>
                </div>
              </button>

              {/* Undo button - no rotation needed */}
              <button
                onClick={onUndo}
                className="fixed left-[79px] top-[751px] size-[34px] transition-transform hover:scale-110 z-50"
                title="Undo last weft row"
              >
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                  <circle cx="17" cy="17" fill="white" fillOpacity="0.7" r="17" transform="rotate(90 17 17)" />
                  <path d={svgPaths.p10d35800} fill="#72686F" />
                </svg>
              </button>

              {/* Auto-weave button (🧵️ emoji) - rotated 90deg */}
              <button
                onClick={onAutoWeave}
                className="fixed left-[79px] top-[790px] size-[34px] transition-transform hover:scale-110 z-50"
                title="Auto weave"
              >
                <div className="flex h-full items-center justify-center rotate-[90deg]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                    <circle cx="17" cy="17" fill="white" fillOpacity="0.7" r="17" />
                  </svg>
                </div>
                <div className="absolute flex h-full items-center justify-center left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rotate-[90deg]">
                  <p className="font-['Roboto:SemiBold',sans-serif] font-semibold h-[15px] leading-[11px] text-[18px] text-black text-center w-[26px] pointer-events-none" style={{ fontVariationSettings: "'wdth' 100" }}>
                    🧵️
                  </p>
                </div>
              </button>

              {/* Slider button - no rotation needed */}
              <button
                onClick={onSliderToggle}
                className="fixed left-[79px] top-[834px] size-[34px] transition-transform hover:scale-110 z-50"
                title="Adjust thread size"
              >
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34 34">
                  <circle cx="17" cy="17" fill="white" fillOpacity="0.7" r="17" transform="rotate(90 17 17)" />
                  <path d={svgPaths.pe258200} fill="#9A8494" />
                  <path d={svgPaths.p180e2800} fill="#9A8494" />
                  <circle cx="17" cy="17" fill="#9A8494" r="4" transform="rotate(90 17 17)" />
                </svg>
              </button>
            </>
          )}
        </>
      )}
    </>
  );
}