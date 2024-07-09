import Navbar from "@/components/navbar";
import CourseCard from "../../components/courses/course-card";
import PageDecoration from "../../components/courses/page-decoration";
import Image from "next/image";

export default function Course() {
  return (
    <>
      <Navbar />
      <div className="sm:px-[160px] px-4">
        <div className="flex flex-col sm:mt-[100px] items-center pt-[40px] pb-[48px] sm:pt-0 sm:pb-0">
          <PageDecoration />
          <h1 className="sm:text-4xl text-2xl font-medium text-center">
            Our Courses
          </h1>
          <div className="flex w-[343px] sm:w-[357px] h-[48px] sm:mt-[60px] sm:pt-0 mt-[32px] border border-[#CCD0D7] rounded-lg gap-2.5 pl-3">
            <Image
              src="/icons/search.svg"
              alt="search icon"
              width={24}
              height={24}
            />
            <input
              placeholder="Search..."
              className="outline-none sm:w-[300px] w-[290px]"
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
    </>
  );
}
