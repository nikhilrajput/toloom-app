import svgPaths from "./svg-1jv4e10b4o";

function Auto() {
  return (
    <div className="absolute left-0 size-[45px] top-0" data-name="Auto">
      <div className="absolute inset-[-42.22%_-55.56%_-68.89%_-55.56%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 95 95">
          <g id="Auto">
            <g filter="url(#filter0_d_40_443)" id="Ellipse 4">
              <circle cx="47.5" cy="41.5" fill="var(--fill-0, white)" fillOpacity="0.7" r="22.5" shapeRendering="crispEdges" />
            </g>
            <g id="Group 6">
              <path d={svgPaths.p22b79280} fill="var(--fill-0, #FFC106)" id="Vector 4" />
              <path d={svgPaths.pd0cbf00} fill="var(--fill-0, #FFC106)" id="Vector 5" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="95" id="filter0_d_40_443" width="95" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="6" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_40_443" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_40_443" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

export default function Auto1() {
  return (
    <div className="relative size-full" data-name="Auto">
      <Auto />
    </div>
  );
}