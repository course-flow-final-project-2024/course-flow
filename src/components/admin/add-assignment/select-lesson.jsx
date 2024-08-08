import React, { useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const LessonSelect = ({
  selectedCourseId,
  setSelectedLessonId,
  selectedLessonId,
  lessons,
  setLessons,
  isLessonLoading,
  setLessonIsLoading,
}) => {
  const dropDownStyle =
    "border border-[#D6D9E4] rounded-[8px] h-12 py-3 pl-3 pr-4 outline-none text-[#9AA1B9]";
  const loadingDotStyle = "loading loading-dots loading-sm text-[#8DADE0]";
  const toast = useToast();

  const getLessonData = async () => {
    if (!selectedCourseId) {
      return;
    }
    try {
      setLessonIsLoading(true);
      const result = await axios.get(
        `/api/lessons/get_by_course_id?courseId=${selectedCourseId}`
      );
      setLessons(result.data.lessons);
      setLessonIsLoading(false);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      setLessonIsLoading(false);
    }
  };

  useEffect(() => {
    getLessonData();
  }, [selectedCourseId]);

  const handleLessonChange = (e) => {
    setSelectedLessonId(e.target.value);
    if (selectedLessonId !== e.target.value) {
      toast({
        title: "Be careful",
        description:
          "Course data has changed. Don't forget to recheck your input before submitting.",
        status: "warning",
        isClosable: true,
        duration: "4000",
      });
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {isLessonLoading ? (
        <div className="flex gap-3">
          <label>Lesson</label>
          <span className={loadingDotStyle}></span>
        </div>
      ) : (
        <label>Lesson</label>
      )}
      <select
        id="lessons"
        name="lessons"
        className={dropDownStyle}
        onChange={handleLessonChange}
        defaultValue=""
      >
        <option value="" disabled hidden>
          Select lesson
        </option>
        {lessons.map((lesson) => (
          <option key={lesson.lesson_id} value={lesson.lesson_id}>
            {lesson.lesson_title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LessonSelect;
