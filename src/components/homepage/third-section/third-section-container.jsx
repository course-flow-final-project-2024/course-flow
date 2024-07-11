import SectionThreeBox from "./third-section-box";
import ThirdSectionVector from "./third-bg-vector";

function HomepageThirdSection() {
  return (
    <div className="h-max w-full py-16 px-4 relative lg:px-40">
      <div className=" relative flex flex-col gap-12 z-10">
        <h3 className="font-medium text-2xl block text-center sm:text-3xl ease-in-out duration-200 ">
          Our Professional Instructors
        </h3>
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-4 lg:justify-center min-[1700px]:gap-32 ease-in-out duration-500">
          <SectionThreeBox
            instructorName="Jane Cooper"
            role="UX/UI Designer"
            imageUrl="homepage/third-section-materials/top-instructor-2.svg"
          />
          <SectionThreeBox
            instructorName="Ester Howard"
            role="Program Manager"
            imageUrl="homepage/third-section-materials/middle-instructor.svg"
          />
          <SectionThreeBox
            instructorName="Brooklyn Simmons"
            role="Software Engineer"
            imageUrl="homepage/third-section-materials/bottom-instructor.svg"
          />
        </div>
      </div>
      <ThirdSectionVector />
    </div>
  );
}

export default HomepageThirdSection;
