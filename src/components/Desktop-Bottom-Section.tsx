// This is a reference file for the desktop bottom layout
// Positions from Figma MacBookPro141-80-906.tsx

{/* Bottom toolbar - using fixed positions from Figma */}
{toolbarsVisible && (
  <>
    {/* Color Pickers - fixed positions */}
    {/* Warp color at (502px, 870px) */}
    <div className="fixed left-[502px] bottom-[calc(100vh-870px-35px)] z-50">
      <button
        onClick={() => {
          setWarpColorPickerOpen(!warpColorPickerOpen);
          setWeftColorPickerOpen(false);
        }}
        className="color-picker-button size-[35px] cursor-pointer hover:scale-110 transition-transform"
        title="Warp color"
      >
        <div className="absolute inset-[-54.29%_-71.43%_-88.57%_-71.43%] pointer-events-none">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 85 85">
            <g filter="url(#filter0_d_warp_desktop)">
              <g filter="url(#filter1_d_warp_desktop)">
                <circle cx="42.5" cy="36.5" fill="white" fillOpacity="0.3" r="17.5" shapeRendering="crispEdges" />
              </g>
              <g filter="url(#filter2_d_warp_desktop)">
                <circle cx="42.5" cy="36.5" fill={warpColor} r="14.5" />
              </g>
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="85" id="filter0_d_warp_desktop" width="85" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="6" />
                <feGaussianBlur stdDeviation="12.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_warp_desktop" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_warp_desktop" mode="normal" result="shape" />
              </filter>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="85" id="filter1_d_warp_desktop" width="85" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="6" />
                <feGaussianBlur stdDeviation="12.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_warp_desktop" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_warp_desktop" mode="normal" result="shape" />
              </filter>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="79" id="filter2_d_warp_desktop" width="79" x="3" y="3">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="6" />
                <feGaussianBlur stdDeviation="12.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_warp_desktop_inner" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_warp_desktop_inner" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </button>
      {warpColorPickerOpen && (
        <div className="color-picker-container">
          <CustomColorPicker
            color={warpColor}
            onChange={onWarpColorChange}
            onClose={() => setWarpColorPickerOpen(false)}
            savedColors={savedColors}
            onSaveColor={handleSaveColor}
            onRemoveColor={handleRemoveColor}
            position="top"
          />
        </div>
      )}
    </div>

    {/* Weft color at (542px, 869px) */}
    <div className="fixed left-[542px] bottom-[calc(100vh-869px-35px)] z-50">
      {/* Similar structure for weft color */}
    </div>

    {/* Main toolbar background at (592px, 854px) - width 327px, height 65px */}
    <div className="fixed left-[592px] bottom-[calc(100vh-854px-65px)] bg-[rgba(255,255,255,0.3)] h-[65px] rounded-[30px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.1)] w-[327px] z-40" />

    {/* Heddle buttons 1-4 at fixed positions */}
    {/* Button 1 at (607px, 865px) */}
    {/* Button 2 at (666px, 865px) */}
    {/* Button 3 at (725px, 865px) */}
    {/* Button 4 at (784px, 865px) */}

    {/* Reed at (865px, 865px) */}
    
    {/* Undo at (934px, 870px) */}
    
    {/* Auto Weave at (983px, 870px) */}
    
    {/* Slider Button at (1032px, 869px) */}
  </>
)}
