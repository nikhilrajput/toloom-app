function Group() {
  return (
    <div className="absolute left-0 size-[34px] top-0">
      <div className="absolute inset-[-55.88%_-73.53%_-91.18%_-73.53%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 84 84">
          <g id="Group 12">
            <g filter="url(#filter0_d_43_234)" id="Ellipse 4">
              <circle cx="42" cy="36" fill="var(--fill-0, #72686F)" r="17" />
            </g>
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="84" id="filter0_d_43_234" width="84" x="0" y="0">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="6" />
              <feGaussianBlur stdDeviation="12.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_43_234" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_43_234" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Cloud() {
  return (
    <div className="absolute left-0 size-[34px] top-0" data-name="Cloud">
      <Group />
    </div>
  );
}

export default function Group1() {
  return (
    <div className="relative shadow-[0px_6px_25px_0px_rgba(0,0,0,0.1)] size-full">
      <Cloud />
      <p className="absolute font-['Roboto:SemiBold',sans-serif] font-semibold h-[25px] leading-[17px] left-[17px] text-[18px] text-black text-center top-[9px] translate-x-[-50%] w-[26px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        🌤️
      </p>
    </div>
  );
}