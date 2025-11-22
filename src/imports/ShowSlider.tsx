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

function Group1() {
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
      <Group1 />
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

function Group2() {
  return (
    <div className="absolute contents left-[23px] top-[75px]">
      <div className="absolute bg-[rgba(255,255,255,0.5)] h-[44px] left-[23px] rounded-[35px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.1)] top-[75px] w-[208px]" />
      <ThreadSize1 />
    </div>
  );
}

export default function ShowSlider() {
  return (
    <div className="bg-white relative size-full" data-name="Show Slider">
      <Group />
      <Group2 />
    </div>
  );
}