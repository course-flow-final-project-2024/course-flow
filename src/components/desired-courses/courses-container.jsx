import CourseCard from "../courses/course-card";
import { DesiredCoursesContext } from "@/pages/desired-courses";
import { useToast } from "@chakra-ui/react";
import { useContext, useEffect } from "react";

function DesiredCourseContainer() {
  const context = useContext(DesiredCoursesContext);
  const loadingStatus = context.loadingStatus;
  const errorStatus = context.errorStatus;
  const courseData = context.userDesiredCourses;
  const toast = useToast();

  useEffect(() => {
    if (errorStatus) {
      toast({
        title: "Error",
        description: `There was a problem retrieving your desired courses. Please try again later.`,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [errorStatus, toast]);

  return (
    <div className="w-full h-max min-h-[980px] px-4 py-12 sm:py-24 sm:px-16 lg:px-40 min-[1800px]:px-96 z-10 relative">
      <div className="w-full flex flex-col items-center gap-14 ">
        <h2 className="w-full text-center text-4xl font-medium justify-self-start ">
          Desired Courses
        </h2>

        {loadingStatus ? (
          <div className="w-full min-h-[350px] flex flex-col gap-4 items-center justify-center">
            <span className="text-3xl">Loading</span>
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : courseData.length === 0 ? (
          <div className="w-full min-h-[350px] flex flex-col gap-2 items-center justify-center">
            <span className="text-lg font-medium sm:text-xl md:text-2xl xl:text-3xl">
              There are currently no course in your desired courses list.
            </span>
          </div>
        ) : (
          <div className="w-full h-max grid justify-items-center grid-cols-[repeat(auto-fill,minmax(360px,1fr))] max-[375px]:overflow-scroll gap-4">
            {courseData.map((item, index) => (
              <div
                className="grid w-max sm:pt-[20px] max-[375px]:scale-[0.85] max-[375px]:justify-items-start"
                key={index}
              >
                <CourseCard
                  course_id={item.course_id}
                  course_image={item.courses.course_image}
                  course_name={item.courses.course_name}
                  summary={item.courses.summary}
                  lessons={item.courses.lessons}
                  duration={item.courses.duration}
                  index={index}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DesiredCourseContainer;
