import BackgroundVectors from "./background-vectors";
import Link from "next/link";

function AllCoursesButton() {
  return (
    <Link
      href="/"
      className="h-16 broder-2 border-black bg-blueButton px-8 py-4 rounded-2xl text-white font-bold flex items-center "
    >
      Explore Courses
    </Link>
  );
}

function HeroSection() {
  return (
    <div>
      <div className="w-full px-4 h-max relative left-[50%] translate-x-[-50%] top-10 z-10 flex flex-col items-start gap-5  ">
        <div className="w-full text-4xl leading-10 text-black ">
          <h2 className="block font-medium">Best Virtual Classroom Software</h2>
        </div>
        <span className="text-gray-700">
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
