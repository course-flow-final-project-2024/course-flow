import SecondBackgroundVectors from "./second-bg-vectors";
import SectionTwoBottomBox from "./second-section-bottom-box";
import SectionTwoTopBox from "./second-section-top-box";
import Image from "next/image";

function HomepageSecondSection() {
  return (
    <div className="relative w-full h-max flex ">
      <div className="flex flex-col px-4 py-16 gap-8 ">
        <SectionTwoTopBox />
        <SectionTwoBottomBox />
      </div>
      <SecondBackgroundVectors />
    </div>
  );
}

export default HomepageSecondSection;
