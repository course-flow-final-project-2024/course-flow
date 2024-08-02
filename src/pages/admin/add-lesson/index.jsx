import AdminSidebar from "@/components/admin/sidebar";
import React, { useState, useContext } from "react";
import AdminLessonHeader from "@/components/admin/header/creating-lesson-page";
import AdminLessonForm from "@/components/admin/add-lesson/lesson-form";
import { useRouter } from "next/router";
import { AddCourseContext } from "@/pages/_app";

export default function AddNewLesson() {
  const router = useRouter();
  const [lesson, setLesson] = useState();
  const { course } = useContext(AddCourseContext);

  const handleLessonSubmit = (lessonData) => {
    setLesson(lessonData);
    router.push("/admin/add-course");
  };

  return (
    <React.Fragment>
      <div className="flex flex-grow w-full mx-auto h-full relative">
        <AdminSidebar section="course" />
        <div className="flex flex-col w-full bg-[#F6F7FC]">
          <AdminLessonHeader
            section="Add Lesson"
            course_name={course.course_name}
            form_id={"add-lesson-in-add-course"}
          />
          <AdminLessonForm
            onSubmit={handleLessonSubmit}
            form_id={"add-lesson-in-add-course"}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
