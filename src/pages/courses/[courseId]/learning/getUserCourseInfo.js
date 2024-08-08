import axios from "axios";
const getUserCourseInfo = async (
  setCourseData,
  setLessonData,
  setSubLessonData,
  setSubLessonsLength,
  setAssignmentData,
  router,
  courseId
) => {
  try {
    const result = await axios.get(
      `/api/courses_learning/get-user-learning-course`,
      {
        params: {
          courseId,
        },
      }
    );
    if (result.data.courses.length !== 0) {
      setCourseData(result.data.courses);
      setLessonData(result.data.courses[0].courses.lessons);
      const subLessons = result.data.courses[0].courses.lessons.flatMap(
        (lesson) => lesson.sub_lessons
      );
      setSubLessonData(subLessons);
      setSubLessonsLength(subLessons.length);
      const assignments = subLessons.flatMap(
        (sublesson) => sublesson.assignments
      );
      setAssignmentData(assignments);
    } else {
      router.push("/courses");
    }
  } catch (error) {
    return {
      message: "Server could not read courses due to database connection",
    };
  }
};
export default getUserCourseInfo;
