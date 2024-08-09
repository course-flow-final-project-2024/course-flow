import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AddCourseContext } from "@/pages/_app";
import axios from "axios";
import AdminEditingHeader from "@/components/admin/header/editing-page";
import AdminSidebar from "@/components/admin/sidebar";
import AdminEditCourseForm from "@/components/admin/edit-course/edit-course-form";
import { AdminEditLessonSection } from "@/components/admin/edit-course/section-lesson";
import { Spinner, useToast } from "@chakra-ui/react";
import AdminDeleteCourse from "@/components/admin/edit-course/delete-course";

export default function EditCourse() {
  const router = useRouter();
  const courseId = router.query.courseId;
  const { course, setCourse } = useContext(AddCourseContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const toastId = "fetch-course";
  const toast = useToast({
    id: toastId,
    position: "top",
    isClosable: true,
  });

  const isEmptyCourse = () => {
    return (
      course.course_name === "" &&
      course.price === "" &&
      course.duration === "" &&
      course.summary === "" &&
      course.detail === "" &&
      course.course_image === null &&
      course.video_trailer === null &&
      course.attach_file === null &&
      (!course.lessons || course.lessons.length === 0)
    );
  };

  const getData = async () => {
    const getCourseData = axios.get(
      `/api/courses_detail/get_by_id?courseId=${courseId}`
    );
    if (!toast.isActive(toastId)) {
      toast.promise(getCourseData, {
        toastId,
        success: { title: "Dowload complete :)", description: "Let's go!" },
        error: { title: "Oops.. :(", description: "Something wrong." },
        loading: { title: "Downloading course", description: "Please wait." },
      });
    }
    try {
      const result = await getCourseData;
      setCourse(result.data.courses[0]);
    } catch (error) {
      console.error("Failed to read course data", error.message);
    }
  };

  async function checkLoginStatus() {
    const hasToken = Boolean(localStorage.getItem("token"));
    if (hasToken) {
      try {
        const result = await axios.get("/api/user-profile/get");
        if (result.data.user.role !== 1) {
          router.push("/");
          return;
        }

        if (result.data.user.role === 1) {
          if (courseId && isEmptyCourse()) {
            getData();
          }
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
  }, [isClient, router, courseId]);

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
            <p className="opacity-100">Course is being updated...</p>
          </div>
          <div
            id="page-container"
            className="flex min-h-screen w-full relative"
          >
            <AdminSidebar section="course" />
            <div className="flex flex-col w-full">
              <AdminEditingHeader
                section="Course"
                courseTitle={course.course_name}
                action="Edit"
                href="/admin/add-course"
              />

              <div className="bg-[#F6F7FC] p-10 w-full h-full">
                <AdminEditCourseForm
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </div>
              <AdminEditLessonSection />
            </div>
          </div>
        </>
      ) : (
        <div id="page-container" className="flex min-h-screen w-full">
          <AdminSidebar section="course" />
          <div className="flex flex-col w-full">
            <AdminEditingHeader
              section="Course"
              courseTitle={course.course_name}
              action="Edit"
              href="/admin/add-course"
            />

            <div className="bg-[#F6F7FC] p-10 w-full h-full">
              <AdminEditCourseForm
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            </div>
            <AdminEditLessonSection />
            <AdminDeleteCourse />
          </div>
        </div>
      )}
    </>
  );
}
