import AdminSidebar from "@/components/admin/sidebar";
import AdminCoursesList from "@/components/admin/courses/courses-table";
import AdminListingHeader from "@/components/admin/header/listing-page";
import React from "react";

export default function AssignmentList() {
  return (
    <>
      <div id="page-container" className="flex min-h-screen w-full">
        <AdminSidebar section="assignment" />
        <div className="flex flex-col w-full">
          <AdminListingHeader
            section="Assignment"
            action="+ Add Assignment"
            href="/admin/add-assignment"
          />
          <div className="bg-[#F6F7FC] p-10 w-full h-full">
            <p>Assignment Table</p>
          </div>
        </div>
      </div>
    </>
  );
}
