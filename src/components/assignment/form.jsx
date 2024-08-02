import Button from "@/utils/button";

export default function AnswerForm(prop) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6  sm:items-start">
      <label className="w-full flex flex-col gap-1 ">
        <h3 className="text-base font-normal">
          {prop.assignment.assignment_title}
        </h3>
        {prop.assignment.answer ? (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6  sm:items-center">
            <div className="w-full min-h-24 py-4 px-3 text-[#9AA1B9]">
              {prop.assignment.answer}
            </div>
            <div>
              <a className="text-base text-[#2F5FAC] font-bold flex justify-center whitespace-nowrap">
                Open in Course
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6  sm:items-start">
            <textarea
              className="textarea textarea-bordered w-full min-h-24"
              placeholder="Answer..."
            ></textarea>
            <div className="flex flex-col gap-3">
              <Button text="Submit" style="primary" />
              <a className="text-base text-[#2F5FAC] font-bold flex justify-center whitespace-nowrap">
                Open in Course
              </a>
            </div>
          </div>
        )}
      </label>
    </div>
  );
}
