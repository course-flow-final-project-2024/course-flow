import axios from "axios";
async function updateAssignment(assignmentId, status, assignmentAnswer) {
  try {
    const response = await axios.post(`/api/assignment/update-assignment`, {
      assignmentId,
      status,
      assignmentAnswer,
    });

    if (response.status === 200) {
      return {
        message: "Assignment status updated successfully",
      };
    } else {
      return {
        message: "Failed to update assignment status",
      };
    }
  } catch (error) {
    console.log(error);

    return {
      message:
        "Server could not update assignment status due to database connection",
    };
  }
}
export default updateAssignment;
