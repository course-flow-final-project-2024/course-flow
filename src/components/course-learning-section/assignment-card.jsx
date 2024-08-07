import Button from "@/utils/button";
import { useRouter } from "next/router";
import axios from "axios";
import { useContext, useState } from "react";
import { CoursesDataContext } from "@/pages/courses/[courseId]/learning";
import getUserCourseInfo from "@/pages/courses/[courseId]/learning/getUserCourseInfo";
import CommonModalBox from "@/utils/common-modal";

export default function AssignmentCard({ id, question, status, answer }) {
  const {
    setCourseData,
    setLessonData,
    setSubLessonData,
    setSubLessonsLenght,
    setAssignmentData,
  } = useContext(CoursesDataContext);
  const [assignmentAnswer, setAssignmentAnswer] = useState("");
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const router = useRouter();
  const { courseId } = router.query;

  const updateAssignmentStatus = async (
    assignmentId,
    status,
    assignmentAnswer
  ) => {
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
          await getUserCourseInfo(
            setCourseData,
            setLessonData,
            setSubLessonData,
            setSubLessonsLenght,
            setAssignmentData,
            router,
            courseId
          );
        } catch (error) {
          console.log({ error });
          return {
            message: "Server could not read courses due to database connection",
          };
        }
        return {
          message: "Assignment status updated successfully",
          responseStatus:
            response.data.updatedAssignment[0].assignment_status_id,
          responseAnswer: response.data.updatedAssignment[0].answer,
        };
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

  const handleOnSubmit = async (id) => {
    if (assignmentAnswer.trim() === "") {
      alert("Please provide an answer before submitting.");
      return;
    }
    await updateAssignmentStatus(id, 1, assignmentAnswer);
    handleClose();
  };

  return (
    <div>
      {status === "Submitted" ? (
        <div className=" flex flex-col gap-[25px] p-6 rounded-lg bg-[#E5ECF8]">
          <div className=" flex justify-between">
            <h1 className="text-xl">Assignment</h1>
            <p className="rounded p-[4px_8px_4px_8px] bg-[#DDF9EF] text-[#0A7B60] font-medium">
              {status}
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p>{question}</p>
            <div className="w-full text-[#646D89] border border-[#D6D9E4] bg-slate-100 rounded-lg p-[12px_16px_12px_12px] gap-2">
              {answer}
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
                rightOnClick={() => handleOnSubmit(id)}
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
