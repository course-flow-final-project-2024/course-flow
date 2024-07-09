import CourseCard from "../../components/courses/course_card";
import Image from "next/image";

export default function course() {
  return (
    <div className="sm:px-[160px] px-4">
      <div className="flex flex-col sm:mt-[100px] items-center pt-[40px] pb-[48px] sm:pt-0 sm:pb-0">
        <h1 className="sm:text-4xl text-2xl font-medium text-center">
          Our Courses
        </h1>
        <div className="sm:mt-[60px] sm:pt-0 pt-[32px]">
          <Image src="" alt="" />
          <input
            placeholder="Search..."
            className="w-[343px] sm:w-[357px] h-[48px] outline-none border border-[#CCD0D7] rounded-lg"
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center sm:mt-[100px] gap-6">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
}
