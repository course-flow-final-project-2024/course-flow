import React, { useEffect, useState } from "react";
import axios from "axios";

const EditSubLessonSelect = ({
  selectedLessonId,
  selectedSubLessonId,
  setSelectedSubLessonId,
  subLessons,
  setSubLessons,
  isSubLessonLoading,
  setSubLessonIsLoading,
  assignmentFromDb,
  selectedCourseId,
}) => {
  const [subLessonName, setSubLessonName] = useState("");
  const dropDownStyle =
    "border border-[#D6D9E4] rounded-[8px] h-12 py-3 pl-3 pr-4 outline-none";
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
    if (assignmentFromDb.sub_lessons) {
      setSelectedSubLessonId(assignmentFromDb.sub_lessons.sub_lesson_id);
      setSubLessonName(assignmentFromDb.sub_lessons.sub_lesson_title);
      if (selectedCourseId) {
        if (
          selectedCourseId !==
          assignmentFromDb.sub_lessons.lessons.courses.course_id
        ) {
          setSelectedSubLessonId("");
          setSubLessonName("Select sub-lesson");
        }
      }
      if (selectedLessonId) {
        if (
          selectedLessonId !== assignmentFromDb.sub_lessons.lessons.lesson_id
        ) {
          setSelectedSubLessonId("");
          setSubLessonName("Select sub-lesson");
        }
      }
    }
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
          {subLessonName}
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

export default EditSubLessonSelect;
