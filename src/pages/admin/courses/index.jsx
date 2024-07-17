import AdminSidebar from "@/components/admin/sidebar";
import AdminCoursesList from "@/components/admin/courses/courses-table";
import AdminListingHeader from "@/components/admin/header/listing-page";
import React from "react";

export default function CourseList() {
  return (
    <>
      <div id="page-container" className="flex min-h-screen w-full">
        <AdminSidebar section="course" />
        <div className="flex flex-col w-full">
          <AdminListingHeader
            section="Course"
            action="+ Add Course"
            href="/admin/add-course"
          />
          <div className="bg-[#F6F7FC] p-10 w-full h-full">
            <AdminCoursesList />
          </div>
        </div>
      </div>
    </>
  );
}
