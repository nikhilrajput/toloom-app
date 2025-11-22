import imgHue from "figma:asset/6ea72ef8462da9867a998ac36b79c812e922b4a7.png";

function Hue() {
  return (
    <div className="h-[8px] relative rounded-[100px] shrink-0 w-full" data-name="Hue">
      <div className="absolute h-[8px] left-0 right-0 rounded-[100px] top-1/2 translate-y-[-50%]" data-name="Hue">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none rounded-[100px] size-full" src={imgHue} />
      </div>
      <div className="absolute bottom-0 right-[77px] top-0 w-[8px]">
        <div className="absolute inset-[-37.5%_-87.5%_-137.5%_-87.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
            <g filter="url(#filter0_dd_90_1295)" id="Ellipse 1">
              <circle cx="11" cy="7" r="4" stroke="var(--stroke-0, white)" strokeWidth="2" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="22" id="filter0_dd_90_1295" width="22" x="0" y="0">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="3" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.121569 0 0 0 0 0.160784 0 0 0 0 0.215686 0 0 0 0.1 0" />
                <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_90_1295" />
                <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                <feOffset dy="2" />
                <feGaussianBlur stdDeviation="2" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.121569 0 0 0 0 0.160784 0 0 0 0 0.215686 0 0 0 0.06 0" />
                <feBlend in2="effect1_dropShadow_90_1295" mode="normal" result="effect2_dropShadow_90_1295" />
                <feBlend in="SourceGraphic" in2="effect2_dropShadow_90_1295" mode="normal" result="shape" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function FieldMaster() {
  return (
    <div className="basis-0 bg-white grow min-h-px min-w-px relative rounded-[4px] shrink-0" data-name="Field Master">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-[-1px] pointer-events-none rounded-[5px] shadow-[0px_1px_2px_0px_rgba(31,41,55,0.08)]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[4px] items-center px-[6px] py-[4px] relative w-full">
          <div className="basis-0 flex flex-col font-['Inter:Regular',sans-serif] font-normal grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-gray-700">
            <p className="leading-[20px]">
              <span className="text-gray-400">#</span>
              <span>{` 4F46E5`}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field() {
  return (
    <div className="basis-0 content-stretch flex grow items-start min-h-px min-w-px relative shrink-0" data-name="Field">
      <FieldMaster />
    </div>
  );
}

function Fields() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Fields">
      <Field />
    </div>
  );
}

function SavedColors() {
  return (
    <div className="content-stretch flex font-['Inter:Medium',sans-serif] font-medium items-center justify-between leading-[0] not-italic relative shrink-0 text-[12px] text-nowrap w-full" data-name="Saved Colors">
      <div className="flex flex-col justify-center relative shrink-0 text-gray-700">
        <p className="leading-[16px] text-nowrap whitespace-pre">Saved colors:</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0 text-gray-500">
        <p className="leading-[16px] text-nowrap whitespace-pre">+ Add</p>
      </div>
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Row">
      <div className="bg-red-500 rounded-[100px] shrink-0 size-[24px]" data-name="Swatch" />
      <div className="bg-orange-500 rounded-[100px] shrink-0 size-[24px]" data-name="Swatch" />
      <div className="bg-yellow-400 rounded-[100px] shrink-0 size-[24px]" data-name="Swatch" />
      <div className="bg-green-400 rounded-[100px] shrink-0 size-[24px]" data-name="Swatch" />
      <div className="bg-teal-400 rounded-[100px] shrink-0 size-[24px]" data-name="Swatch" />
      <div className="bg-blue-500 rounded-[100px] shrink-0 size-[24px]" data-name="Swatch" />
      <div className="bg-indigo-500 relative rounded-[100px] shrink-0 size-[24px]" data-name="Swatch">
        <div aria-hidden="true" className="absolute border-2 border-solid border-white inset-[-2px] pointer-events-none rounded-[102px] shadow-[0px_0px_0px_2px_rgba(0,0,0,0.25)]" />
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Row">
      <div className="bg-pink-500 rounded-[100px] shrink-0 size-[24px]" data-name="Swatch" />
      <div className="bg-rose-500 rounded-[100px] shrink-0 size-[24px]" data-name="Swatch" />
      <div className="bg-fuchsia-500 rounded-[100px] shrink-0 size-[24px]" data-name="Swatch" />
      <div className="bg-violet-500 rounded-[100px] shrink-0 size-[24px]" data-name="Swatch" />
      <div className="bg-sky-500 rounded-[100px] shrink-0 size-[24px]" data-name="Swatch" />
      <div className="bg-emerald-500 rounded-[100px] shrink-0 size-[24px]" data-name="Swatch" />
      <div className="bg-lime-500 rounded-[100px] shrink-0 size-[24px]" data-name="Swatch" />
    </div>
  );
}

function Swatches() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Swatches">
      <Row />
      <Row1 />
    </div>
  );
}

export default function ColorPicker() {
  return (
    <div className="bg-white relative rounded-[8px] shadow-[0px_10px_15px_0px_rgba(31,41,55,0.1),0px_4px_6px_0px_rgba(31,41,55,0.05)] size-full" data-name="Color Picker">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[16px] items-start p-[16px] relative size-full">
          <div className="basis-0 grow min-h-px min-w-px rounded-[4px] shrink-0 w-full" data-name="Colorspace" style={{ backgroundImage: "linear-gradient(90deg, rgba(79, 70, 229, 0) 0%, rgb(79, 70, 229) 100%), linear-gradient(2.07261e-07deg, rgb(0, 0, 0) 0%, rgba(196, 196, 196, 0) 100%)" }} />
          <Hue />
          <Fields />
          <SavedColors />
          <Swatches />
        </div>
      </div>
    </div>
  );
}