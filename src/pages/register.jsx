import Link from "next/link";
import RegistrationForm from "@/components/registration-form.jsx";
import Navbar from "@/components/navbar.jsx";
import BackgroundTemplate from "@/utils/bg-template";

function RegisterPage() {
  return (
    <div className="w-screen h-screen max-h-[700px] mx-0  flex flex-col items-center relative z-0 ">
      <div className="w-screen absolute z-50">
        <Navbar />
      </div>
      <div className="w-full pt-[200px] sm:pt-0 absolute z-0 ">
        <BackgroundTemplate />
      </div>
      <div className="container h-full max-w-[453px] mx-auto px-4 pt-[100px]  flex flex-col gap-8 absolute z-40">
        <h1 className="text-2xl font-medium text-[#22269E]">
          Register to start learning!
        </h1>
        <RegistrationForm />
        <div>
          Already have an account? {"\t"}
          <Link
            href="/login"
            className="font-bold text-[#2F5FAC] hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
export default RegisterPage;
