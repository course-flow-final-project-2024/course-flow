import axios from "axios";
const getUserCourseInfo = async (
  setCourseData,
  setLessonData,
  setSubLessonData,
  setSubLessonsLenght,
  router
) => {
  try {
    const result = await axios.get(
      `/api/courses_learning/get-user-learning-course`,
      {
        params: {
          userId: 17,
          courseId: 5,
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
      setSubLessonsLenght(subLessons.length);
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
