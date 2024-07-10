import Image from "next/image";

function SectionTwoBoxFeatures(props) {
  return (
    <div className="flex flex-row w-auto h-max">
      <div className="w-14">
        <Image src={props.imageUrl} width={36} height={36} alt="Feature Icon" />
      </div>
      <div className="w-full flex flex-col gap-2">
        <span className="text-xl font-normal text-left">
          {props.featureTitle}
        </span>
        <span className="text-sm font-normal text-left text-gray-700">
          {props.featureDescription}
        </span>
      </div>
    </div>
  );
}

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
