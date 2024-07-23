import AdminSidebar from "@/components/admin/sidebar";
import React from "react";
import AdminLessonHeader from "@/components/admin/header/creating-lesson-page";
import AdminLessonForm from "@/components/add-lesson/lesson-form";

export default function AddNewLesson() {
  return (
    <React.Fragment>
      <div className="flex flex-grow w-full mx-auto h-full relative">
        <AdminSidebar section="course" />
        <div className="flex flex-col w-full bg-[#F6F7FC]">
          <AdminLessonHeader
            section="Add Lesson"
            course_name="Service Design Essentials"
            lesson_name="Introduction"
          />
          <AdminLessonForm />
        </div>
      </div>
    </React.Fragment>
  );
}
