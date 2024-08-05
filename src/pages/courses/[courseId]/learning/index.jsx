import Navbar from "@/components/navbar/navbar.jsx";
import ActionBar from "@/components/course-learning-section/action-bar";
import CommonFooter from "@/components/footer/common-footer";
import CoursesContent from "@/components/course-learning-section/content";
import CoursesProgress from "@/components/course-learning-section/progress";
import { createContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export const CoursesDataContext = createContext();
function CourseLearning() {
  const router = useRouter();
  const { courseId, subLessonId } = router.query;
  const titleRef = useRef(null);

  const [courseData, setCourseData] = useState([]);
  const [lessonData, setLessonData] = useState([]);
  const [subLessonData, setSubLessonData] = useState([]);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentSubLessonId, setCurrentSubLessonId] = useState(0);
  const [subLessonsLenght, setSubLessonsLength] = useState(0);
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
    setLessonData,
    subLessonsLenght,
    setSubLessonsLength,
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
    setSubLessonData,
    setSubLessonsLength,
    setAssignmentData,
    setCourseData,
  };

  useEffect(() => {
    async function getUserCourseInfo() {
      const hasToken = localStorage.getItem("token");
      if (!hasToken) {
        router.push("/login");
      }
      try {
        const result = await axios.get(
          `/api/courses_learning/get-user-learning-course`,
          {
            params: {
              courseId,
            },
          }
        );
        if (result.data.courses.length !== 0) {
          setCourseData(result.data.courses);
          setLessonData(result.data.courses[0].courses.lessons);
          const subLessons = result.data.courses[0].courses.lessons.flatMap(
            (lesson) => lesson.sub_lessons
          );
          setSubLessonData(subLessons);
          setSubLessonsLength(subLessons.length);
          const assignments = subLessons.flatMap(
            (sublesson) => sublesson.assignments
          );
          setAssignmentData(assignments);
        } else {
          router.push("/courses");
        }
      } catch (error) {
        return {
          message: "Server could not read courses due to database connection",
        };
      }
    }

    if (courseId) {
      getUserCourseInfo();
    }
  }, [courseId, router]);

  useEffect(() => {
    if (subLessonId && subLessonData.length > 0) {
      const subLessonIndex = subLessonData.findIndex(
        (subLesson) => subLesson.sub_lesson_id == subLessonId
      );
      const lessonIndex = lessonData.findIndex((lesson) =>
        lesson.sub_lessons.some(
          (subLesson) => subLesson.sub_lesson_id == subLessonId
        )
      );

      if (subLessonIndex !== -1 && lessonIndex !== -1) {
        setCurrentLessonIndex(lessonIndex);
        setCurrentSubLessonIndex(subLessonIndex);
        setCurrentSubLessonId(subLessonId);
      }
    }
  }, [subLessonId, subLessonData, lessonData]);

  return (
    <CoursesDataContext.Provider value={valueInContext}>
      <div className="w-full h-max">
        <Navbar />
        {courseData.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-[700px]">
            <h1 className="text-2xl font-medium">Loading</h1>
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : (
          <>
            <div className="w-full h-full flex flex-col sm:flex-row sm:justify-center max-[640px]:items-center">
              <CoursesProgress titleRef={titleRef} />
              <CoursesContent titleRef={titleRef} subLessonId={subLessonId} />
            </div>
            <ActionBar titleRef={titleRef} />
          </>
        )}
        <CommonFooter />
      </div>
    </CoursesDataContext.Provider>
  );
}

export default CourseLearning;
