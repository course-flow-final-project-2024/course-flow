import Button from "@/utils/button";
import { useRouter } from "next/router";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CoursesDataContext } from "@/pages/courses/[courseId]/learning";
import getUserCourseInfo from "@/pages/courses/[courseId]/learning/getUserCourseInfo";

export default function AssignmentCard({ id, question, status, answer }) {
  const {
    setCourseData,
    setLessonData,
    setSubLessonData,
    setSubLessonsLenght,
    setAssignmentData,
    currentSubLessonIndex,
    setCurrentSubLessonIndex,
  } = useContext(CoursesDataContext);
  const [assignmentAnswer, setAssignmentAnswer] = useState("");
  const [responseStatus, setResponseStatus] = useState(null);
  const [responseAnswer, setResponseAnswer] = useState(null);

  const router = useRouter();
  const { courseId } = router.query;

  // useEffect(() => {
  //   setCurrentSubLessonIndex(currentSubLessonIndex);
  // }, [currentSubLessonIndex, setCurrentSubLessonIndex]);

  const updateAssignmentStatus = async (
    userId,
    assignmentId,
    status,
    assignmentAnswer
  ) => {
    try {
      const response = await axios.post(
        `/api/courses_learning/update-assignment-status`,
        {
          userId,
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
    const response = await updateAssignmentStatus(17, id, 1, assignmentAnswer);
    setResponseStatus(response.responseStatus);
    setResponseAnswer(response.responseAnswer);
    // setCurrentSubLessonIndex(currentSubLessonIndex);
  };

  return (
    <div>
      {status === "Submitted" || responseStatus === 1 ? (
        <div className=" flex flex-col gap-[25px] p-6 rounded-lg bg-[#E5ECF8]">
          <div className=" flex justify-between">
            <h1 className="text-xl">Assignment</h1>
            {responseStatus === 1 ? (
              <p className="rounded p-[4px_8px_4px_8px] bg-[#DDF9EF] text-[#0A7B60] font-medium">
                Submitted
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
              className="flex w-full min-h-24 border border-[#D6D9E4] bg-white rounded-lg p-[12px_16px_12px_12px] gap-2 items-start outline-none"
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
                onClick={() => handleOnSubmit(id)}
              />
            </div>
            {/* <p className="text-[#646D89]">Assign within 2 days</p> */}
          </div>
        </div>
      )}
    </div>
  );
}
