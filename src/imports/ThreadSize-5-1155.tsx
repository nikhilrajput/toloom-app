function Group() {
  return (
    <div className="absolute contents left-0 top-[6px]">
      <div className="absolute bg-[#d9d9d9] h-[3px] left-0 top-[9px] w-[100px]" />
      <div className="absolute bg-[#9a8494] left-0 size-[8px] top-[6px]" />
    </div>
  );
}

export default function ThreadSize() {
  return (
    <div className="relative size-full" data-name="thread size">
      <Group />
    </div>
  );
}