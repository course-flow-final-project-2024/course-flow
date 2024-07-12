<<<<<<< HEAD
export default function ADdNewCourse() {
  return (
    <>
      <h1>ADD COURSE PAGE</h1>
=======
import AdminSidebar from "@/components/admin/sidebar";
import AdminCreatingHeader from "@/components/admin/header/creating-page";
import { LessonTable } from "@/components/admin/add-course/lesson-table";
import Button from "@/utils/button";
import Link from "next/link";

export default function AddNewCourse() {
  return (
    <>
      <div className="flex flex-grow w-full mx-auto h-full">
        <div>
          <AdminSidebar />
        </div>
        <div className="flex flex-col w-full bg-gray-100">
          <AdminCreatingHeader section="Add Course" />
          <div className="h-[1520px] border border-black">ploy</div>
          <div className="h-[770px] px-10 pt-[30px]">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-medium">Lesson</h3>
              <Link href="/admin/add-lesson">
                <Button
                  text="+ Add Lesson"
                  style="primary"
                  height="60px"
                  customStyle="w-[171px]"
                />
              </Link>
            </div>
            <div className="mt-[43px]">
              <LessonTable />
            </div>
          </div>
        </div>
      </div>
>>>>>>> 8de8d92 (feat: create lesson table on add-course page)
    </>
  );
}
