import AdminSidebar from "@/components/admin/sidebar";
import AdminCoursesList from "@/components/admin/courses/courses-table";
import AdminListingHeader from "@/components/admin/header/listing-page";

export default function CourseList() {
  return (
    <>
      <div
        id="page-container"
        className="flex flex-grow w-full mx-auto h-screen"
      >
        <AdminSidebar />
        <div className="flex flex-col w-full">
          <AdminListingHeader
            section="Course"
            action="+ Add Course"
            href="/admin/add-course"
          />
          <div className="bg-gray-100 h-full p-10 w-full">
            <AdminCoursesList />
          </div>
        </div>
      </div>
    </>
  );
}
