import axios from "axios";

async function updateAssignment(
  assignmentId,
  status,
  assignmentAnswer,
  toast,
  toastId
) {
  const postAssignment = axios.post(`/api/assignment/update-assignment`, {
    assignmentId,
    status,
    assignmentAnswer,
  });
  if (!toast.isActive(toastId)) {
    toast.promise(postAssignment, {
      success: {
        title: "Hurray! :)",
        description: "Assignment submitted successfully",
      },
      error: {
        title: "Oops.. :(",
        description: "Failed to submit assignment.",
      },
      loading: {
        title: "Uploading assignment",
        description: "Please wait.",
      },
    });
  }
  try {
    const response = await postAssignment;

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
