import AdminSidebar from "@/components/admin/sidebar";
import AdminListingHeader from "@/components/admin/header/listing-page";
import React from "react";
import AdminAssignmentList from "@/components/admin/assignments/assignment-tabel";

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
            <AdminAssignmentList />
          </div>
        </div>
      </div>
    </>
  );
}
