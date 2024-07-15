import AdminSidebar from "@/components/admin/sidebar";
import AdminCreatingHeader from "@/components/admin/header/creating-page";
import { AdminLessonSection } from "@/components/admin/add-course/section-lesson";
import AdminAddCourseForm from "@/components/admin/add-course/add-course-form";

export default function AddNewCourse() {
  return (
    <>
      <div className="flex flex-grow w-full mx-auto h-full">
        <div>
          <AdminSidebar />
        </div>
        <div className="flex flex-col w-full bg-gray-100">
          <AdminCreatingHeader section="Add Course" />
          {/* Ployyyyyy */}
          <AdminAddCourseForm />
          {/* Nonnnnnn */}
          <AdminLessonSection />
        </div>
      </div>
    </>
  );
}
