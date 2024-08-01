import { CoursesDataContext } from "@/pages/courses/[courseId]/learning";
import axios from "axios";
import { useContext, useEffect, useRef, useCallback } from "react";
import AssignmentCard from "./assignment-card";
import { calculateProgress } from "./calculate-progress";

const updateVideoStatus = async (userId, lessonId, subLessonId, status) => {
  try {
    const response = await axios.post(
      `/api/courses_learning/update-video-status`,
      {
        userId,
        lessonId,
        subLessonId,
        status,
      }
    );
    if (response.status === 200) {
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

function CoursesContent() {
  const {
    courseData,
    subLessonData,
    currentSubLessonIndex,
    setCurrentSubLessonId,
    setSubLessonPlayStatus,
    subLessonStatus,
    progress,
    setProgress,
    isVideoEnded,
    setisVideoEnded,
  } = useContext(CoursesDataContext);

  const videoRef = useRef(null);
  const videoStatusRef = useRef({});

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
        17,
        15,
        currentSubLesson.sub_lesson_id,
        2
      );
      videoStatusRef.current[currentSubLesson.sub_lesson_id] =
        response.videoStatus;
    }
  }, [
    currentSubLessonIndex,
    subLessonData,
    subLessonStatus,
    setSubLessonPlayStatus,
  ]);

  const handleEnded = useCallback(async () => {
    const currentSubLesson = subLessonData[currentSubLessonIndex];

    if (
      videoStatusRef.current[currentSubLesson.sub_lesson_id] !== 1 &&
      currentSubLesson.user_lessons[0].sub_lesson_status_id !== 1
    ) {
      setSubLessonPlayStatus(currentSubLesson.sub_lesson_id, true, true);
      const response = await updateVideoStatus(
        17,
        15,
        currentSubLesson.sub_lesson_id,
        1
      );
      videoStatusRef.current[currentSubLesson.sub_lesson_id] =
        response.videoStatus;

      if (courseData.length > 0) {
        const course = courseData[0].courses;
        const progressValue = calculateProgress(
          course.lessons,
          progress,
          isVideoEnded,
          setisVideoEnded
        );
        setProgress(progressValue);
      }
    }
  }, [
    currentSubLessonIndex,
    subLessonData,
    setSubLessonPlayStatus,
    courseData,
    progress,
    isVideoEnded,
    setisVideoEnded,
    setProgress,
  ]);

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
    }
  }, [currentSubLessonIndex, subLessonData, setCurrentSubLessonId]);

  if (!courseData || courseData.length === 0) {
    return <div></div>;
  }
  const currentSubLesson = subLessonData[currentSubLessonIndex];

  return (
    <main className="w-full max-w-3xl h-full px-4 py-4 mt-[4%] flex flex-col gap-8">
      <h3 className="Course_Title text-2xl font-medium">
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
      <AssignmentCard />
    </main>
  );
}
export default CoursesContent;
