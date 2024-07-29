import CourseCard from "../courses/course-card";
import { DesiredCoursesContext } from "@/pages/desired-courses";
import { useContext } from "react";

function DesiredCourseContainer() {
  const context = useContext(DesiredCoursesContext);
  const courseData = context.userDesiredCourses;
  return (
    <div className="w-full h-max px-16 py-16">
      <div className="flex flex-col gap-8">
        <h1 className="w-full text-center text-4xl">Desired Course</h1>
        <div className="w-full h-max">
          {courseData.map((item, index) => {
            return (
              <div className="grid justify-center" key={index}>
                <CourseCard
                  course_id={item.course_id}
                  course_image={item.courses.course_image}
                  course_name={item.courses.course_name}
                  summary={item.courses.summary}
                  lessons={item.courses.lessons}
                  duration={item.courses.duration}
                  index={index}
                  key={index + item.courses.course_name}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DesiredCourseContainer;
