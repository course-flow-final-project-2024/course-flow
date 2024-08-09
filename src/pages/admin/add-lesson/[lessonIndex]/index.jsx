import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AddCourseContext } from "@/pages/_app";
import axios from "axios";

import AdminSidebar from "@/components/admin/sidebar";
import AdminEditLessonForm from "@/components/admin/edit-lesson/edit-lesson-form";
import AdminEditLessonHeader from "@/components/admin/header/editing-lesson-page";

export default function EditLesson() {
  const router = useRouter();
  const [lessons, setLessons] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const lessonIndex = router.query.lessonIndex;
  const { course } = useContext(AddCourseContext);

  useEffect(() => {
    if (lessonIndex && course) {
      const lesson = course.lessons.find(
        (item) => item.index === parseInt(lessonIndex)
      );
      setLessons(lesson);
    }
  }, [lessonIndex, course]);

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
      <div className="flex flex-grow w-full mx-auto min-h-screen">
        <AdminSidebar section="course" />
        <div className="flex flex-col w-full bg-[#F6F7FC]">
          {lessons ? (
            <>
              <AdminEditLessonHeader
                section="Lesson"
                course={course.course_name}
                lesson={lessons.lesson_title}
                formId={"edit-lesson-in-add-course"}
              />
              <AdminEditLessonForm
                lessonIndex={lessonIndex}
                formId={"edit-lesson-in-add-course"}
              />
            </>
          ) : (
            <div className="w-full min-h-[350px] flex flex-col gap-4 items-center justify-center">
              <span className="text-3xl">Loading</span>
              <span className="loading loading-dots loading-lg"></span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
