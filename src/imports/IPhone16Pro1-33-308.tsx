import svgPaths from "./svg-x8epdd0aji";

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

function Group8() {
  return (
    <div className="absolute contents left-0 top-0">
      <Warp />
      <Warp1 />
    </div>
  );
}

function Undo() {
  return (
    <div className="absolute left-0 size-[19px] top-0" data-name="undo">
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
    <div className="absolute contents left-0 top-0" data-name="Undo">
      <Undo />
    </div>
  );
}

function Undo2() {
  return (
    <div className="absolute left-[4px] size-[19px] top-[4px]" data-name="Undo">
      <Undo1 />
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute contents left-0 top-0">
      <div className="absolute left-0 size-[27px] top-0">
        <div className="absolute inset-[-70.37%_-92.59%_-114.81%_-92.59%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 77">
            <g filter="url(#filter0_d_33_196)" id="Ellipse 4">
              <circle cx="38.5" cy="32.5" fill="var(--fill-0, white)" fillOpacity="0.7" r="13.5" shapeRendering="crispEdges" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="77" id="filter0_d_33_196" width="77" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="6" />
                <feGaussianBlur stdDeviation="12.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_33_196" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_33_196" mode="normal" result="shape" />
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
    <div className="absolute left-[287px] size-[27px] top-[26px]" data-name="Undo">
      <Group5 />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute left-0 size-[27px] top-0">
      <div className="absolute inset-[-70.37%_-92.59%_-114.81%_-92.59%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 77">
          <g id="Group 12">
            <g filter="url(#filter0_d_33_209)" id="Ellipse 4">
              <circle cx="38.5" cy="32.5" fill="var(--fill-0, white)" fillOpacity="0.7" r="13.5" shapeRendering="crispEdges" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="77" id="filter0_d_33_209" width="77" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="6" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_33_209" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_33_209" mode="normal" result="shape" />
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
    <div className="absolute left-[4px] size-[19px] top-[4px]" data-name="Delete">
      <Delete1 />
    </div>
  );
}

