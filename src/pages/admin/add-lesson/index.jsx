import AdminSidebar from "@/components/admin/sidebar";
import React, { useState, useContext, useEffect } from "react";
import AdminLessonHeader from "@/components/admin/header/creating-lesson-page";
import AdminLessonForm from "@/components/admin/add-lesson/lesson-form";
import { useRouter } from "next/router";
import { AddCourseContext } from "@/pages/_app";
import axios from "axios";

export default function AddNewLesson() {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const { course } = useContext(AddCourseContext);

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
    <React.Fragment>
      <div className="flex flex-grow w-full mx-auto min-h-screen">
        <AdminSidebar section="course" />
        <div className="flex flex-col w-full bg-[#F6F7FC]">
          <AdminLessonHeader
            section="Add Lesson"
            course_name={course.course_name}
            formId={"add-lesson-in-add-course"}
          />
          <AdminLessonForm formId={"add-lesson-in-add-course"} />
        </div>
      </div>
    </React.Fragment>
  );
}
