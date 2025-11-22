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

function Undo() {
  return (
    <div className="absolute left-0 size-[34px] top-0" data-name="Undo">
      <Group />
    </div>
  );
}

function ThreadSize() {
  return (
    <div className="absolute left-[10.98px] size-[13px] top-[11px]" data-name="Thread Size">
      <div className="absolute bg-[#9a8494] left-0 size-[13px] top-0" />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[6px] top-[11px]">
      <div className="absolute bg-[#fefefe] h-[3.809px] left-[6px] rounded-[2.438px] top-[15.57px] w-[22.852px]" />
      <ThreadSize />
    </div>
  );
}

export default function Group2() {
  return (
    <div className="relative size-full">
      <Undo />
      <Group1 />
    </div>
  );
}