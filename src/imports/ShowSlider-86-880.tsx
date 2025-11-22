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

function ActiveTrack() {
  return (
    <div className="content-stretch flex flex-col h-[8px] items-center justify-center overflow-clip relative shrink-0 w-[15px]" data-name="Active track">
      <div className="basis-0 bg-[rgba(255,255,255,0.5)] grow min-h-px min-w-px rounded-bl-[16px] rounded-br-[2px] rounded-tl-[16px] rounded-tr-[2px] shrink-0 w-full" data-name="Track" />
    </div>
  );
}

function Handle() {
  return <div className="bg-[rgba(114,104,111,0.8)] overflow-clip rounded-[20px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.1)] shrink-0 size-[14px]" data-name="Handle" />;
}

function InactiveTrack() {
  return (
    <div className="content-stretch flex h-[8px] items-center justify-between overflow-clip relative shrink-0 w-[153px]" data-name="Inactive track">
      <div className="basis-0 bg-[rgba(255,255,255,0.8)] grow h-full min-h-px min-w-px rounded-bl-[2px] rounded-br-[16px] rounded-tl-[2px] rounded-tr-[16px] shrink-0" data-name="Track" />
    </div>
  );
}

function StandardSlider() {
  return (
    <div className="absolute content-stretch flex gap-[6px] items-center left-[113px] top-[798px] w-[194px]" data-name="Standard slider">
      <ActiveTrack />
      <Handle />
      <InactiveTrack />
    </div>
  );
}

export default function ShowSlider() {
  return (
    <div className="bg-white relative size-full" data-name="Show Slider">
      <Group />
      <StandardSlider />
    </div>
  );
}