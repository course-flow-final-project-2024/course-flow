import axios from "axios";
import { useState, useEffect } from "react";
import AdminAddAssignmentDetail from "./assignment-detail";

const AdminAddAssignmentForm = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [lessons, setLessons] = useState([]);
  const [selectedLessonId, setSelectedLessonId] = useState("");
  const [subLessons, setSubLessons] = useState([]);

  const dropDownStyle =
    "border border-[#D6D9E4] rounded-[8px] h-12 py-3 pl-3 pr-4 outline-none";

  const getCourseName = async () => {
    try {
      const result = await axios.get(`/api/courses_detail/get`);
      setCourses(result.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    getCourseName();
  }, []);

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    setSelectedCourseId(selectedCourse);
  };

  const getLessonData = async () => {
    if (!selectedCourseId) {
      return;
    }
    try {
      const result = await axios.get(
        `/api/lessons/get_by_course_id?courseId=${selectedCourseId}`
      );

      setLessons(result.data.lessons);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  useEffect(() => {
    getLessonData();
  }, [selectedCourseId]);

  const handleLessonChange = (e) => {
    const selectedLesson = e.target.value;
    setSelectedLessonId(selectedLesson);
  };

  const getSubLessonData = async () => {
    console.log(selectedLessonId);
    if (!selectedLessonId) {
      return;
    }
    try {
      const result = await axios.get(
        `/api/sub-lesson/get_by_lesson_id?lessonId=${selectedLessonId}`
      );

      setSubLessons(result.data.subLessons);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    }
  };

  useEffect(() => {
    getSubLessonData();
  }, [selectedLessonId]);

  console.log(subLessons);

  return (
    <div className="bg-white border border-[#E6E7EB] rounded-[16px] w-full h-full px-[100px] pt-10 pb-[60px] flex flex-col gap-[10px]">
      <form id="add-assignment">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-1 min-w-[440px]">
            <label>Course</label>
            <select
              id="courses"
              name="courses"
              className={dropDownStyle}
              onChange={handleCourseChange}
            >
              <option value="" disabled selected hidden>
                Select course
              </option>
              {courses.map((course) => {
                return (
                  <option key={course.course_id} value={course.course_id}>
                    {course.course_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-1  w-full">
              <label>Lesson</label>
              <select
                id="lessons"
                name="lessons"
                className={dropDownStyle}
                onChange={handleLessonChange}
              >
                <option value="" disabled selected>
                  Select lesson
                </option>
                {lessons.map((lesson) => {
                  return (
                    <option key={lesson.lesson_id} value={lesson.lesson_id}>
                      {lesson.lesson_title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label>Sub-lesson</label>
              <select
                id="sub_lessons"
                name="sub_lessons"
                className={dropDownStyle}
              >
                <option value="" disabled selected hidden>
                  Select sub-lesson
                </option>
                {subLessons.map((subLesson) => {
                  return (
                    <option
                      key={subLesson.lesson_id}
                      value={subLesson.sub_lesson_id}
                    >
                      {subLesson.sub_lesson_title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="border border-b-[#D6D9E4] w-full"></div>
        </div>
        <AdminAddAssignmentDetail />
      </form>
    </div>
  );
};
export default AdminAddAssignmentForm;
