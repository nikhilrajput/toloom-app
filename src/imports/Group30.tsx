function Group() {
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
      <Group />
    </div>
  );
}

function ThreadSize1() {
  return (
    <div className="absolute h-[20px] left-[19px] top-[12px] w-[165px]" data-name="Thread Size">
      <ThreadSize />
    </div>
  );
}

export default function Group1() {
  return (
    <div className="relative size-full">
      <div className="absolute bg-[rgba(255,255,255,0.5)] h-[44px] left-0 rounded-[35px] shadow-[0px_6px_25px_0px_rgba(0,0,0,0.1)] top-0 w-[208px]" />
      <ThreadSize1 />
    </div>
  );
}