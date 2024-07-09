import SecondBackgroundVectors from "./second-bg-vectors";
import SectionTwoBox from "./second-section-box";

function HomepageSecondSection() {
  let featureDescription =
    "Duis aute irure dolor in reprehenderit in voluptate velit es se cillum dolore eu fugiat nulla pariatur. Excepteur sint.";
  return (
    <div className="relative w-full h-max flex ">
      <div className="flex flex-col px-4 py-16 gap-8 ">
        <SectionTwoBox
          boxTitle="Learning experience has been enhanced with new technologies"
          featureBanner="homepage/second-section-materials/section-2-banner.svg"
          topBoxTitle="Secure & Easy"
          topImageUrl="homepage/second-section-materials/section-2-checked.svg"
          bottomBoxTitle="Supports All Students"
          bottomImageUrl="homepage/second-section-materials/section-2-heart.svg"
          featureDescription={featureDescription}
        />
        <SectionTwoBox
          boxTitle="Interactions between the tutor and the learners"
          featureBanner="homepage/second-section-materials/section-2-banner-bottom.svg"
          topBoxTitle="Purely Collaborative"
          topImageUrl="homepage/second-section-materials/section-2-collab.svg"
          bottomBoxTitle="Supports All Students"
          bottomImageUrl="homepage/second-section-materials/section-2-heart.svg"
          featureDescription={featureDescription}
        />
      </div>
      <SecondBackgroundVectors />
    </div>
  );
}

export default HomepageSecondSection;
