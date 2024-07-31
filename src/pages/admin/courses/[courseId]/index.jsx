import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AddCourseContext } from "@/pages/_app";
import axios from "axios";
import AdminEditingHeader from "@/components/admin/header/editing-page";
import AdminSidebar from "@/components/admin/sidebar";
import AdminEditCourseForm from "@/components/admin/edit-course/edit-course-form";
import { AdminEditLessonSection } from "@/components/admin/edit-course/section-lesson";

export default function EditCourse() {
  const router = useRouter();
  const courseId = router.query.courseId;
  const { course, setCourse } = useContext(AddCourseContext);

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
      course.files.course_image === null &&
      course.files.video_trailer === null &&
      course.files.attach_file === null &&
      (!course.lessons || course.lessons.length === 0)
    );
  };

  const getData = async () => {
    try {
      const result = await axios.get(
        `/api/courses_detail/get_by_id?courseId=${courseId}`
      );
      setCourse(result.data.courses[0]);
    } catch (error) {
      console.log("Failed to read course data");
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (courseId && isEmptyCourse()) {
      getData();
    }
  }, [courseId]);

  console.log("course", course);

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
          </div>
          <AdminEditLessonSection />
        </div>
      </div>
    </>
  );
}
