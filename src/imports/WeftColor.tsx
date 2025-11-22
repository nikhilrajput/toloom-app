function WeftColor() {
  return (
    <div className="absolute contents left-0 top-0" data-name="Weft Color">
      <p className="absolute font-['Roboto:Medium',sans-serif] font-medium h-[17px] leading-[17px] left-[15px] text-[#806f7b] text-[8px] text-center top-[21px] tracking-[1px] translate-x-[-50%] w-[30px]" style={{ fontVariationSettings: "'wdth' 100" }}>
        WEFT
      </p>
      <div className="absolute bg-[#f3aad5] left-[3.61px] rounded-[2px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.1)] size-[22.772px] top-0" />
    </div>
  );
}

export default function WeftColor1() {
  return (
    <div className="relative size-full" data-name="Weft Color">
      <WeftColor />
    </div>
  );
}