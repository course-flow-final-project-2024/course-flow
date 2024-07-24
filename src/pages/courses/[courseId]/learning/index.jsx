import Navbar from "@/components/navbar/navbar.jsx";
import ActionBar from "@/components/course-learning-section/action-bar";
import CommonFooter from "@/components/footer/common-footer";
import CoursesContent from "@/components/course-learning-section/content";
import CoursesProgress from "@/components/course-learning-section/progress";
import { createContext, useState } from "react";

export const CoursesDataContext = createContext();

function CourseLearning() {
  const [courseData, setCourseData] = useState([]);
  const [currentSubLessonIndex, setCurrentSubLessonIndex] = useState(0);

  const handleNextLesson = () => {
    setCurrentSubLessonIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousLesson = () => {
    setCurrentSubLessonIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : 0
    );
  };

  return (
    <CoursesDataContext.Provider
      value={{
        courseData,
        setCourseData,
        currentSubLessonIndex,
        setCurrentSubLessonIndex,
      }}
    >
      <div className="w-full h-max">
        <Navbar />
        <div className="w-full h-full flex flex-col sm:flex-row sm:justify-center max-[640px]:items-center ">
          <CoursesProgress />
          <CoursesContent />
        </div>
        <ActionBar
          onNextLesson={handleNextLesson}
          onPreviousLesson={handlePreviousLesson}
        />
        <CommonFooter />
      </div>
    </CoursesDataContext.Provider>
  );
}

export default CourseLearning;
