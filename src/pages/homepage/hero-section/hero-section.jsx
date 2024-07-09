import AllCoursesButton from "./all-courses-button";
import BackgroundVectors from "./background-vectors";

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
