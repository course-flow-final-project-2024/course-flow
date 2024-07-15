import AdminSidebar from "@/components/admin/sidebar";
import AdminCreatingHeader from "@/components/admin/header/creating-page";
import { AdminLessonSection } from "@/components/admin/add-course/section-lesson";
import React, { createContext, useState } from "react";

export const LessonDataContext = createContext();

export default function AddNewCourse() {
  const [lesson, setLesson] = useState([]);

  return (
    <React.Fragment>
      <LessonDataContext.Provider value={{ lesson, setLesson }}>
        <div className="flex flex-grow w-full mx-auto h-full">
          <div>
            <AdminSidebar />
          </div>
          <div className="flex flex-col w-full bg-gray-100">
            <AdminCreatingHeader section="Add Course" />
            <div className="h-[1520px] border border-black">ploy</div>
            <AdminLessonSection lesson={lesson} setLesson={setLesson} />
          </div>
        </div>
      </LessonDataContext.Provider>
    </React.Fragment>
  );
}
