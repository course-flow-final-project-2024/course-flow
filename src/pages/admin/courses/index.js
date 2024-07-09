import { Inter } from "next/font/google";
import AdminSidebar from "@/components/admin/sidebar";
import AdminListingHeader from "@/components/admin/list-header";
import AdminCoursesList from "@/components/admin/courses-table";

const inter = Inter({ subsets: ["latin"] });

export default function CourseList() {
  return (
    <>
      <div
        id="page-container"
        className={`flex w-screen h-screen ${inter.className}`}
      >
        <AdminSidebar />
        <div className="flex flex-col">
          <AdminListingHeader title="Course" button="+ Add Course" />
          <div className="bg-gray-100 w-auto h-full p-10 ">
            <AdminCoursesList />
          </div>
        </div>
      </div>
    </>
  );
}
