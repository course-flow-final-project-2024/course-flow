import Button from "@/utils/button";

export default function AssignmentCard() {
  return (
    <div className=" flex flex-col gap-[25px] p-6 rounded-lg bg-[#E5ECF8]">
      <div className=" flex justify-between">
        <h1 className="text-xl">Assignment</h1>
        <p className="rounded p-[4px_8px_4px_8px] bg-[#FFFBDB] text-[#996500] font-medium">
          Pending
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <p>What are the 4 elements of service design?</p>
        <textarea
          type="text"
          className="flex w-full h-24 border border-[#D6D9E4] bg-white rounded-lg p-[12px_16px_12px_12px] gap-2 items-start outline-none"
          placeholder="Answer..."
        />
      </div>
      <div className="flex min-[800px]:flex-row flex-col min-[800px]:justify-between min-[800px]:items-center gap-2">
        <div className="flex min-[800px]:w-[203px]">
          <Button style="primary" text="Send Assigment" onClick="" />
        </div>
        <p className="text-[#646D89]">Assign within 2 days</p>
      </div>
    </div>
  );
}
