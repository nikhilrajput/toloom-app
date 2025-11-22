import svgPaths from "./svg-bvwv6olxwp";

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

function Group5() {
  return (
    <div className="absolute contents left-0 top-0">
      <Warp />
      <Warp1 />
    </div>
  );
}

function Undo() {
  return (
    <div className="absolute left-[2px] size-[19px] top-[2px]" data-name="undo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
        <g id="undo">
          <path d={svgPaths.p1c146d00} fill="var(--fill-0, #72686F)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Undo1() {
  return (
    <div className="absolute contents left-[2px] top-[2px]" data-name="Undo">
      <Undo />
    </div>
  );
}

function Undo2() {
  return (
    <div className="absolute left-[5px] size-[23.926px] top-[5px]" data-name="Undo">
      <Undo1 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute left-0 size-[34px] top-0">
        <div className="absolute inset-[-55.88%_-73.53%_-91.18%_-73.53%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84 84">
            <g filter="url(#filter0_d_40_431)" id="Ellipse 4">
              <circle cx="42" cy="36" fill="var(--fill-0, white)" fillOpacity="0.7" r="17" shapeRendering="crispEdges" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="84" id="filter0_d_40_431" width="84" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="6" />
                <feGaussianBlur stdDeviation="12.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_40_431" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_40_431" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <Undo2 />
    </div>
  );
}

function Undo3() {
  return (
    <div className="absolute left-[256px] size-[34px] top-[81px]" data-name="Undo">
      <Group1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute left-0 size-[34px] top-0">
      <div className="absolute inset-[-55.88%_-73.53%_-91.18%_-73.53%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84 84">
          <g id="Group 12">
            <g filter="url(#filter0_d_40_452)" id="Ellipse 4">
              <circle cx="42" cy="36" fill="var(--fill-0, white)" fillOpacity="0.7" r="17" shapeRendering="crispEdges" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="84" id="filter0_d_40_452" width="84" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="6" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_40_452" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_40_452" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Delete() {
  return (
    <div className="absolute left-0 size-[19px] top-0" data-name="delete">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
        <g id="delete">
          <path d={svgPaths.p2894b280} fill="var(--fill-0, #72686F)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Delete1() {
  return (
    <div className="absolute left-0 size-[19px] top-0" data-name="Delete">
      <Delete />
    </div>
  );
}

function Delete2() {
  return (
    <div className="absolute left-[7px] size-[19px] top-[7px]" data-name="Delete">
      <Delete1 />
    </div>
  );
}

function Delete3() {
  return (
    <div className="absolute left-[300px] size-[34px] top-[81px]" data-name="Delete">
      <Group2 />
      <Delete2 />
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute left-0 size-[34px] top-0">
      <div className="absolute inset-[-55.88%_-73.53%_-91.18%_-73.53%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84 84">
          <g id="Group 12">
            <g filter="url(#filter0_d_40_452)" id="Ellipse 4">
              <circle cx="42" cy="36" fill="var(--fill-0, white)" fillOpacity="0.7" r="17" shapeRendering="crispEdges" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="84" id="filter0_d_40_452" width="84" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="6" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_40_452" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_40_452" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Close() {
  return (
    <div className="absolute left-[7px] size-[19px] top-[7px]" data-name="close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
        <g id="close">
          <path d={svgPaths.pce455c0} fill="var(--fill-0, #72686F)" id="icon" />
        </g>
      </svg>
    </div>
  );
}

function Delete4() {
  return (
    <div className="absolute left-[344px] size-[34px] top-[81px]" data-name="Delete">
      <Group3 />
      <Close />
    </div>
  );
}

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

function Auto1() {
  return (
    <div className="absolute left-[312px] size-[45px] top-[621px]" data-name="Auto">
      <Auto />
    </div>
  );
}

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

function Reed1() {
  return (
    <div className="absolute left-[313px] size-[48px] top-[716px]" data-name="Reed">
      <Reed />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[54px] top-[716px]">
      <div className="absolute left-[54px] size-[48px] top-[716px]">
        <div className="absolute inset-[-39.58%_-52.08%_-64.58%_-52.08%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 98 98">
            <g filter="url(#filter0_d_40_441)" id="Ellipse 4">
              <circle cx="49" cy="43" fill="var(--fill-0, white)" fillOpacity="0.7" r="24" shapeRendering="crispEdges" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="98" id="filter0_d_40_441" width="98" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="6" />
                <feGaussianBlur stdDeviation="12.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_40_441" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_40_441" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold h-[17.143px] leading-[17px] left-[77.86px] text-[#72686f] text-[24px] text-center top-[731px] translate-x-[-50%] w-[21.714px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        1
      </p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[114px] top-[716px]">
      <div className="absolute left-[114px] size-[48px] top-[716px]">
        <div className="absolute inset-[-39.58%_-52.08%_-64.58%_-52.08%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 98 98">
            <g filter="url(#filter0_d_40_441)" id="Ellipse 4">
              <circle cx="49" cy="43" fill="var(--fill-0, white)" fillOpacity="0.7" r="24" shapeRendering="crispEdges" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="98" id="filter0_d_40_441" width="98" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="6" />
                <feGaussianBlur stdDeviation="12.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_40_441" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_40_441" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold h-[17.143px] leading-[17px] left-[137.43px] text-[#72686f] text-[24px] text-center top-[730.86px] translate-x-[-50%] w-[21.714px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        2
      </p>
    </div>
  );
}

function Group8() {
  return (
    <div className="absolute contents left-[174px] top-[716px]">
      <div className="absolute left-[174px] size-[48px] top-[716px]">
        <div className="absolute inset-[-39.58%_-52.08%_-64.58%_-52.08%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 98 98">
            <g filter="url(#filter0_d_40_441)" id="Ellipse 4">
              <circle cx="49" cy="43" fill="var(--fill-0, white)" fillOpacity="0.7" r="24" shapeRendering="crispEdges" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="98" id="filter0_d_40_441" width="98" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="6" />
                <feGaussianBlur stdDeviation="12.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_40_441" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_40_441" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold h-[17.143px] leading-[17px] left-[197.43px] text-[#72686f] text-[24px] text-center top-[730.86px] translate-x-[-50%] w-[21.714px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        3
      </p>
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents left-[234px] top-[716px]">
      <div className="absolute left-[234px] size-[48px] top-[716px]">
        <div className="absolute inset-[-39.58%_-52.08%_-64.58%_-52.08%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 98 98">
            <g filter="url(#filter0_d_40_441)" id="Ellipse 4">
              <circle cx="49" cy="43" fill="var(--fill-0, white)" fillOpacity="0.7" r="24" shapeRendering="crispEdges" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="98" id="filter0_d_40_441" width="98" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="6" />
                <feGaussianBlur stdDeviation="12.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_40_441" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_40_441" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold h-[17.143px] leading-[17px] left-[257.86px] text-[#72686f] text-[24px] text-center top-[731px] translate-x-[-50%] w-[21.714px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        4
      </p>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents left-[18px] top-[700px]">
      <div className="absolute bg-[rgba(255,255,255,0.5)] h-[80px] left-[18px] rounded-[40px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.1)] top-[700px] w-[366px]" />
      <Reed1 />
      <Group />
      <Group4 />
      <Group8 />
      <Group9 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute bg-[#fefefe] h-[6.667px] left-0 rounded-[3px] top-[6.67px] w-[164.444px]" />
      <div className="absolute bg-[#9a8494] left-[8.89px] size-[20px] top-0" />
    </div>
  );
}

function ThreadSize() {
  return (
    <div className="absolute h-[20px] left-0 shadow-[0px_6px_25px_0px_rgba(0,0,0,0.1)] top-0 w-[165px]" data-name="thread size">
      <Group6 />
    </div>
  );
}

function ThreadSize1() {
  return (
    <div className="absolute h-[20px] left-[42px] top-[87px] w-[165px]" data-name="Thread Size">
      <ThreadSize />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents left-[23px] top-[75px]">
      <div className="absolute bg-[rgba(255,255,255,0.5)] h-[44px] left-[23px] rounded-[35px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.1)] top-[75px] w-[208px]" />
      <ThreadSize1 />
    </div>
  );
}

function WarpColor() {
  return (
    <div className="absolute left-[54px] size-[45px] top-[621px]" data-name="Warp Color">
      <div className="absolute inset-[-42.22%_-55.56%_-68.89%_-55.56%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 95 95">
          <g filter="url(#filter0_d_40_449)" id="Warp Color">
            <g filter="url(#filter1_d_40_449)" id="Ellipse 4">
              <circle cx="47.5" cy="41.5" fill="var(--fill-0, #F3AAD5)" r="22.5" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="95" id="filter0_d_40_449" width="95" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="6" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_40_449" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_40_449" mode="normal" result="shape" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="95" id="filter1_d_40_449" width="95" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="6" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_40_449" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_40_449" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function WeftColor() {
  return (
    <div className="absolute left-[111px] size-[45px] top-[621px]" data-name="Weft Color">
      <div className="absolute inset-[-42.22%_-55.56%_-68.89%_-55.56%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 95 95">
          <g filter="url(#filter0_d_40_433)" id="Weft Color">
            <g filter="url(#filter1_d_40_433)" id="Ellipse 4">
              <circle cx="47.5" cy="41.5" fill="var(--fill-0, #B0F3AA)" r="22.5" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="95" id="filter0_d_40_433" width="95" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="6" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_40_433" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_40_433" mode="normal" result="shape" />
            </filter>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="95" id="filter1_d_40_433" width="95" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="6" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_40_433" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_40_433" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents left-[54px] top-[621px]">
      <WarpColor />
      <WeftColor />
    </div>
  );
}

export default function IPhone16Pro() {
  return (
    <div className="bg-white relative size-full" data-name="iPhone 16 Pro - 2">
      <Group5 />
      <Undo3 />
      <Delete3 />
      <Delete4 />
      <div className="absolute bg-[rgba(255,255,255,0.5)] h-[72px] left-[18px] rounded-[35px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.1)] top-[608px] w-[169px]" />
      <Auto1 />
      <Group10 />
      <Group7 />
      <Group11 />
    </div>
  );
}