import Image from "next/image";
import Link from "next/link";
import LoginButton from "./login-button.jsx";

function Navbar() {
  return (
    <div className="w-full h-14 bg-white flex justify-between shadow-md relative z-10 sm:px-[160px] px-4">
      <Image
        src="/logo/CourseFlowLogo.svg"
        width={117}
        height={13.37}
        alt="website-logo"
      />
      <div className=" h-full w-3/6 flex items-center justify-end gap-4">
        <Link href="/" className="text-[#191C77] font-bold text-sm">
          Our Courses
        </Link>
        <LoginButton />
      </div>
    </div>
  );
}

export default Navbar;
