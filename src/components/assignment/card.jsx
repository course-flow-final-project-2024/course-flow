import { AssignmentContext } from "@/pages/my-assignments";
import { useContext } from "react";
import AnswerForm from "./form";

function AssignmentCard(filter) {
  const { assingmentData } = useContext(AssignmentContext);

  return (
    <div className="flex flex-col gap-6">
      {assingmentData.map((assignment) => (
        <div key={assignment.user_assignment_id} className="card bg-[#E5ECF8] ">
          <div className="card-body p-4 sm:py-10 sm:px-[8.5%]">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <div className="flex flex-col gap-3">
                <h2 className="text-xl text-black] font-normal">
                  {
                    assignment.assignments.sub_lessons.lessons.courses
                      .course_name
                  }
                </h2>
                <p className="text-sm text-[#646D89] font-normal">
                  {assignment.assignments.sub_lessons.sub_lesson_title}
                </p>
              </div>
              <div>
                {assignment.assignment_status_id === 1 ? (
                  <span
                    className="px-2 py-1 rounded-sm bg-[#DDF9EF] text-sm
                    text-[#0A7B60] font-medium"
                  >
                    Submitted
                  </span>
                ) : (
                  <span
                    className="px-2 py-1 rounded-sm bg-[#FFFBDB] text-sm
                  text-[#996500] font-medium"
                  >
                    Pending
                  </span>
                )}
              </div>
            </div>
            <div className="w-full bg-white rounded-md border border-[#D6D9E4] p-4 sm:p-6 ">
              <AnswerForm assignment={assignment} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default AssignmentCard;
