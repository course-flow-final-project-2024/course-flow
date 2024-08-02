import { useRouter } from "next/router";
import { useContext } from "react";
import { AddCourseContext } from "@/pages/_app";

import AdminSidebar from "@/components/admin/sidebar";
import AdminLessonHeader from "@/components/admin/header/creating-lesson-page";
import AdminEditLessonForm from "@/components/admin/edit-lesson/edit-lesson-form";
import AdminEditLessonHeader from "@/components/admin/header/editing-lesson-page";

export default function EditLesson() {
  const router = useRouter();
  const lessonIndex = router.query.lessonIndex;
  const { course } = useContext(AddCourseContext);

  const lesson = course.lessons.find(
    (item) => item.index === parseInt(lessonIndex)
  );

  return (
    <>
      <div className="flex flex-grow w-full mx-auto h-full relative">
        <AdminSidebar section="course" />
        <div className="flex flex-col w-full bg-[#F6F7FC]">
          <AdminEditLessonHeader
            section="Lesson"
            course={course.course_name}
            lesson={lesson.lesson_title}
            form_id={"edit-lesson-in-add-course"}
          />
          <AdminEditLessonForm
            lessonIndex={lessonIndex}
            form_id={"edit-lesson-in-add-course"}
            //   onSubmit={handleLessonSubmit}
          />
        </div>
      </div>
    </>
  );
}
