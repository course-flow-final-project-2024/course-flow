import Button from "@/utils/button";
import Image from "next/image";
import { useRouter } from "next/router";

const AdminEditLessonHeader = ({
  section,
  course,
  lesson,
  courseId,
  form_id,
}) => {
  const router = useRouter();

  const handleCancelClick = () => {
    if (form_id === "edit-lesson-in-add-course") {
      router.push(`/admin/add-course`);
    } else {
      router.push(`/admin/courses/${courseId}`);
    }
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
          className=" cursor-pointer"
        />
        <div>
          <div className="flex flex-row gap-2 text-sm">
            <p className="text-[#9AA1B9]">Course</p>
            <p className=" font-normal">‘{course}’</p>
          </div>
          <div className="flex flex-row gap-2">
            <h3 className="grow font-medium text-[24px] text-[#9AA1B9]">
              {section}
            </h3>
            <h3 className="grow font-medium text-[24px] text-black">
              `{lesson}`
            </h3>
          </div>
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
          text="Edit"
          style="primary"
          height="60px"
          type="submit"
          form={form_id}
        />
      </div>
    </div>
  );
};

export default AdminEditLessonHeader;
