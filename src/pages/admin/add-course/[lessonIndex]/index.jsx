import { useRouter } from "next/router";
import { useContext } from "react";
import { AddCourseContext } from "@/pages/_app";

import AdminSidebar from "@/components/admin/sidebar";
import AdminLessonHeader from "@/components/admin/header/creating-lesson-page";
import AdminEditLessonForm from "@/components/admin/edit-lesson/edit-lesson-form";

export default function EditLesson() {
  const router = useRouter();
  const lessonIndex = router.query.lessonIndex;
  const { course, setCourse } = useContext(AddCourseContext);

  return (
    <>
      <div className="flex flex-grow w-full mx-auto h-full relative">
        <AdminSidebar section="course" />
        <div className="flex flex-col w-full bg-[#F6F7FC]">
          <AdminLessonHeader
            section="Add Lesson"
            course_name={course.course_name}
          />
          <AdminEditLessonForm
            lessonIndex={lessonIndex}
            //   onSubmit={handleLessonSubmit}
          />
        </div>
      </div>
    </>
  );
}
