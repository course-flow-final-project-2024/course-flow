import CourseCard from "@/components/courses/course-card";
import { useState, useEffect, useContext } from "react";
import { CourseDetailContext } from "@/pages/courses/[courseId]";

function OtherCourses() {
  const context = useContext(CourseDetailContext);
  const allCourseData = context.allCourseData;
  const courseId = context.courseId;
  const [randomCourses, setRandomCourses] = useState([]);

  const getRandomCourses = () => {
    if (allCourseData.length > 0) {
      let randomIndices = [];
      while (randomIndices.length < 3) {
        let randomIndex = Math.floor(Math.random() * allCourseData.length);
        if (
          !randomIndices.includes(randomIndex) &&
          !randomIndices.includes(courseId)
        ) {
          randomIndices.push(randomIndex);
        }
      }
      setRandomCourses(randomIndices);
    }
  };

  useEffect(() => {
    getRandomCourses();
  }, [allCourseData, courseId]);

  return (
    <div className="w-full h-max px-4 py-10 bg-[#F6F7FC] lg:px-69 max-[375px]:px-0">
      <div className="w-full h-max flex flex-col gap-4 lg:gap-8 items-center">
        <span className="font-medium text-2xl text-center">
          Other Interesting Course
        </span>
        <div className="w-full h-max flex flex-col items-center lg:flex-row lg:justify-center lg:gap-6 max-[1150px]:overflow-x-scroll ">
          {randomCourses.length > 0 ? (
            randomCourses.map((index) => {
              const course = allCourseData[index];
              return (
                <div className="grid justify-center" key={course.course_id}>
                  <CourseCard
                    course_id={course.course_id}
                    course_image={course.course_image}
                    course_name={course.course_name}
                    summary={course.summary}
                    lessons={course.lessons}
                    duration={course.duration}
                    index={index}
                    key={index + course.course_name}
                  />
                </div>
              );
            })
          ) : (
            <span className="loading loading-dots loading-lg"></span>
          )}
        </div>
      </div>
    </div>
  );
}

export default OtherCourses;
