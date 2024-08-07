import Link from "next/link";
import LogInForm from "@/components/login/login-form.jsx";
import Navbar from "@/components/navbar/navbar.jsx";
import BackgroundTemplate from "@/utils/bg-template";
import { useEffect } from "react";
import { useRouter } from "next/router";

function LogInPage() {
  const router = useRouter();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("token"));
    if (userInfo) {
      router.push("/");
    }
  }, []);

  return (
    <div className="w-screen h-screen max-h-[700px] mx-0 sm:flex sm:justify-center sm:items-center relative z-0 ">
      <div className="w-screen absolute top-0 z-50">
        <Navbar />
      </div>
      <div className="w-full absolute z-0">
        <BackgroundTemplate />
      </div>
      <div className="container max-w-[453px] mx-auto px-4 pt-[100px] sm:pt-[0px]  flex flex-col gap-8 relative z-40">
        <h1 className="text-2xl font-medium text-[#22269E]">Welcome back!</h1>
        <LogInForm />
        <div className="flex flex-row gap-2">
          Don't have an account?
          <Link
            href="/register"
            className="font-bold text-[#2F5FAC] hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
export default LogInPage;
