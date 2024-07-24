import { useContext, useEffect } from "react";
import LessonAccordion from "./lesson-accordion";
import { CoursesDataContext } from "@/pages/courses/[courseId]/learning";
import axios from "axios";

function CoursesProgress() {
  const { setCourseData } = useContext(CoursesDataContext);

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

  useEffect(() => {
    getCourseData();
  }, []);

  return (
    <main className="w-full max-w-[350px] h-full mt-[4%] flex flex-col p-4 sm:px-6 sm:py-8 gap-4 rounded-[8px] bg-white shadow-xl">
      <div className="text-sm font-normal text-[#F47E20]">Course</div>
      <div className="header">
        <h2 className="text-2xl font-medium">Service Design Essentials</h2>
        <p className="text-base font-normal text-[#646D89]">
          Lorem ipsum dolor sit amet, conse ctetur adipiscing elit.
        </p>
      </div>
      <div className="percent">
        <a className="text-sm font-normal text-[#646D89]">15% Complete</a>
        <progress
          className="progress progress-bar  w-full"
          value={15}
          max="100"
        ></progress>
      </div>
      <LessonAccordion />
    </main>
  );
}
export default CoursesProgress;
