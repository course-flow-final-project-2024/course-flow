import Button from "@/utils/button";
import { useContext } from "react";
import { AddCourseContext } from "@/pages/_app";
import { useRouter } from "next/router";
import axios from "axios";
import { AdminEditLessonList } from "./lesson-table";
import { useToast } from "@chakra-ui/react";

export function AdminEditLessonSection() {
  const { course } = useContext(AddCourseContext);

  const router = useRouter();
  const toast = useToast;

  const handleAddLessonClick = () => {
    if (course.course_name == "" || course.course_name == null) {
      toast({
        title: "Oops...",
        description: "Please enter course title before update lesson",
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    } else {
      router.push(`/admin/courses/${course.course_id}/add-lesson`);
    }
  };

  return (
    <div className=" px-10 pt-[30px] pb-20 bg-[#F6F7FC]">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-medium">Lesson</h3>
        <div className="w-[171px]">
          <Button
            text="+ Add Lesson"
            style="primary"
            height="60px"
            customStyle="w-[171px]"
            onClick={handleAddLessonClick}
          />
        </div>
      </div>
      <div className="mt-[43px]">
        <AdminEditLessonList />
      </div>
    </div>
  );
}
