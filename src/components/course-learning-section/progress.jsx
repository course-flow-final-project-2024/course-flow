import { useContext, useEffect, useState } from "react";
import LessonAccordion from "./lesson-accordion";
import { CoursesDataContext } from "@/pages/courses/[courseId]/learning";

function CoursesProgress({ titleRef }) {
  const { courseData, progress, setProgress } = useContext(CoursesDataContext);
  const [isAccordionRendered, setIsAccordionRendered] = useState(false);

  const calProgress = (lessons) => {
    let totalSubLessons = 0;
    let completedSubLessons = 0;

    lessons.forEach((lesson) => {
      lesson.sub_lessons.forEach((subLesson) => {
        totalSubLessons++;
        if (
          subLesson.user_lessons.some((item) => item.sub_lesson_status_id === 1)
        ) {
          completedSubLessons++;
        }
      });
    });

    return totalSubLessons > 0
      ? (completedSubLessons / totalSubLessons) * 100
      : 0;
  };

  useEffect(() => {
    if (courseData.length > 0) {
      const course = courseData[0].courses;
      const progressValue = calProgress(course.lessons);
      setProgress(progressValue);
    }
  }, [courseData, setProgress]);

  const handleAccordionRendered = () => {
    setIsAccordionRendered(true);
  };

  const course = courseData.length > 0 ? courseData[0].courses : "Loading...";

  return (
    <div className="sm:min-h-[500px] mt-[4%]">
      <div className="w-full max-w-[350px]  h-fit flex flex-col p-4 sm:px-6 sm:py-8 gap-4 rounded-[8px] bg-white shadow-xl">
        {isAccordionRendered && course !== "Loading..." && (
          <>
            <h1 className="text-sm font-normal text-[#F47E20]">Course</h1>
            <div className="header">
              <h2 className="text-2xl font-medium">{course.course_name}</h2>
              <p className="text-base font-normal text-[#646D89]">
                {course.summary}
              </p>
            </div>
            <div className="percent">
              <a className="text-sm font-normal text-[#646D89]">
                {Math.round(progress)}% Complete
              </a>
              <progress
                className="progress progress-bar  w-full"
                value={progress}
                max="100"
              ></progress>
            </div>
          </>
        )}
        <LessonAccordion
          onRendered={handleAccordionRendered}
          titleRef={titleRef}
        />
      </div>
    </div>
  );
}

export default CoursesProgress;
