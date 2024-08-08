import React, { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const EditCourseSelect = ({
  selectedCourseId,
  setSelectedCourseId,
  courses,
  setCourses,
  isCourseLoading,
  setCourseIsLoading,
  assignmentFromDb,
}) => {
  const [courseName, setCourseName] = useState("");
  const dropDownStyle =
    "border border-[#D6D9E4] rounded-[8px] h-12 py-3 pl-3 pr-4 outline-none";
  const loadingDotStyle = "loading loading-dots loading-sm text-[#8DADE0]";
  const toast = useToast();

  const getCourseData = async () => {
    try {
      setCourseIsLoading(true);
      const result = await axios.get(`/api/courses_detail/get_all`);
      setCourses(result.data.coursesDetail);
      setCourseIsLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourseIsLoading(false);
    }
  };

  useEffect(() => {
    getCourseData();
    if (assignmentFromDb.sub_lessons) {
      setSelectedCourseId(
        assignmentFromDb.sub_lessons.lessons.courses.course_id
      );
      setCourseName(assignmentFromDb.sub_lessons.lessons.courses.course_name);
    }
  }, [assignmentFromDb]);

  const handleCourseChange = (e) => {
    setSelectedCourseId(e.target.value);
    if (selectedCourseId !== e.target.value) {
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
    <div className="flex flex-col gap-1 min-w-[440px]">
      {isCourseLoading ? (
        <div className="flex gap-3">
          <label>Course</label>
          <span className={loadingDotStyle}></span>
        </div>
      ) : (
        <label>Course</label>
      )}
      <select
        id="courses"
        name="courses"
        className={dropDownStyle}
        onChange={handleCourseChange}
        defaultValue=""
      >
        <option value="" disabled hidden>
          {courseName}
        </option>
        {courses.map((course) => (
          <option key={course.course_id} value={course.course_id}>
            {course.course_name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EditCourseSelect;
