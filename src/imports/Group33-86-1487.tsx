import svgPaths from "./svg-lesotsnvkd";

function Group6() {
  return (
    <div className="absolute left-[268px] size-[45px] top-[10px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45 45">
        <g id="Group 51">
          <circle cx="22.5" cy="22.5" fill="var(--fill-0, white)" fillOpacity="0.4" id="Ellipse 4" r="22.5" />
          <path d={svgPaths.p13269a00} fill="var(--fill-0, #72686F)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[15px] top-[11px]">
      <div className="absolute left-[15px] size-[44px] top-[11px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
          <circle cx="22" cy="22" fill="var(--fill-0, white)" fillOpacity="0.4" id="Ellipse 4" r="22" />
        </svg>
      </div>
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium h-[15.714px] leading-[17px] left-[36.87px] text-[#72686f] text-[21px] text-center top-[24.75px] translate-x-[-50%] w-[19.905px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        1
      </p>
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-[74px] top-[11px]">
      <div className="absolute left-[74px] size-[44px] top-[11px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
          <circle cx="22" cy="22" fill="var(--fill-0, white)" fillOpacity="0.4" id="Ellipse 4" r="22" />
        </svg>
      </div>
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium h-[15.714px] leading-[17px] left-[95.48px] text-[#72686f] text-[21px] text-center top-[24.62px] translate-x-[-50%] w-[19.905px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        2
      </p>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[133px] top-[11px]">
      <div className="absolute left-[133px] size-[44px] top-[11px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
          <circle cx="22" cy="22" fill="var(--fill-0, white)" fillOpacity="0.4" id="Ellipse 4" r="22" />
        </svg>
      </div>
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium h-[15.714px] leading-[17px] left-[154.48px] text-[#72686f] text-[21px] text-center top-[24.62px] translate-x-[-50%] w-[19.905px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        3
      </p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[192px] top-[11px]">
      <div className="absolute left-[192px] size-[44px] top-[11px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 44 44">
          <circle cx="22" cy="22" fill="var(--fill-0, white)" fillOpacity="0.4" id="Ellipse 4" r="22" />
        </svg>
      </div>
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium h-[15.714px] leading-[17px] left-[213.87px] text-[#72686f] text-[21px] text-center top-[24.75px] translate-x-[-50%] w-[19.905px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        4
      </p>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-[15px] top-[10px]">
      <Group6 />
      <Group />
      <Group1 />
      <Group2 />
      <Group3 />
    </div>
  );
}

export default function Group4() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-[rgba(255,255,255,0.3)] h-[65px] left-0 rounded-[30px] top-0 w-[327px]" />
      <Group5 />
    </div>
  );
}