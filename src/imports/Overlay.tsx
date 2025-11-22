function Tools() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Tools">
      <div className="absolute bg-[rgba(255,255,255,0.8)] h-[130px] left-0 rounded-[20px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.1)] top-0 w-[142px]" />
      <p className="absolute font-['Roboto:Light',sans-serif] font-light h-[17px] leading-[17px] left-[17px] text-[8px] text-black top-[17px] tracking-[2px] w-[100px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        WEAVING STYLE:
      </p>
      <p className="absolute font-['Roboto:Light',sans-serif] font-light h-[17px] leading-[17px] left-[19px] text-[8px] text-black top-[43px] tracking-[2px] w-[85px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        PLAIN
      </p>
      <p className="absolute font-['Roboto:Light',sans-serif] font-light h-[17px] leading-[17px] left-[19px] text-[8px] text-black top-[71px] tracking-[2px] w-[85px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        TWILL
      </p>
      <p className="absolute font-['Roboto:Light',sans-serif] font-light h-[17px] leading-[17px] left-[19px] text-[8px] text-black top-[97px] tracking-[2px] w-[85px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        HERRINGBONE
      </p>
    </div>
  );
}

export default function Overlay() {
  return (
    <div className="relative size-full" data-name="Overlay">
      <Tools />
    </div>
  );
}