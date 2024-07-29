import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AddCourseContext } from "@/pages/_app";
import axios from "axios";
import AdminEditingHeader from "@/components/admin/header/editing-page";
import AdminSidebar from "@/components/admin/sidebar";
import AdminEditCourseForm from "@/components/admin/edit-course/edit-course-form";
import { AdminLessonSection } from "@/components/admin/add-course/section-lesson";

export default function EditCourse() {
  const router = useRouter();
  const courseId = router.query.courseId;
  const { course, setCourse } = useContext(AddCourseContext);

  const getData = async () => {
    try {
      const result = await axios.get(
        `/api/courses_detail/course_detail?courseId=${courseId}`
      );
      setCourse(result.data.courses[0]);
    } catch (error) {
      console.log("Failed to read course data");
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (courseId) {
      getData();
    }
  }, [courseId]);

  console.log(course);
  return (
    <>
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
            <AdminEditCourseForm />
            {/* <AdminLessonSection /> */}
          </div>
        </div>
      </div>
    </>
  );
}
