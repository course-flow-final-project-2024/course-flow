import Navbar from "@/components/navbar/navbar.jsx";
import ActionBar from "@/components/course-learning-section/action-bar";
import CommonFooter from "@/components/footer/common-footer";
import CoursesContent from "@/components/course-learning-section/content";
import CoursesProgress from "@/components/course-learning-section/progress";
import { createContext, useState, useEffect } from "react";
import getUserCourseInfo from "./getUserCourseInfo";
import { useRouter } from "next/router";

export const CoursesDataContext = createContext();
function CourseLearning() {
  const router = useRouter();
  const [courseData, setCourseData] = useState([]);
  const [lessonData, setLessonData] = useState([]);
  const [subLessonData, setSubLessonData] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentSubLessonId, setCurrentSubLessonId] = useState(0);
  const [subLessonsLenght, setSubLessonsLenght] = useState(0);
  const [currentSubLessonIndex, setCurrentSubLessonIndex] = useState(0);

  const valueInContext = {
    courseData,
    lessonData,
    subLessonData,
    subLessonsLenght,
    setSubLessonsLenght,
    currentLessonIndex,
    setCurrentLessonIndex,
    currentSubLessonId,
    setCurrentSubLessonId,
    currentSubLessonIndex,
    setCurrentSubLessonIndex,
  };

  useEffect(() => {
    getUserCourseInfo(
      setCourseData,
      setLessonData,
      setSubLessonData,
      setSubLessonsLenght,
      router
    );
  }, []);

  return (
    <CoursesDataContext.Provider value={valueInContext}>
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