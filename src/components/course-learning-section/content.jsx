import { CoursesDataContext } from "@/pages/courses/[courseId]/learning";
import axios from "axios";
import { useContext, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import AssignmentCard from "./assignment-card";

const updateVideoStatus = async (
  subLessonId,
  status,
  courseId,
  setCourseData,
  setLessonData,
  setSubLessonData,
  setSubLessonsLength,
  setAssignmentData,
  router
) => {
  const hasToken = localStorage.getItem("token");
  if (!hasToken) {
    router.push("/login");
    return;
  }

  try {
    const response = await axios.post(
      `/api/courses_learning/update-video-status`,
      {
        subLessonId,
        status,
      }
    );

    if (response.status === 200) {
      const getUserCourseInfo = async () => {
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
      };

      await getUserCourseInfo();

      return {
        message: "Video status updated successfully",
        videoStatus: response.data[0].sub_lesson_status_id,
      };
    } else {
      return {
        message: "Failed to update video status",
      };
    }
  } catch (error) {
    return {
      message:
        "Server could not update video status due to database connection",
    };
  }
};

function CoursesContent({ titleRef, subLessonId }) {
  const {
    courseData,
    lessonData,
    subLessonData,
    setCourseData,
    setLessonData,
    setSubLessonData,
    setSubLessonsLength,
    setAssignmentData,
    setCurrentLessonIndex,
    currentSubLessonIndex,
    currentSubLessonId,
    setCurrentSubLessonId,
    setSubLessonPlayStatus,
    subLessonStatus,
    assignmentData,
    setCurrentSubLessonIndex,
  } = useContext(CoursesDataContext);

  const router = useRouter();
  const videoRef = useRef(null);
  const videoStatusRef = useRef({});
  const { courseId } = router.query;

  const handlePlay = useCallback(async () => {
    const currentSubLesson = subLessonData[currentSubLessonIndex];
    const currentStatus = subLessonStatus[currentSubLesson.sub_lesson_id] || {};

    if (
      !currentStatus.isEnded &&
      videoStatusRef.current[currentSubLesson.sub_lesson_id] !== 1 &&
      currentSubLesson.user_lessons[0].sub_lesson_status_id !== 1
    ) {
      setSubLessonPlayStatus(currentSubLesson.sub_lesson_id, true, false);
      const response = await updateVideoStatus(
        currentSubLesson.sub_lesson_id,
        2,
        courseId,
        setCourseData,
        setLessonData,
        setSubLessonData,
        setSubLessonsLength,
        setAssignmentData,
        router
      );
      videoStatusRef.current[currentSubLesson.sub_lesson_id] =
        response.videoStatus;
    }
  }, [
    currentSubLessonIndex,
    subLessonData,
    subLessonStatus,
    setSubLessonPlayStatus,
    courseId,
    setCourseData,
    setLessonData,
    setSubLessonData,
    setSubLessonsLength,
    setAssignmentData,
    router,
  ]);

  const handleEnded = useCallback(async () => {
    const currentSubLesson = subLessonData[currentSubLessonIndex];

    if (
      videoStatusRef.current[currentSubLesson.sub_lesson_id] !== 1 &&
      currentSubLesson.user_lessons[0].sub_lesson_status_id !== 1
    ) {
      setSubLessonPlayStatus(currentSubLesson.sub_lesson_id, true, true);
      const response = await updateVideoStatus(
        currentSubLesson.sub_lesson_id,
        1,
        courseId,
        setCourseData,
        setLessonData,
        setSubLessonData,
        setSubLessonsLength,
        setAssignmentData,
        router
      );
      videoStatusRef.current[currentSubLesson.sub_lesson_id] =
        response.videoStatus;
    }
  }, [
    currentSubLessonIndex,
    subLessonData,
    setSubLessonPlayStatus,
    courseId,
    setCourseData,
    setLessonData,
    setSubLessonData,
    setSubLessonsLength,
    setAssignmentData,
    router,
  ]);

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
  }, [courseId, router, currentSubLessonIndex]);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("play", handlePlay);
      videoElement.addEventListener("ended", handleEnded);

      return () => {
        videoElement.removeEventListener("play", handlePlay);
        videoElement.removeEventListener("ended", handleEnded);
      };
    }
  }, [handlePlay, handleEnded, currentSubLessonIndex]);

  useEffect(() => {
    if (subLessonData.length > 0) {
      const currentSubLesson = subLessonData[currentSubLessonIndex];
      setCurrentSubLessonId(currentSubLesson.sub_lesson_id);
      setCurrentSubLessonIndex(currentSubLessonIndex);
    }
  }, [
    currentSubLessonIndex,
    subLessonData,
    setCurrentSubLessonId,
    setCurrentSubLessonIndex,
    assignmentData,
  ]);

  useEffect(() => {
    console.log({ assignmentData });
  }, [assignmentData]);

  useEffect(() => {
    console.log({ assignmentData });
  }, [assignmentData]);

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

  if (!courseData || courseData.length === 0) {
    return <div></div>;
  }
  const currentSubLesson = subLessonData[currentSubLessonIndex];

  return (
    <main className="w-full max-w-3xl h-full px-4 py-4 mt-[4%] flex flex-col gap-8">
      <h3 ref={titleRef} className="Course_Title text-2xl font-medium">
        {currentSubLesson.sub_lesson_title}
      </h3>
      <div className="video_trailer w-full">
        <video
          ref={videoRef}
          src={currentSubLesson.sub_lesson_video}
          controls
          className="object-center rounded-lg sm:w-[739px] sm:h-[460px] max-[375px]:w-[343px] max-[375px]:h-[214px] bg-black"
        />
      </div>
      {(videoStatusRef.current[currentSubLesson.sub_lesson_id] === 1 ||
        currentSubLesson.user_lessons[0].sub_lesson_status_id === 1) &&
        assignmentData.map((item, index) => {
          if (Number(currentSubLessonId) === item.sub_lesson_id) {
            return (
              <AssignmentCard
                id={item.assignment_id}
                question={item.assignment_title}
                status={item.user_assignments[0].assignment_status.status}
                answer={item.user_assignments[0].answer}
                key={index}
              />
            );
          }
        })}
    </main>
  );
}
export default CoursesContent;
