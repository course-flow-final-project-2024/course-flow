export default function Button(prop) {
  let style;
  if (prop.style === "primary") {
    //blue button
    style = `grow h-[60px] p-2 rounded-xl bg-[#2F5FAC] text-white outline-none active:bg-[#183056] hover:bg-[#5483D0] focus:ring-2 ring-violet-300 text-base font-bold border-2 border-[#2F5FAC] hover:border-[#5483D0] active:border-[#183056] ${prop.customStyle}`;
  } else if (prop.style === "secondary") {
    //orange button
    style = `grow h-[60px] p-2 rounded-xl bg-white text-orange-500 border-2 border-solid border-orange-500 focus:outline-none active:bg-gray-100 hover:text-[#FBAA1C] hover:border-[#FBAA1C] focus:ring-2 ring-violet-300 text-base font-bold ${prop.customStyle}`;
  }
  return (
    <button
      className={style}
      onClick={prop.onClick}
      type={prop.type}
      form={prop.form}
    >
      {prop.text}
    </button>
  );
}
``;
