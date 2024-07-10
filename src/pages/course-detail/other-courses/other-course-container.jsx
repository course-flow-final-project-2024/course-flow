import Image from "next/image";

function OtherCourses() {
  return (
    <div className="w-full h-max px-4 py-10 bg-[#F6F7FC]">
      <div className="w-full h-max flex flex-col gap-4 items-center">
        <span className="font-medium text-2xl text-center">
          Other Interesting Course
        </span>
        <div className="w-full h-max flex flex-col items-center">
          <Image
            src="course-detail/course-card.svg"
            width={343}
            height={431}
            className="w-full max-w-[400px]"
          />
          <Image
            src="course-detail/course-card.svg"
            width={343}
            height={431}
            className="w-full max-w-[400px]"
          />
          <Image
            src="course-detail/course-card.svg"
            width={343}
            height={431}
            className="w-full max-w-[400px]"
          />
        </div>
      </div>
    </div>
  );
}

export default OtherCourses;
