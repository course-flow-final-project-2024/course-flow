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
        className={`flex flex-grow w-full mx-auto h-screen ${inter.className} `}
      >
        <AdminSidebar />
        <div className="flex flex-col w-full">
          <AdminListingHeader section="Course" action="+ Add Course" />
          <div className="bg-gray-100 h-full p-10 ">
            <AdminCoursesList />
          </div>
        </div>
      </div>
    </>
  );
}
