import Button from "@/utils/button";
import Image from "next/image";
import { useRouter } from "next/router";
import { handleLessonSubmit } from "@/components/admin/add-lesson/lesson-form";

const AdminLessonHeader = ({
  section,
  course_name,
  lesson_title,
  formId,
  course_id,
}) => {
  const router = useRouter();

  const handleCancleOnClick = () => {
    if (formId === "add-lesson-in-add-course") {
      router.push("/admin/add-course");
    }
    if (formId === "add-lesson-in-edit-course") {
      router.push(`/admin/courses/${course_id}`);
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
          onClick={handleCancleOnClick}
          className=" cursor-pointer"
        />
        <div>
          <div className="flex flex-row gap-2 text-sm">
            <p className="text-[#9AA1B9]">Course</p>
            <p className=" font-normal">
              ‘{course_name}’{lesson_title}
            </p>
          </div>
          <h3 className="grow font-medium text-[24px] text-gray-900 ">
            {section}
          </h3>
        </div>
      </div>
      <div className="flex w-[252px] gap-[16px] ">
        <Button
          text="Cancel"
          style="secondary"
          height="60px"
          onClick={handleCancleOnClick}
        />
        <Button
          text="Create"
          style="primary"
          height="60px"
          type="submit"
          form={formId}
        />
      </div>
    </div>
  );
};

export default AdminLessonHeader;
