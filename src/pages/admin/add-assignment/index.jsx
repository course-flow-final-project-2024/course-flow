import AdminSidebar from "@/components/admin/sidebar";
import AdminCreatingHeader from "@/components/admin/header/creating-page";
import AdminAddAssignmentForm from "@/components/admin/add-assignment/add-assignment-form";

export default function AddNewASsignment() {
  return (
    <>
      <div className="min-h-screen flex flex-grow w-full relative">
        <AdminSidebar section="assignment" />
        <div className="flex flex-col w-full bg-[#F6F7FC]">
          <AdminCreatingHeader
            section="Add Assignment"
            formId={"add-assignment"}
          />
          <div className="w-full pt-10 px-10">
            <AdminAddAssignmentForm />
          </div>
        </div>
      </div>
    </>
  );
}
