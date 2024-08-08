import Button from "@/utils/button";
import Image from "next/image";
import { useRouter } from "next/router";

const AdminEditAssignmentHeader = ({ assignment }) => {
  const router = useRouter();

  const handleCancelClick = () => {
    router.push(`/admin/assignments`);
  };

  return (
    <div className="flex justify-between items-center gap-4 h-[92px] px-10 py-4 border-b border-[#D6D9E4] bg-white">
      <div className="flex gap-3">
        <Image
          src="/icons/admin/arrow-back.svg"
          alt="CourseFlow logo"
          width={16}
          height={16}
          onClick={handleCancelClick}
          className="cursor-pointer"
        />
        <div className="flex justify-start items-center gap-[8px] grow">
          <h3 className="font-medium text-[24px] text-[#9AA1B9] ">
            Assignment
          </h3>
          <h3 className="font-medium text-[24px] text-black tracking-[-2%] min-w-[300px]">
            `{assignment.assignment_title}`
          </h3>
        </div>
      </div>
      <div className="flex w-[252px] gap-[16px] ">
        <Button
          text="Cancel"
          style="secondary"
          height="60px"
          onClick={handleCancelClick}
        />
        <Button
          text="Save"
          style="primary"
          height="60px"
          type="submit"
          form="edit-assignment"
        />
      </div>
    </div>
  );
};

export default AdminEditAssignmentHeader;
