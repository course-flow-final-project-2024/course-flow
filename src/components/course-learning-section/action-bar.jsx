import Button from "@/utils/button";
import { CoursesDataContext } from "@/pages/courses/[courseId]/learning";
import { useContext } from "react";

function ActionBar({ titleRef }) {
  const {
    subLessonsLenght,
    lessonData,
    subLessonData,
    setCurrentLessonIndex,
    currentSubLessonIndex,
    setCurrentSubLessonIndex,
  } = useContext(CoursesDataContext);

  const handleNextLesson = () => {
    if (currentSubLessonIndex < subLessonsLenght - 1) {
      setCurrentSubLessonIndex(currentSubLessonIndex + 1);
    } else {
      setCurrentSubLessonIndex(subLessonsLenght - 1);
    }
    const newIndex = lessonData.findIndex((lesson) =>
      lesson.sub_lessons.includes(subLessonData[currentSubLessonIndex + 1])
    );
    setCurrentLessonIndex(newIndex !== -1 ? newIndex : 0);

    if (titleRef.current) {
      titleRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handlePreviousLesson = () => {
    if (currentSubLessonIndex > 0) {
      setCurrentSubLessonIndex(currentSubLessonIndex - 1);
    } else {
      setCurrentSubLessonIndex(0);
    }
    const newIndex = lessonData.findIndex((lesson) =>
      lesson.sub_lessons.includes(subLessonData[currentSubLessonIndex - 1])
    );
    setCurrentLessonIndex(newIndex !== -1 ? newIndex : lessonData.length - 1);

    if (titleRef.current) {
      titleRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full h-[100px] flex flex-row justify-between items-center p-4 min-[1800px]:px-80 shadow-sm">
      <div className="px-1 cursor-pointer">
        {currentSubLessonIndex === 0 ? (
          <a className="text-xl font-bold text-[#C8CCDB]">Previous Lesson</a>
        ) : (
          <a
            className="text-xl font-bold text-[#2F5FAC]"
            onClick={handlePreviousLesson}
          >
            Previous Lesson
          </a>
        )}
      </div>
      <div className="w-[160px] flex">
        {currentSubLessonIndex === subLessonsLenght - 1 ? (
          <button className="grow h-[60px] p-2 rounded-xl bg-[#D6D9E4] text-[#9AA1B9] outline-none text-base font-bold">
            Next Lesson
          </button>
        ) : (
          <Button
            text="Next Lesson"
            style="primary"
            onClick={handleNextLesson}
          />
        )}
      </div>
    </div>
  );
}
export default ActionBar;
