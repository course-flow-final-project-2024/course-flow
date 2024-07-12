import { Inter } from "next/font/google";
import AdminSidebar from "@/components/admin/sidebar";
import AdminCoursesList from "@/components/admin/courses-table";
import AdminListingHeader from "@/components/admin/header/listing-page";

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
