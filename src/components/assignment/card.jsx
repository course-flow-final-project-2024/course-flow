import { AssignmentContext } from "@/pages/assignment";
import { useContext } from "react";
import AnswerForm from "./form";

function AssignmentCard(filter) {
  const { assingmentData } = useContext(AssignmentContext);
  return (
    <div className="flex flex-col gap-6">
      {assingmentData.map((assignment, index) => (
        <div key={index} className="card bg-[#E5ECF8] ">
          <div className="card-body p-4 sm:py-10 sm:px-[8.5%]">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
              <div className="flex flex-col gap-3">
                <h2 className="text-xl text-black] font-normal">
                  {assignment.course_title}
                </h2>
                <p className="text-sm text-[#646D89] font-normal">
                  {assignment.sub_lesson_title}
                </p>
              </div>
              <div>
                <div>status box</div>
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
