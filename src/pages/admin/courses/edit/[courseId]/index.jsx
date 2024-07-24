import { useRouter } from "next/router";
import AdminEditingHeader from "@/components/admin/header/editing-page";
import AdminSidebar from "@/components/admin/sidebar";

export default function EditCourse() {
  const router = useRouter();
  const courseId = router.query.courseId;
  return (
    <>
      <div id="page-container" className="flex min-h-screen w-full">
        <AdminSidebar section="course" />
        <div className="flex flex-col w-full">
          <AdminEditingHeader
            section="Course"
            courseTitle="Lorem ipsum odor amet"
            action="Edit"
            href="/admin/add-course"
          />
          <div className="bg-[#F6F7FC] p-10 w-full h-full"></div>
        </div>
      </div>
    </>
  );
}
