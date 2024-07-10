import FourthSectionCarousel from "./fourth-section-carousel";
import FourthSectionvectors from "./fourth-section-vectors";

function HomepageFourthSection() {
  return (
    <div className="w-full h-max pt-6 pb-16 relative">
      <div className="w-full h-full flex flex-col items-center gap-8">
        <h3 className="text-3xl font-medium text-center">Our Graduates</h3>
        <div className="py-2 w-full h-max">
          <FourthSectionCarousel />
        </div>
      </div>
      <FourthSectionvectors />
    </div>
  );
}

export default HomepageFourthSection;
