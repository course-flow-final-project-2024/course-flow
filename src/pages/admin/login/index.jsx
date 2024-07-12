import Link from "next/link";
import AdminLogInForm from "@/components/login/admin-login-form";
import Image from "next/image";
function AdminLogInPage() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-r from-blue-600 to-blue-400">
      <div className="w-full max-w-[570px] flex flex-col justify-center gap-[46px] px-[60px] pt-[60px] pb-[80px] rounded-lg bg-white">
        <div className="container mx-auto flex flex-col justify-center items-center gap-6 ">
          <Image
            src="/logo/CourseFlowLogo.svg"
            width={315}
            height={36}
            alt="website-logo"
          />
          <h1 className="text-2xl text-[#646D89]">Admin Panel Control</h1>
        </div>
        <AdminLogInForm />
      </div>
    </div>
  );
}
export default AdminLogInPage;
