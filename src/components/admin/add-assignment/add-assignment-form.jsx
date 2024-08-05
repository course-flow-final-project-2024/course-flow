import axios from "axios";
import { useState, useEffect } from "react";
import AddAssignmentDetail from "./assignment-detail";
import { Select } from "@chakra-ui/react";

const AdminAddAssignmentForm = () => {
  const [courses, setCourses] = useState([]);

  const dropDownStyle =
    "border border-[#D6D9E4] rounded-[8px] h-12 py-3 pl-3 pr-4 outline-none";

  const getCourseName = async () => {
    try {
      const result = await axios.get(`/api/courses_detail/get`);
      setCourses(result.data.courses);
    } catch (error) {
      console.log("errorrrrr");
    }
  };

  useEffect(() => {
    getCourseName();
  }, []);

  const handleCourseChange = (e) => {
    e.preventDefault;
    const selectedCourse = e.target.value;
    console.log(selectedCourse);
  };

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
              onChange={(e) => {
                handleCourseChange(e);
              }}
            >
              <option value="" disabled selected hidden>
                Select course
              </option>
              {courses.map((course) => {
                return (
                  <option value={course.course_name}>
                    {course.course_name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-1  w-full">
              <label>Lesson</label>
              <select id="lessons" name="lessons" className={dropDownStyle}>
                <option value="" disabled selected>
                  Select lesson
                </option>
              </select>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label>Sub-lesson</label>
              <select
                id="sub_lessons"
                name="sub_lessons"
                className={dropDownStyle}
              >
                <option value="" disabled selected>
                  Select sub-lesson
                </option>
              </select>
            </div>
          </div>
          <div className="border border-b-[#D6D9E4] w-full"></div>
        </div>
        <AddAssignmentDetail />
      </form>
    </div>
  );
};
export default AdminAddAssignmentForm;
