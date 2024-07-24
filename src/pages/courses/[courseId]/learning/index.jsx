import Navbar from "@/components/navbar/navbar.jsx";
import ActionBar from "@/components/course-learning-section/action-bar";
import CommonFooter from "@/components/footer/common-footer";
import CoursesContent from "@/components/course-learning-section/content";
import CoursesProgress from "@/components/course-learning-section/progress";
import getUserCourseById from "./get-user-course-by-id";
import { createContext, useState } from "react";

export const CoursesDataContext = createContext();

function CourseLearning() {
  getUserCourseById(17, 5);
  return (
    <CoursesDataContext.Provider value={{ lesson, setLesson }}>
      <div className="w-full h-max">
        <Navbar />
        <div className="w-full h-full flex flex-col sm:flex-row sm:justify-center max-[640px]:items-center ">
          <CoursesProgress />
          <CoursesContent />
        </div>
        <ActionBar />
        <CommonFooter />
      </div>
    </CoursesDataContext.Provider>
  );
}

export default CourseLearning;
