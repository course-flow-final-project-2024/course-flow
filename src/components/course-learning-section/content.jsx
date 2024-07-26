import Image from "next/image";
import { CoursesDataContext } from "@/pages/courses/[courseId]/learning";
import { useContext } from "react";

function CoursesContent() {
  const {
    courseData,
    subLessonData,
    currentSubLessonIndex,
    setCurrentSubLessonId,
  } = useContext(CoursesDataContext);

  if (!courseData || courseData.length === 0) {
    return <div></div>;
  }
  const currentSubLesson = subLessonData[currentSubLessonIndex];
  setCurrentSubLessonId(currentSubLesson.sub_lesson_id);
  return (
    <main className="w-full max-w-3xl h-full px-4 py-4 mt-[4%] flex flex-col gap-8">
      <h3 className="Course_Title text-2xl font-medium">
        {currentSubLesson.sub_lesson_title}
      </h3>
      <div className="video_trailer w-full">
        <Image
          src="/course-detail/mock-video.svg"
          // src={currentSubLesson.sub_lesson_video}
          width={343}
          height={214}
          alt={currentSubLesson.sub_lesson_title}
          className="object-cover w-full"
        />
      </div>
      <div className="Assgiment_past h-[260px] border-[1px] border-black"></div>
    </main>
  );
}
export default CoursesContent;
