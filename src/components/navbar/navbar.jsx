import Image from "next/image";
import Link from "next/link";
import LoginButton from "./login-button.jsx";

function Navbar() {
  return (
    <div className="w-full h-14 bg-white flex justify-between shadow-md px-4 ease-in-out duration-200 sm:px-16 xl:px-40 lg:h-[88px] min-[1800px]:px-96">
      <Image
        src="/logo/CourseFlowLogo.svg"
        width={117}
        height={13.37}
        alt="website-logo"
        className="lg:w-[140px] ease-in-out duration-200"
      />
      <div className=" h-full w-3/6 flex items-center justify-end gap-4 lg:gap-8">
        <Link
          href="/"
          className="text-[#191C77] font-bold text-sm lg:text-base"
        >
          Our Courses
        </Link>
        <LoginButton />
      </div>
    </div>
  );
}

export default Navbar;
