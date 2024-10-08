import { AdminLessonList } from "@/components/admin/add-course/lesson-table";
import Button from "@/utils/button";
import { useContext } from "react";
import { AddCourseContext } from "@/pages/_app";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

export function AdminLessonSection() {
  const { course } = useContext(AddCourseContext);

  const router = useRouter();
  const toast = useToast();

  const handleAddLessonClick = () => {
    if (course.course_name == "" || course.course_name == null) {
      toast({
        title: "Oops...",
        description: "Please enter course title before create lesson",
        status: "error",
        position: "top",
        duration: 9000,
        isClosable: true,
      });
    } else {
      router.push("/admin/add-lesson");
    }
  };

  return (
    <div className=" px-10 pt-[30px] pb-20">
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
        <AdminLessonList />
      </div>
    </div>
  );
}
