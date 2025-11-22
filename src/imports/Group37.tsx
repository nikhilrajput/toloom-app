function Group() {
  return (
    <div className="absolute left-0 size-[34px] top-0">
      <div className="absolute inset-[-55.88%_-73.53%_-91.18%_-73.53%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84 84">
          <g id="Group 12">
            <g filter="url(#filter0_d_52_128)" id="Ellipse 4">
              <circle cx="42" cy="36" fill="var(--fill-0, white)" fillOpacity="0.7" r="17" shapeRendering="crispEdges" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="84" id="filter0_d_52_128" width="84" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="6" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_52_128" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_52_128" mode="normal" result="shape" />
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

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-[#9a8494] left-0 size-[20px] top-0" />
    </div>
  );
}

function ThreadSize() {
  return (
    <div className="absolute left-0 shadow-[0px_6px_25px_0px_rgba(0,0,0,0.1)] size-[20px] top-0" data-name="thread size">
      <Group1 />
    </div>
  );
}

function ThreadSize1() {
  return (
    <div className="absolute left-[7px] size-[20px] top-[7px]" data-name="Thread Size">
      <ThreadSize />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[7px] top-[7px]">
      <ThreadSize1 />
    </div>
  );
}

export default function Group3() {
  return (
    <div className="relative size-full">
      <Undo />
      <div className="absolute bg-[#fefefe] h-[7px] left-[2px] rounded-[3px] top-[14px] w-[30px]" />
      <Group2 />
    </div>
  );
}