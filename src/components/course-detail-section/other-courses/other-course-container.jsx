import CourseCard from "@/components/courses/course-card";

function OtherCourses({ courseData }) {
  return (
    <div className="w-full h-max px-4 py-10 bg-[#F6F7FC] lg:px-69">
      <div className="w-full h-max flex flex-col gap-4 items-center">
        <span className="font-medium text-2xl text-center">
          Other Interesting Course
        </span>
        <div className="w-full h-max flex flex-col items-center lg:flex-row lg:justify-center lg:gap-1 ">
          <CourseCard
            course_image={courseData.length > 0 && courseData[0].course_image}
            course_name={courseData.length > 0 && courseData[0].course_name}
            summary={courseData.length > 0 && courseData[0].summary}
            lessons={[1]}
            duration={courseData.length > 0 && courseData[0].duration}
            index={1}
            key={0 + courseData.length > 0 && courseData[0].course_name}
          />
          <CourseCard
            course_image={courseData.length > 0 && courseData[0].course_image}
            course_name={courseData.length > 0 && courseData[0].course_name}
            summary={courseData.length > 0 && courseData[0].summary}
            lessons={[1, 2, 3]}
            duration={courseData.length > 0 && courseData[0].duration}
            index={1}
            key={0 + courseData.length > 0 && courseData[0].course_name}
          />
        </div>
      </div>
    </div>
  );
}

export default OtherCourses;
