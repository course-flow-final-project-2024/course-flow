import AdminSidebar from "@/components/admin/sidebar";
import AdminCreatingHeader from "@/components/admin/header/creating-page";
export default function ADdNewCourse() {
  return (
    <>
      <div className="flex flex-grow w-full mx-auto h-full">
        <div>
          <AdminSidebar />
        </div>
        <div className="flex flex-col w-full bg-gray-100">
          <AdminCreatingHeader section="Add Course" />
          <div className="h-[1520px] border border-black">ploy</div>
          <div className="h-[800px]">non</div>
        </div>
      </div>
    </>
  );
}
