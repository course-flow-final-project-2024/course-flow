import AdminSidebar from "@/components/admin/sidebar.jsx";
import AdminCreatingHeader from "@/components/admin/header/creating-page";
import { AdminLessonSection } from "@/components/admin/add-course/section-lesson";
import { createContext, useState } from "react";
import AdminAddCourseForm from "@/components/admin/add-course/add-course-form";
import { Spinner } from "@chakra-ui/react";

export const LessonDataContext = createContext();

export default function AddNewCourse() {
  const [lesson, setLesson] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LessonDataContext.Provider value={{ lesson, setLesson }}>
      {isLoading ? (
        <>
          <div className="flex flex-col justify-center items-center gap-10 w-full min-h-screen bg-white opacity-90 absolute z-10">
            <Spinner
              thickness="4px"
              speed="0.9s"
              emptyColor="gray.200"
              color="blue.500"
              width="50px"
              height="50px"
            />
            <p className="opacity-100">Course is being created...</p>
          </div>
          <div className="flex flex-grow w-full mx-auto h-full relative">
            <AdminSidebar section="course" />
            <div className="flex flex-col w-full bg-[#F6F7FC]">
              <AdminCreatingHeader section="Add Course" />
              <AdminAddCourseForm
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
              <AdminLessonSection lesson={lesson} setLesson={setLesson} />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-grow w-full mx-auto h-full relative">
          <AdminSidebar section="course" />
          <div className="flex flex-col w-full bg-[#F6F7FC]">
            <AdminCreatingHeader section="Add Course" />
            <AdminAddCourseForm
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <AdminLessonSection lesson={lesson} setLesson={setLesson} />
          </div>
        </div>
      )}
    </LessonDataContext.Provider>
  );
}
