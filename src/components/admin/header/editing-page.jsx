import Button from "@/utils/button";
import { useRouter } from "next/router";
import Image from "next/image";

const AdminEditingHeader = (props) => {
  const router = useRouter();

  const handleOnClick = () => {
    router.push("/admin/courses");
  };

  return (
    <div className="flex items-center gap-4 h-[92px] px-10 py-4 border-b border-[#D6D9E4] bg-white">
      <Image
        src="/icons/admin/arrow-back.svg"
        width={24}
        height={24}
        alt="arrow-back-icon"
      />
      <div className="flex justify-start items-center gap-[8px] grow">
        <h3 className="font-medium text-[24px] text-[#9AA1B9] ">
          {props.section}
        </h3>
        <h3 className=" font-medium text-[24px] text-black tracking-[-2%] min-w-[300px]">
          `{props.courseTitle}`
        </h3>
      </div>
      <div className="flex w-[252px] gap-[16px] ">
        <Button
          text="Cancel"
          style="secondary"
          height="60px"
          onClick={handleOnClick}
        />
        <Button
          text={props.action}
          style="primary"
          height="60px"
          type="submit"
          //form="add-course"
        />
      </div>
    </div>
  );
};

export default AdminEditingHeader;
