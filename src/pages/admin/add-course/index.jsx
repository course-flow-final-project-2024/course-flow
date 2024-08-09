import AdminSidebar from "@/components/admin/sidebar.jsx";
import AdminCreatingHeader from "@/components/admin/header/creating-page";
import { AdminLessonSection } from "@/components/admin/add-course/section-lesson";
import { createContext, useState, useContext, useEffect } from "react";
import AdminAddCourseForm from "@/components/admin/add-course/add-course-form";
import { Spinner } from "@chakra-ui/react";
import { AddCourseContext } from "@/pages/_app";
import { useRouter } from "next/router";
import axios from "axios";

export const LessonDataContext = createContext();

export default function AddNewCourse() {
  const { course, setCourse } = useContext(AddCourseContext);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  async function checkLoginStatus() {
    const hasToken = Boolean(localStorage.getItem("token"));
    if (hasToken) {
      try {
        const result = await axios.get("/api/user-profile/get");
        if (result.data.user.role !== 1) {
          router.push("/");
          return;
        }
      } catch (error) {
        router.push("/admin/login");
      }
    }
    if (!hasToken) {
      router.push("/admin/login");
      return;
    }
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      checkLoginStatus();
    }
  }, [isClient, router]);

  return (
    <>
      {isLoading ? (
        <>
          <div className="flex flex-col justify-start items-center gap-10 w-full min-h-screen h-full bg-white opacity-90 absolute z-10">
            <Spinner
              thickness="4px"
              speed="0.9s"
              emptyColor="gray.200"
              color="blue.500"
              width="50px"
              height="50px"
              marginTop="300px"
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
              <AdminLessonSection />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-grow w-full mx-auto h-full relative">
          <AdminSidebar section="course" />
          <div className="flex flex-col w-full bg-[#F6F7FC]">
            <AdminCreatingHeader section="Add Course" formId={"add-course"} />
            <AdminAddCourseForm
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
            <AdminLessonSection />
          </div>
        </div>
      )}
    </>
  );
}
