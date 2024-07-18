import Link from "next/link";
import Image from "next/image";
import LessonSamples from "./lesson-samples";
import SideCourseCard from "./side-course-card";

function TopContent() {
  return (
    <div className="w-full h-max flex flex-col gap-4 ">
      <Link href="/courses" className="w-max flex flex-row gap-2 py-1 px-2 ">
        <Image
          src="course-detail/left-arrow.svg"
          alt=""
          width={16}
          height={16}
        />
        <span className="w-max h-max font-bold text-[#2F5FAC]">Back</span>
      </Link>
      <div className="w-full h-max object-cover ">
        <Image
          src="/course-detail/mock-video.svg"
          width={343}
          height={214}
          alt="mock"
          className="object-cover w-full"
        />
      </div>
    </div>
  );
}
function CourseDetail({ courseData }) {
  return (
    <div className="w-full h-max flex flex-col gap-4">
      <h3 className="w-full h-max text-left font-medium text-2xl lg:text-3xl ">
        Course Detail
      </h3>
      <div className="w-full h-max text-sm text-[#646D89] lg:text-base">
        {courseData.length > 0 && courseData[0].detail}
      </div>
    </div>
  );
}

function MainDetail({ courseData }) {
  return (
    <div className="lg:flex h-max min-h-max lg:flex-row p-4 pb-10 flex flex-col gap-8 sm:px-12 ease-in-out duration-200 xl:px-40 min-[1800px]:px-96 ">
      <div className="w-full h-max flex flex-col gap-8 ">
        <TopContent courseData={courseData} />
        <CourseDetail courseData={courseData} />
        <LessonSamples courseData={courseData} />
      </div>
      <div className="max-lg:hidden w-[50%] flex-grow t-12 relative pt-12">
        <SideCourseCard courseData={courseData} />
      </div>
    </div>
  );
}

export default MainDetail;
