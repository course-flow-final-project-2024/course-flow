import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AddCourseContext } from "@/pages/_app";
import AdminEditLessonHeader from "@/components/admin/header/editing-lesson-page";
import AdminSidebar from "@/components/admin/sidebar";
import AdminEditLessonForm from "@/components/admin/edit-lesson/edit-lesson-form";
import AdminDeleteLesson from "@/components/admin/edit-lesson/delete-lesson";

export default function EditCourse() {
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
          {lesson ? (
            <>
              <AdminEditLessonHeader
                courseId={course.course_id}
                section="Lesson"
                course={course.course_name}
                lesson={lesson.lesson_title}
                formId={"edit-lesson-in-edit-course"}
              />
              <AdminEditLessonForm
                lessonIndex={lessonIndex}
                formId={"edit-lesson-in-edit-course"}
              />
            </>
          ) : null}
          <AdminDeleteLesson courseId={course.course_id} />
        </div>
      </div>
    </>
  );
}
