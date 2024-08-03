import { AddCourseContext } from "@/pages/_app";
import Button from "@/utils/button";
import { useRouter } from "next/router";
import { useContext } from "react";

const AdminCreatingHeader = ({ section, onClick }) => {
  const router = useRouter();
  const { setCourse } = useContext(AddCourseContext);

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

  const handleOnClick = () => {
    router.push("/admin/courses");
    setCourse(courseInitialValue);
  };

  return (
    <div className="flex items-center gap-4 h-[92px] px-10 py-4 border-b border-[#D6D9E4] bg-white">
      <h3 className="grow font-medium text-[24px] text-gray-900 ">{section}</h3>
      <div className="flex w-[252px] gap-[16px] ">
        <Button
          text="Cancel"
          style="secondary"
          height="60px"
          onClick={handleOnClick}
        />
        <Button
          text="Create"
          style="primary"
          height="60px"
          type="submit"
          form="add-course"
        />
      </div>
    </div>
  );
};

export default AdminCreatingHeader;
