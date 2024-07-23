import Button from "@/utils/button";
function ActionBar(prop) {
  return (
    <div className="w-full h-[100px] flex flex-row justify-between items-center p-4 shadow-sm">
      <div className="px-1">
        <a className="text-xl font-bold text-[#2F5FAC]">Previous Lesson</a>
      </div>
      <div className="w-[160px] flex">
        <Button text="Next Lesson" style="primary" />
      </div>
    </div>
  );
}
export default ActionBar;