function Delete3() {
  return (
    <div className="absolute left-[321px] size-[27px] top-[26px]" data-name="Delete">
      <Group6 />
      <Delete2 />
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute left-0 size-[27px] top-0">
      <div className="absolute inset-[-70.37%_-92.59%_-114.81%_-92.59%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 77">
          <g id="Group 12">
            <g filter="url(#filter0_d_33_209)" id="Ellipse 4">
              <circle cx="38.5" cy="32.5" fill="var(--fill-0, white)" fillOpacity="0.7" r="13.5" shapeRendering="crispEdges" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="77" id="filter0_d_33_209" width="77" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="6" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_33_209" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_33_209" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Close() {
  return (
    <div className="absolute left-[4px] size-[19px] top-[4px]" data-name="close">
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
    <div className="absolute left-[355px] size-[27px] top-[25px]" data-name="Delete">
      <Group7 />
      <Close />
    </div>
  );
}

function Auto() {
  return (
    <div className="absolute left-0 size-[27px] top-0" data-name="Auto">
      <div className="absolute inset-[-70.37%_-92.59%_-114.81%_-92.59%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 77">
          <g id="Auto">
            <g filter="url(#filter0_d_33_203)" id="Ellipse 4">
              <circle cx="38.5" cy="32.5" fill="var(--fill-0, white)" fillOpacity="0.7" r="13.5" shapeRendering="crispEdges" />
            </g>
            <g id="Group 6">
              <path d={svgPaths.p36bccf00} fill="var(--fill-0, #FFC106)" id="Vector 4" />
              <path d={svgPaths.p1821b780} fill="var(--fill-0, #FFC106)" id="Vector 5" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="77" id="filter0_d_33_203" width="77" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="6" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_33_203" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_33_203" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Auto1() {
  return (
    <div className="absolute h-[27px] left-[256px] top-[795px] w-[29.485px]" data-name="Auto">
      <Auto />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[190px] top-[795px]">
      <div className="absolute left-[190px] size-[27px] top-[795px]">
        <div className="absolute inset-[-70.37%_-92.59%_-114.81%_-92.59%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 77">
            <g filter="url(#filter0_d_33_196)" id="Ellipse 4">
              <circle cx="38.5" cy="32.5" fill="var(--fill-0, white)" fillOpacity="0.7" r="13.5" shapeRendering="crispEdges" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="77" id="filter0_d_33_196" width="77" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="6" />
                <feGaussianBlur stdDeviation="12.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_33_196" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_33_196" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium h-[18.161px] leading-[17px] left-[203.14px] text-[#948590] text-[14px] text-center top-[800.38px] translate-x-[-50%] w-[12.107px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        4
      </p>
    </div>
  );
}

function Reed() {
  return (
    <div className="absolute left-0 size-[27px] top-0" data-name="Reed">
      <div className="absolute inset-[-70.37%_-92.59%_-114.81%_-92.59%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 77">
          <g id="Reed">
            <g filter="url(#filter0_d_33_198)" id="Ellipse 4">
              <circle cx="38.5" cy="32.5" fill="var(--fill-0, white)" fillOpacity="0.7" r="13.5" shapeRendering="crispEdges" />
            </g>
            <g id="keyboard_arrow_down">
              <path d={svgPaths.p387a5f00} fill="var(--fill-0, #948590)" id="icon" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="77" id="filter0_d_33_198" width="77" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="6" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_33_198" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_33_198" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Reed1() {
  return (
    <div className="absolute h-[27px] left-[222px] top-[795px] w-[29.485px]" data-name="Reed">
      <Reed />
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute contents left-[158px] top-[795px]">
      <div className="absolute left-[158px] size-[27px] top-[795px]">
        <div className="absolute inset-[-70.37%_-92.59%_-114.81%_-92.59%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 77">
            <g filter="url(#filter0_d_33_196)" id="Ellipse 4">
              <circle cx="38.5" cy="32.5" fill="var(--fill-0, white)" fillOpacity="0.7" r="13.5" shapeRendering="crispEdges" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="77" id="filter0_d_33_196" width="77" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="6" />
                <feGaussianBlur stdDeviation="12.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_33_196" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_33_196" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium h-[18.161px] leading-[17px] left-[171.14px] text-[#948590] text-[14px] text-center top-[800.38px] translate-x-[-50%] w-[12.107px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        3
      </p>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute contents left-[126px] top-[795px]">
      <div className="absolute left-[126px] size-[27px] top-[795px]">
        <div className="absolute inset-[-70.37%_-92.59%_-114.81%_-92.59%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 77">
            <g filter="url(#filter0_d_33_196)" id="Ellipse 4">
              <circle cx="38.5" cy="32.5" fill="var(--fill-0, white)" fillOpacity="0.7" r="13.5" shapeRendering="crispEdges" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="77" id="filter0_d_33_196" width="77" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="6" />
                <feGaussianBlur stdDeviation="12.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_33_196" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_33_196" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium h-[18.161px] leading-[17px] left-[139.14px] text-[#948590] text-[14px] text-center top-[800.38px] translate-x-[-50%] w-[12.107px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        2
      </p>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute contents left-[94px] top-[795px]">
      <div className="absolute left-[94px] size-[27px] top-[795px]">
        <div className="absolute inset-[-70.37%_-92.59%_-114.81%_-92.59%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 77 77">
            <g filter="url(#filter0_d_33_196)" id="Ellipse 4">
              <circle cx="38.5" cy="32.5" fill="var(--fill-0, white)" fillOpacity="0.7" r="13.5" shapeRendering="crispEdges" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="77" id="filter0_d_33_196" width="77" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="6" />
                <feGaussianBlur stdDeviation="12.5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_33_196" />
                <feBlend in="SourceGraphic" in2="effect1_dropShadow_33_196" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium h-[18.161px] leading-[17px] left-[107.14px] text-[#948590] text-[14px] text-center top-[800.38px] translate-x-[-50%] w-[12.107px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        1
      </p>
    </div>
  );
}

function Group10() {
  return (
    <div className="absolute contents left-[94px] top-[795px]">
      <Auto1 />
      <Group />
      <Reed1 />
      <Group2 />
      <Group3 />
      <Group4 />
    </div>
  );
}

function Group11() {
  return (
    <div className="absolute contents left-[22px] top-[784px]">
      <div className="absolute bg-[rgba(255,255,255,0.8)] h-[49px] left-[22px] rounded-[30px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.1)] top-[784px] w-[366px]" />
      <Group10 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute contents left-0 top-[6px]">
      <div className="absolute bg-[#ddced9] h-[3px] left-0 rounded-[3px] top-[9px] w-[74px]" />
      <div className="absolute bg-[#9a8494] left-[4px] size-[9px] top-[6px]" />
    </div>
  );
}

function ThreadSize() {
  return (
    <div className="absolute h-[20px] left-0 shadow-[0px_6px_25px_0px_rgba(0,0,0,0.1)] top-0 w-[102px]" data-name="thread size">
      <Group1 />
    </div>
  );
}

function Group9() {
  return (
    <div className="absolute contents left-0 top-0">
      <ThreadSize />
    </div>
  );
}

function ThreadSize1() {
  return (
    <div className="absolute h-[20px] left-[294px] top-[798px] w-[74px]" data-name="Thread Size">
      <Group9 />
    </div>
  );
}

function WarpColor() {
  return (
    <div className="absolute left-[34px] size-[23px] top-[798px]" data-name="Warp Color">
      <div className="absolute inset-[-82.61%_-108.7%_-134.78%_-108.7%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 73 73">
          <g id="Warp Color">
            <g filter="url(#filter0_d_33_212)" id="Ellipse 4">
              <circle cx="36.5" cy="30.5" fill="var(--fill-0, #F3AAD5)" r="11.5" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="73" id="filter0_d_33_212" width="73" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="6" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_33_212" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_33_212" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function WeftColor() {
  return (
    <div className="absolute left-[63px] size-[23px] top-[798px]" data-name="Weft Color">
      <div className="absolute inset-[-82.61%_-108.7%_-134.78%_-108.7%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 73 73">
          <g id="Weft Color">
            <g filter="url(#filter0_d_33_215)" id="Ellipse 4">
              <circle cx="36.5" cy="30.5" fill="var(--fill-0, #B0F3AA)" r="11.5" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="73" id="filter0_d_33_215" width="73" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="6" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_33_215" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_33_215" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Tools() {
  return (
    <div className="absolute contents left-[22px] top-[784px]" data-name="Tools">
      <Group11 />
      <ThreadSize1 />
      <WarpColor />
      <WeftColor />
    </div>
  );
}

export default function IPhone16Pro() {
  return (
    <div className="bg-white relative size-full" data-name="iPhone 16 Pro - 1">
      <Group8 />
      <Undo3 />
      <Delete3 />
      <Delete4 />
      <Tools />
    </div>
  );
}