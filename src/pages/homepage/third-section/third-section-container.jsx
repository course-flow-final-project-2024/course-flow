import SectionThreeBox from "./third-section-box";
import ThirdSectionVector from "./third-bg-vector";

function HomepageThirdSection() {
  return (
    <div className="h-max w-full py-16 px-4 relative">
      <div className=" relative flex flex-col gap-8 z-10">
        <h3 className="font-medium text-2xl block text-center ">
          Our Professional Instructors
        </h3>
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
      <ThirdSectionVector />
    </div>
  );
}

export default HomepageThirdSection;
