import SecondBackgroundVectors from "./second-bg-vectors";
import SectionTwoBox from "./second-section-box";

function HomepageSecondSection() {
  let featureDescription =
    "Duis aute irure dolor in reprehenderit in voluptate velit es se cillum dolore eu fugiat nulla pariatur. Excepteur sint.";
  return (
    <div className="relative w-full h-max flex sm:flex-col ">
      <div className="flex flex-col px-4 py-16 gap-8 sm:px-20 ease-in-out duration-200 lg:px-40 lg:gap-24 min-[1800px]:px-96 ">
        <SectionTwoBox
          boxTitle="Learning experience has been enhanced with new technologies"
          featureBanner="homepage/second-section-materials/section-2-banner.svg"
          topBoxTitle="Secure & Easy"
          topImageUrl="homepage/second-section-materials/section-2-checked.svg"
          bottomBoxTitle="Supports All Students"
          bottomImageUrl="homepage/second-section-materials/section-2-heart.svg"
          featureDescription={featureDescription}
          style="w-full h-auto object-cover z-10 lg:w-max xl:max-w-[454px] min-[1700px]:w-full min-[1700px]:h-[300px]"
        />
        <SectionTwoBox
          boxTitle="Interactions between the tutor and the learners"
          featureBanner="homepage/second-section-materials/section-2-banner-bottom.svg"
          topBoxTitle="Purely Collaborative"
          topImageUrl="homepage/second-section-materials/section-2-collab.svg"
          bottomBoxTitle="Supports All Students"
          bottomImageUrl="homepage/second-section-materials/section-2-heart.svg"
          featureDescription={featureDescription}
          style="w-full h-auto object-cover z-10 lg:w-max xl:max-w-[454px] min-[1700px]:w-[full] min-[1700px]:h-[300px] lg:order-2"
        />
      </div>
      <SecondBackgroundVectors />
    </div>
  );
}

export default HomepageSecondSection;
