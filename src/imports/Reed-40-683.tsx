import svgPaths from "./svg-leuybg55s5";

function Reed() {
  return (
    <div className="absolute left-px size-[45px] top-px" data-name="Reed">
      <div className="absolute inset-[-42.22%_-55.56%_-68.89%_-55.56%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 95 95">
          <g id="Reed">
            <g filter="url(#filter0_d_40_436)" id="Ellipse 4">
              <circle cx="47.5" cy="41.5" fill="var(--fill-0, white)" fillOpacity="0.7" r="22.5" shapeRendering="crispEdges" />
            </g>
            <g id="keyboard_arrow_down">
              <path d={svgPaths.p3fb70f00} fill="var(--fill-0, #72686F)" id="icon" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="95" id="filter0_d_40_436" width="95" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="6" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_40_436" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_40_436" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default function Reed1() {
  return (
    <div className="relative size-full" data-name="Reed">
      <Reed />
    </div>
  );
}