function Warp() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Warp">
      <div className="absolute bg-[#f3aad5] h-[1188px] left-0 top-0 w-[60px]" />
      <div className="absolute bg-[#f3aad5] h-[1188px] left-[120px] top-0 w-[60px]" />
      <div className="absolute bg-[#f3aad5] h-[1188px] left-[240px] top-0 w-[60px]" />
      <div className="absolute bg-[#f3aad5] h-[1188px] left-[360px] top-0 w-[60px]" />
    </div>
  );
}

function Warp1() {
  return (
    <div className="absolute contents left-[60px] top-0" data-name="Warp">
      <div className="absolute bg-[#ffd8ef] h-[1188px] left-[60px] top-0 w-[60px]" />
      <div className="absolute bg-[#ffd8ef] h-[1188px] left-[180px] top-0 w-[60px]" />
      <div className="absolute bg-[#ffd8ef] h-[1188px] left-[300px] top-0 w-[60px]" />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <Warp />
      <Warp1 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute left-0 size-[34px] top-0">
      <div className="absolute inset-[-55.88%_-73.53%_-91.18%_-73.53%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84 84">
          <g id="Group 12">
            <g filter="url(#filter0_d_54_309)" id="Ellipse 4">
              <circle cx="42" cy="36" fill="var(--fill-0, white)" fillOpacity="0.7" r="17" shapeRendering="crispEdges" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="84" id="filter0_d_54_309" width="84" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="6" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_54_309" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_54_309" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Cloud() {
  return (
    <div className="absolute left-[345px] size-[34px] top-[80px]" data-name="Cloud">
      <Group />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[345px] top-[80px]">
      <Cloud />
      <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold h-[25px] leading-[17px] left-[362px] text-[18px] text-black text-center top-[89px] translate-x-[-50%] w-[26px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        🌤️
      </p>
    </div>
  );
}

export default function HideToolBars() {
  return (
    <div className="bg-white relative size-full" data-name="Hide ToolBars">
      <Group1 />
      <Group2 />
    </div>
  );
}