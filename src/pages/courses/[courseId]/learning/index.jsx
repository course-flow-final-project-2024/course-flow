import Navbar from "@/components/navbar/navbar.jsx";
import ActionBar from "@/components/course-learning-section/action-bar";
import CommonFooter from "@/components/footer/common-footer";
import CoursesContent from "@/components/course-learning-section/content";
import CoursesProgress from "@/components/course-learning-section/progress";
import { createContext, useState, useEffect, useRef } from "react";
import getUserCourseInfo from "./getUserCourseInfo";
import { useRouter } from "next/router";

export const CoursesDataContext = createContext();
function CourseLearning() {
  const router = useRouter();
  const { courseId } = router.query;
  const titleRef = useRef(null);

  const [courseData, setCourseData] = useState([]);
  const [lessonData, setLessonData] = useState([]);
  const [subLessonData, setSubLessonData] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentSubLessonId, setCurrentSubLessonId] = useState(0);
  const [subLessonsLenght, setSubLessonsLenght] = useState(0);
  const [currentSubLessonIndex, setCurrentSubLessonIndex] = useState(0);
  const [subLessonStatus, setSubLessonStatus] = useState({});
  const [progress, setProgress] = useState(0);
  const [isVideoEnded, setisVideoEnded] = useState(0);
  const [assignmentData, setAssignmentData] = useState([]);

  const updateSubLessonStatus = (subLessonId, status) => {
    setSubLessonData((prevData) =>
      prevData.map((subLesson) =>
        subLesson.sub_lesson_id === subLessonId
          ? {
              ...subLesson,
              user_lessons: [
                { ...subLesson.user_lessons[0], sub_lesson_status_id: status },
              ],
            }
          : subLesson
      )
    );
  };

  const setSubLessonPlayStatus = (subLessonId, isPlaying, isEnded) => {
    setSubLessonStatus((prevStatus) => {
      const currentStatus = prevStatus[subLessonId] || {};
      const finalStatus = currentStatus.isEnded
        ? { isPlaying: false, isEnded: true }
        : { isPlaying, isEnded };
      return {
        ...prevStatus,
        [subLessonId]: finalStatus,
      };
    });
  };

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
    updateSubLessonStatus,
    subLessonStatus,
    setSubLessonPlayStatus,
    progress,
    setProgress,
    isVideoEnded,
    setisVideoEnded,
    assignmentData,
    setAssignmentData,
  };

  useEffect(() => {
    if (courseId) {
      getUserCourseInfo(
        setCourseData,
        setLessonData,
        setSubLessonData,
        setSubLessonsLenght,
        setAssignmentData,
        router,
        courseId
      );
    }
  }, [courseId]);

  useEffect(() => {
    if (subLessonData.length > 0) {
      const firstSubLessonIndex = subLessonData.findIndex(
        (subLesson) =>
          subLesson.user_lessons[0].sub_lesson_status_id === 2 ||
          subLesson.user_lessons[0].sub_lesson_status_id === 3
      );
      if (firstSubLessonIndex !== -1) {
        const firstSubLesson = subLessonData[firstSubLessonIndex];
        const lessonIndex = lessonData.findIndex((lesson) =>
          lesson.sub_lessons.some(
            (subLesson) =>
              subLesson.sub_lesson_id === firstSubLesson.sub_lesson_id
          )
        );
        setCurrentLessonIndex(lessonIndex);
        setCurrentSubLessonIndex(firstSubLessonIndex);
        setCurrentSubLessonId(firstSubLesson.sub_lesson_id);
      }
    }
  }, [subLessonData, lessonData]);

  return (
    <CoursesDataContext.Provider value={valueInContext}>
      <div className="w-full h-max">
        <Navbar />
        <div className="w-full h-full flex flex-col sm:flex-row sm:justify-center max-[640px]:items-center ">
          <CoursesProgress titleRef={titleRef} />
          <CoursesContent titleRef={titleRef} />
        </div>
        <ActionBar titleRef={titleRef} />
        <CommonFooter />
      </div>
    </CoursesDataContext.Provider>
  );
}

export default CourseLearning;
