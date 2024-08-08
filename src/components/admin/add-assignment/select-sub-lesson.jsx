import React, { useEffect, useState } from "react";
import axios from "axios";

const SubLessonSelect = ({
  selectedLessonId,
  selectedSubLessonId,
  setSelectedSubLessonId,
  subLessons,
  setSubLessons,
  isSubLessonLoading,
  setSubLessonIsLoading,
}) => {
  const dropDownStyle =
    "border border-[#D6D9E4] rounded-[8px] h-12 py-3 pl-3 pr-4 outline-none text-[#9AA1B9]";
  const loadingDotStyle = "loading loading-dots loading-sm text-[#8DADE0]";

  const getSubLessonData = async () => {
    if (!selectedLessonId) {
      return;
    }
    try {
      setSubLessonIsLoading(true);
      const result = await axios.get(
        `/api/sub-lesson/get_by_lesson_id?lessonId=${selectedLessonId}`
      );
      setSubLessons(result.data.subLessons);
      setSubLessonIsLoading(false);
    } catch (error) {
      console.error("Error fetching sub-lessons:", error);
      setSubLessonIsLoading(false);
    }
  };

  useEffect(() => {
    getSubLessonData();
  }, [selectedLessonId]);

  const handleSubLessonChange = (e) => {
    setSelectedSubLessonId(e.target.value);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      {isSubLessonLoading ? (
        <div className="flex gap-3">
          <label>Sub-lesson</label>
          <span className={loadingDotStyle}></span>
        </div>
      ) : (
        <label>Sub-lesson</label>
      )}
      <select
        id="sub_lessons"
        name="sub_lessons"
        className={dropDownStyle}
        onChange={handleSubLessonChange}
        defaultValue=""
      >
        <option value="" disabled hidden>
          Select sub-lesson
        </option>
        {subLessons.map((subLesson) => (
          <option key={subLesson.sub_lesson_id} value={subLesson.sub_lesson_id}>
            {subLesson.sub_lesson_title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubLessonSelect;
