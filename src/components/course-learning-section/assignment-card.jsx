import Button from "@/utils/button";
import { useRouter } from "next/router";
import axios from "axios";
import { useContext, useState } from "react";
import { CoursesDataContext } from "@/pages/courses/[courseId]/learning";
import CommonModalBox from "@/utils/common-modal";
import { useToast } from "@chakra-ui/react";

export default function AssignmentCard({ id, question, status, answer }) {
  const { progress } = useContext(CoursesDataContext);
  const [assignmentAnswer, setAssignmentAnswer] = useState("");
  const [open, setOpen] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const { courseId } = router.query;
  const toast = useToast();

  const updateAssignmentStatus = async (
    assignmentId,
    status,
    assignmentAnswer
  ) => {
    const hasToken = localStorage.getItem("token");
    if (!hasToken) {
      router.push("/login");
      return;
    }

    try {
      const response = await axios.post(
        `/api/courses_learning/update-assignment-status`,
        {
          assignmentId,
          status,
          assignmentAnswer,
        }
      );

      if (response.status === 200) {
        try {
          const getAllAssignmentStatus = async () => {
            try {
              const data = await axios.get(
                `/api/courses_learning/get-all-assignment-status`
              );

              return data;
            } catch (error) {
              return {
                message:
                  "Server could not read assignments due to database connection",
              };
            }
          };

          const result = await getAllAssignmentStatus();
          const resultAllAssignments = result.data.assignments;
          const updatedAssignment = resultAllAssignments.find(
            (assignment) => assignment.assignment_id === assignmentId
          );

          toast({
            title: "Completed!!!",
            description: "Assignment has been sent successfully.",
            status: "success",
            duration: 6000,
            isClosable: true,
          });

          return {
            message: "Assignment status updated successfully",
            resultAllAssignments,
            updatedAssignment,
          };
        } catch (error) {
          return {
            message: "Server could not read courses due to database connection",
          };
        }
      } else {
        return {
          message: "Failed to update assignment status",
        };
      }
    } catch (error) {
      return {
        message:
          "Server could not update assignment status due to database connection",
      };
    }
  };

  const updateCourseStatus = async (courseId, courseStatus) => {
    const hasToken = localStorage.getItem("token");
    if (!hasToken) {
      router.push("/login");
      return;
    }

    try {
      const response = await axios.post(
        `/api/courses_learning/update-course-status`,
        {
          courseId,
          courseStatus,
        }
      );
      if (response.status === 200) {
        return {
          message: "Course status updated successfully",
        };
      } else {
        return {
          message: "Failed to update course status",
        };
      }
    } catch (error) {
      return {
        message:
          "Server could not update course status due to database connection",
      };
    }
  };

  const handleOnSubmit = async (id, progress) => {
    if (assignmentAnswer.trim() === "") {
      toast({
        title: "Oops...",
        description:
          "Please complete answer field before sending assignment answer.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
      return;
    }
    const { message, resultAllAssignments, updatedAssignment } =
      await updateAssignmentStatus(id, 1, assignmentAnswer);
    setResponseStatus(updatedAssignment);

    if (Math.round(progress) === 100) {
      const allAssignmentsSubmitted = resultAllAssignments.every(
        (assignment) => assignment.assignment_status_id === 1
      );
      if (allAssignmentsSubmitted) {
        await updateCourseStatus(courseId, 1);
      }
    }

    handleClose();
  };

  return (
    <div>
      {status === "Submitted" || responseStatus?.assignment_status_id === 1 ? (
        <div className=" flex flex-col gap-[25px] p-6 rounded-lg bg-[#E5ECF8]">
          <div className=" flex justify-between">
            <h1 className="text-xl">Assignment</h1>
            {responseStatus?.assignment_status_id === 1 ? (
              <p className="rounded p-[4px_8px_4px_8px] bg-[#DDF9EF] text-[#0A7B60] font-medium">
                {responseStatus.assignment_status.status}
              </p>
            ) : (
              <p className="rounded p-[4px_8px_4px_8px] bg-[#DDF9EF] text-[#0A7B60] font-medium">
                {status}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <p>{question}</p>
            <div className="w-full text-[#646D89] border border-[#D6D9E4] bg-slate-100 rounded-lg p-[12px_16px_12px_12px] gap-2">
              {answer || responseStatus.answer}
            </div>
          </div>
        </div>
      ) : (
        <div className=" flex flex-col gap-[25px] p-6 rounded-lg bg-[#E5ECF8]">
          <div className=" flex justify-between">
            <h1 className="text-xl">Assignment</h1>
            <p className="rounded p-[4px_8px_4px_8px] bg-[#FFFBDB] text-[#996500] font-medium">
              {status}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p>{question}</p>
            <textarea
              type="text"
              className="flex w-full max-h-24 min-h-24 border border-[#D6D9E4] bg-white rounded-lg p-[12px_16px_12px_12px] gap-2 items-start outline-none"
              placeholder="Answer..."
              value={assignmentAnswer}
              onChange={(e) => setAssignmentAnswer(e.target.value)}
            />
          </div>
          <div className="flex min-[800px]:flex-row flex-col min-[800px]:justify-between min-[800px]:items-center gap-2">
            <div className="flex min-[800px]:w-[203px]">
              <Button
                style="primary"
                text="Send Assigment"
                onClick={() => setOpen(true)}
              />
              <CommonModalBox
                setOpen={setOpen}
                open={open}
                text="Send Assigment"
                AlertMessage="Do you want to send assignment answer? Please ensure that once sent, it cannot be edited."
                leftOnClick={handleClose}
                leftText="Cancel"
                rightOnClick={() => handleOnSubmit(id, progress)}
                rightText="Yes, send now"
              />
            </div>
            {/* <p className="text-[#646D89]">Assign within 2 days</p> */}
          </div>
        </div>
      )}
    </div>
  );
}
