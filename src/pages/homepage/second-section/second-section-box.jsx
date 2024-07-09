import Image from "next/image";
import SectionTwoBoxFeatures from "./second-section-box-features";

function SectionTwoBox(props) {
  return (
    <div className="h-max w-full flex flex-col gap-8">
      <div className="w-full h-auto object-cover z-10">
        <Image
          src={props.featureBanner}
          width={343}
          height={249.32}
          className="w-full"
          alt="banner"
        />
      </div>
      <div className="flex flex-col gap-8">
        <h3 className="text-2xl font-medium">{props.boxTitle}</h3>
        <SectionTwoBoxFeatures
          featureTitle={props.topBoxTitle}
          imageUrl={props.topImageUrl}
          featureDescription={props.featureDescription}
        />
        <SectionTwoBoxFeatures
          featureTitle={props.bottomBoxTitle}
          imageUrl={props.bottomImageUrl}
          featureDescription={props.featureDescription}
        />
      </div>
    </div>
  );
}

export default SectionTwoBox;
