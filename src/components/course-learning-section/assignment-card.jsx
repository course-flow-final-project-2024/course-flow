import Button from "@/utils/button";
import { useRouter } from "next/router";
import axios from "axios";
import { useContext, useState } from "react";
import { CoursesDataContext } from "@/pages/courses/[courseId]/learning";
import CommonModalBox from "@/utils/common-modal";

export default function AssignmentCard({ id, question, status, answer }) {
  const {
    setCourseData,
    setLessonData,
    setSubLessonData,
    setSubLessonsLength,
    setAssignmentData,
    progress,
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
    const hasToken = localStorage.getItem("token");
    if (!hasToken) {
      router.push("/login");
      return;
    }
    console.log(assignmentId);

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
        let result = null;
        try {
          console.log("gg");

          const getAllAssignmentStatus = async () => {
            try {
              console.log("hh");

              const data = await axios.get(
                `/api/courses_learning/get-all-assignment-status`,
                { assignmentId }
              );
              console.log("LL");

              return data;
            } catch (error) {
              console.log({ 1: error });

              return {
                message:
                  "Server could not read assignments due to database connection",
              };
            }
          };

          result = await getAllAssignmentStatus();
          console.log(result);
        } catch (error) {
          console.log(error.message, error.stack);
          return {
            message: "Server could not read courses due to database connection",
          };
        }
        return {
          message: "Assignment status updated successfully",
          result: result,
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

  // const checkAssignmentStatus = (data) => {
  //   const courses = data.courses || [];
  //   console.log(courses);

  //   for (const course of data.courses) {
  //     for (const lesson of course.courses.lessons) {
  //       for (const subLesson of lesson.sub_lessons) {
  //         for (const assignment of subLesson.assignments) {
  //           if (
  //             assignment.user_assignments[1] &&
  //             assignment.user_assignments[1].assignment_status_id !== 1
  //           ) {
  //             return false;
  //           }
  //         }
  //       }
  //     }
  //   }

  //   return true;
  // };

  const handleOnSubmit = async (id, progress) => {
    if (assignmentAnswer.trim() === "") {
      alert("Please provide an answer before submitting.");
      return;
    }
    const response = await updateAssignmentStatus(id, 1, assignmentAnswer);
    console.log(response);

    // if (Math.round(progress) === 100) {
    //   console.log("Hello100");
    //   const allAssignmentsStatus = checkAssignmentStatus(response.result.data);
    //   console.log(allAssignmentsStatus);
    // }
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
