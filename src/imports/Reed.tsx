import svgPaths from "./svg-k9qj1iumu3";

function Reed() {
  return (
    <div className="absolute left-0 size-[27px] top-0" data-name="Reed">
      <div className="absolute inset-[-70.37%_-92.59%_-114.81%_-92.59%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 77">
          <g id="Reed">
            <g filter="url(#filter0_d_28_67)" id="Ellipse 4">
              <circle cx="38.5" cy="32.5" fill="var(--fill-0, white)" fillOpacity="0.7" r="13.5" shapeRendering="crispEdges" />
            </g>
            <g id="keyboard_arrow_down">
              <path d={svgPaths.p387a5f00} fill="var(--fill-0, #948590)" id="icon" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="77" id="filter0_d_28_67" width="77" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="6" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_28_67" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_28_67" mode="normal" result="shape" />
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