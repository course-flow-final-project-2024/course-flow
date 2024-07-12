function SideCourseCard() {
  return (
    <div className="w-full h-max shadow-lg py-8 px-6 flex flex-col gap-6 rounded-lg lg:h-[20%] ">
      <div className="w-full text-sm text-[#F47E20]">Course</div>
      <div className="w-full flex flex-col gap-2">
        <h3 className="font-medium md:text-xl xl:text-2xl text-black">
          Service Design Essentials
        </h3>
        <span className="text-[#646D89] md:text-sm xl:text-base ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </span>
      </div>
      <h3 className="w-full font-medium md:text-xl xl:text-2xl text-[#646D89]">
        THB 3,559.00
      </h3>
      <div className="border-t-[1px] flex flex-col gap-4 pt-8">
        <button className="h-max py-4 rounded-xl bg-white text-orange-500 border-[1px] border-orange-500 active:bg-gray-100 hover:text-[#FBAA1C] hover:border-[#FBAA1C] focus:ring-2 ring-violet-300 text-sm font-bold ease-in-out duration-200 ">
          Get in Desire Course
        </button>
        <button className="h-max py-4 rounded-xl bg-[#2F5FAC] text-white  active:bg-[#183056] hover:bg-[#5483D0] focus:ring-2 ring-violet-300 text-sm font-bold ease-in-out duration-200">
          Subscribe This Course
        </button>
      </div>
    </div>
  );
}

export default SideCourseCard;
