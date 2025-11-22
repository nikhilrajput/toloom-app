import svgPaths from "./svg-2keexsysqj";

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

function Group() {
  return (
    <div className="absolute contents left-0 top-0">
      <Warp />
      <Warp1 />
    </div>
  );
}

function KeyboardArrowDown() {
  return (
    <div className="relative size-[39px]" data-name="keyboard_arrow_down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 39 39">
        <g id="keyboard_arrow_down">
          <path d={svgPaths.p19e41c00} fill="var(--fill-0, #72686F)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

export default function IPhone16Pro() {
  return (
    <div className="bg-white relative size-full" data-name="iPhone 16 Pro - 4">
      <Group />
      <div className="absolute flex items-center justify-center left-[181px] size-[39px] top-[792px]">
        <div className="flex-none rotate-[180deg]">
          <KeyboardArrowDown />
        </div>
      </div>
    </div>
  );
}