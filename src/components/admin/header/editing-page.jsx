import Button from "@/utils/button";
import { useRouter } from "next/router";
import Image from "next/image";
import { useContext } from "react";
import { AddCourseContext } from "@/pages/_app";

const AdminEditingHeader = (props) => {
  const { setCourse } = useContext(AddCourseContext);
  const router = useRouter();
  const courseInitialValue = {
    course_name: "",
    price: "",
    duration: "",
    summary: "",
    detail: "",
    course_image: null,
    video_trailer: null,
    attach_file: null,
    lessons: [],
  };

  const handleCancelClick = () => {
    setCourse(courseInitialValue);
    router.push("/admin/courses");
  };

  return (
    <div className="flex items-center gap-4 h-[92px] px-10 py-4 border-b border-[#D6D9E4] bg-white">
      <Image
        src="/icons/admin/arrow-back.svg"
        width={24}
        height={24}
        alt="arrow-back-icon"
        onClick={handleCancelClick}
        className=" cursor-pointer"
      />
      <div className="flex justify-start items-center gap-[8px] grow">
        <h3 className="font-medium text-[24px] text-[#9AA1B9] ">
          {props.section}
        </h3>
        <h3 className="font-medium text-[24px] text-black tracking-[-2%] min-w-[300px]">
          `{props.courseTitle}`
        </h3>
      </div>
      <div className="flex w-[252px] gap-[16px] ">
        <Button
          text="Cancel"
          style="secondary"
          height="60px"
          onClick={handleCancelClick}
        />
        <Button
          text={props.action}
          style="primary"
          height="60px"
          type="submit"
          form="edit-course"
        />
      </div>
    </div>
  );
};

export default AdminEditingHeader;
