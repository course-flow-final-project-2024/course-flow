import { useContext, useEffect, useState } from "react";
import LessonAccordion from "./lesson-accordion";
import { CoursesDataContext } from "@/pages/courses/[courseId]/learning";
import axios from "axios";

function CoursesProgress() {
  const { courseData, setCourseData } = useContext(CoursesDataContext);
  const [progress, setProgress] = useState(0);

  const getCourseData = async () => {
    try {
      const result = await axios.get(
        `/api/courses_learning/get-sub-lesson-status`,
        {
          params: {
            userId: 17,
            courseId: 5,
          },
        }
      );
      setCourseData(result.data.courses);
    } catch (error) {
      return {
        message: "Server could not read courses due to database connection",
      };
    }
  };

  const calculateProgress = (lessons) => {
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
      const progressValue = calculateProgress(course.lessons);
      setProgress(progressValue);
    }
  }, [courseData]);

  useEffect(() => {
    getCourseData();
  }, []);

  const course = courseData.length > 0 ? courseData[0].courses : "Loading...";

  return (
    <main className="w-full max-w-[350px] h-full mt-[4%] flex flex-col p-4 sm:px-6 sm:py-8 gap-4 rounded-[8px] bg-white shadow-xl">
      <div className="text-sm font-normal text-[#F47E20]">Course</div>
      <div className="header">
        <h2 className="text-2xl font-medium">{course.course_name}</h2>
        <p className="text-base font-normal text-[#646D89]">{course.summary}</p>
      </div>
      <div className="percent">
        <a className="text-sm font-normal text-[#646D89]">
          {progress.toFixed(2)}% Complete
        </a>
        <progress
          className="progress progress-bar  w-full"
          value={progress}
          max="100"
        ></progress>
      </div>
      <LessonAccordion />
    </main>
  );
}
export default CoursesProgress;
