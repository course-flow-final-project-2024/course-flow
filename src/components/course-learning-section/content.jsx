import { CoursesDataContext } from "@/pages/courses/[courseId]/learning";
import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import AssignmentCard from "./assignment-card";

const updateVideoStatus = async (
  userId,
  lessonId,
  subLessonId,
  status,
  updateSubLessonStatus
) => {
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
      updateSubLessonStatus(subLessonId, status);
      return {
        message: "Video status updated successfully",
      };
    } else {
      return {
        message: "Failed to update video status",
      };
    }
  } catch (error) {
    return {
      message:
        "Server could not updating video status due to database connection",
    };
  }
};

function CoursesContent() {
  const {
    courseData,
    subLessonData,
    currentSubLessonIndex,
    setCurrentSubLessonId,
    updateSubLessonStatus,
    setSubLessonPlayStatus,
  } = useContext(CoursesDataContext);

  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const videoElement = videoRef.current;
      videoElement.addEventListener("play", handlePlay);
      videoElement.addEventListener("ended", handleEnded);

      return () => {
        videoElement.removeEventListener("play", handlePlay);
        videoElement.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentSubLessonIndex]);

  useEffect(() => {
    if (subLessonData.length > 0) {
      const currentSubLesson = subLessonData[currentSubLessonIndex];
      setCurrentSubLessonId(currentSubLesson.sub_lesson_id);
    }
  }, [currentSubLessonIndex, subLessonData, setCurrentSubLessonId]);

  const handlePlay = async () => {
    setSubLessonPlayStatus(currentSubLesson.sub_lesson_id, true, false);
    await updateVideoStatus(17, 15, currentSubLesson.sub_lesson_id, 2);
  };

  const handleEnded = async () => {
    setSubLessonPlayStatus(currentSubLesson.sub_lesson_id, true, true);
    await updateVideoStatus(17, 15, currentSubLesson.sub_lesson_id, 1);
  };

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
          className="object-center rounded-lg w-[739px] h-[460px] bg-black"
        />
      </div>
      <AssignmentCard />
    </main>
  );
}
export default CoursesContent;
