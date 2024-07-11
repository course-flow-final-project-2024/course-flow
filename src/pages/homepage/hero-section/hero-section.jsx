import BackgroundVectors from "./background-vectors";
import Link from "next/link";

function AllCoursesButton() {
  return (
    <Link
      href="/"
      className="h-16 broder-2 border-black bg-blueButton px-8 py-4 rounded-2xl text-white font-bold flex items-center sm:text-base "
    >
      Explore Courses
    </Link>
  );
}

function HeroSection() {
  return (
    <div className="w-full h-[704px] flex flex-col lg:justify-center pt-[9%] lg:pt-0 ">
      <div className="w-full px-4 h-max z-10 flex flex-col items-start gap-5 ease-in-out duration-200 sm:px-16 lg:w-8/12  lg:gap-14 lg:px-40 ">
        <div className="w-full text-4xl leading-10 text-black ">
          <h2 className="block font-medium sm:text-5xl ease-in-out duration-200 lg:text-[66px]">
            Best Virtual Classroom Software
          </h2>
        </div>
        <span className="text-gray-700 sm:text-xl ease-in-out duration-200">
          Welcome to Schooler! The one-stop online class management system that
          caters to all your educational needs!
        </span>
        <AllCoursesButton />
      </div>
      <BackgroundVectors />
    </div>
  );
}

export default HeroSection;
