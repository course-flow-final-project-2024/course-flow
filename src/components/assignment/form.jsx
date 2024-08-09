import Button from "@/utils/button";
import { useRouter } from "next/router";
import { useState } from "react";
import CommonModalBox from "@/utils/common-modal";
import updateAssignment from "./update-assignment";
import { AssignmentContext } from "@/pages/my-assignments";
import { useContext } from "react";

export default function AnswerForm(prop) {
  const { getUserAssignment } = useContext(AssignmentContext);
  const router = useRouter();
  const [answer, setAnswer] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  function handleOnChange(e) {
    setAnswer(e.target.value);
  }

  async function handleOnSubmit(assignmentId) {
    const { message } = await updateAssignment(assignmentId, 1, answer);
    getUserAssignment();
    handleClose();
  }
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6  sm:items-start">
      <label className="w-full flex flex-col gap-3 ">
        <h3 className="text-base font-normal">
          {prop.assignment.assignments.assignment_title}
        </h3>
        {prop.assignment.answer ? (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6  sm:items-center">
            <div className="w-full min-h-24 py-4 px-3 text-[#9AA1B9]">
              {prop.assignment.answer}
            </div>
            <div>
              <a
                role="button"
                onClick={() => {
                  router.push(
                    `/courses/${prop.assignment.assignments.sub_lessons.lessons.course_id}/learning?subLessonId=${prop.assignment.assignments.sub_lessons.sub_lesson_id}`
                  );
                }}
                className="text-base text-[#2F5FAC] font-bold flex justify-center whitespace-nowrap hover:underline"
              >
                Open in Course
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6  sm:items-start">
            <textarea
              className="textarea textarea-bordered w-full min-h-24"
              placeholder="Answer..."
              onChange={(e) => {
                handleOnChange(e);
              }}
            ></textarea>
            <div className="flex flex-col gap-3">
              <Button
                text="Submit"
                style="primary"
                onClick={() => {
                  if (answer.length > 0) {
                    setIsOpen(true);
                  }
                }}
              />
              <CommonModalBox
                setOpen={setIsOpen}
                open={isOpen}
                text="Send Assigment"
                AlertMessage="Do you want to send assignment answer? Please ensure that once sent, it cannot be edited."
                leftOnClick={handleClose}
                leftText="Cancel"
                rightOnClick={() =>
                  handleOnSubmit(prop.assignment.assignment_id)
                }
                rightText="Yes, send now"
              />
              <a
                role="button"
                onClick={() => {
                  router.push(
                    `/courses/${prop.assignment.assignments.sub_lessons.lessons.course_id}/learning?subLessonId=${prop.assignment.assignments.sub_lessons.sub_lesson_id}`
                  );
                }}
                className="text-base text-[#2F5FAC] font-bold flex justify-center whitespace-nowrap hover:underline"
              >
                Open in Course
              </a>
            </div>
          </div>
        )}
      </label>
    </div>
  );
}
