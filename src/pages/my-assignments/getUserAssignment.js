import axios from "axios";
async function getUserAssignment(
  setAssingmentData,
  setOriginalData,
  setIsLoading,
  setIsError
) {
  try {
    setIsLoading(true);
    const { data } = await axios.get("/api/assignment/get_user_assignments");
    const completedSubLessonId = data.user_lessons
      .filter((isComplete) => isComplete.sub_lesson_status_id === 1)
      .map((sub_lesson) => sub_lesson.sub_lesson_id);

    const filteredAssignments = data.user_assignments.filter((assignment) =>
      completedSubLessonId.includes(
        assignment.assignments.sub_lessons.sub_lesson_id
      )
    );
    setAssingmentData(filteredAssignments);
    setOriginalData(filteredAssignments);
    setIsLoading(false);
    return;
  } catch (err) {
    setIsLoading(false);
    setIsError(true);
    return;
  }
}
export default getUserAssignment;
