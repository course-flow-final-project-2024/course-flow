import React, { createContext, useState, useContext } from "react";
import AdminSidebar from "@/components/admin/sidebar";
import AdminCreatingHeader from "@/components/admin/header/creating-page";
import { AdminLessonSection } from "@/components/admin/add-course/section-lesson";
import AdminAddCourseForm from "@/components/admin/add-course/add-course-form";

export const LessonDataContext = createContext();

export default function AddNewCourse() {
  const [lesson, setLesson] = useState([]);
  const [formInput, setFormInput] = useState({
    course_name: "",
    price: "",
    duration: "",
    summary: "",
    detail: "",
  });

  function handleCreateClick() {}

  return (
    <LessonDataContext.Provider
      value={{
        lesson,
        setLesson,
        formInput,
        setFormInput,
        handleCreateClick,
      }}
    >
      <div className="flex flex-grow w-full mx-auto h-full">
        <div>
          <AdminSidebar />
        </div>
        <div className="flex flex-col w-full bg-gray-100">
          <AdminCreatingHeader
            section="Add Course"
            onClick={handleCreateClick}
          />
          <AdminAddCourseForm
            setFormInput={setFormInput}
            formInput={formInput}
          />
          <AdminLessonSection lesson={lesson} setLesson={setLesson} />
        </div>
      </div>
    </LessonDataContext.Provider>
  );
}
