import Image from "next/image";

function SectionTwoBoxFeatures(props) {
  return (
    <div className="flex flex-row w-auto h-max ">
      <div className="w-14">
        <Image src={props.imageUrl} width={36} height={36} alt="Feature Icon" />
      </div>
      <div className="w-full flex flex-col gap-2 lg:gap-0 ">
        <span className="text-xl font-normal text-left xl:text-2xl min-[1800px]:text-3xl  ">
          {props.featureTitle}
        </span>
        <span className="text-sm font-normal text-left text-gray-700 xl:text-base min-[1800px]:text-xl  ">
          {props.featureDescription}
        </span>
      </div>
    </div>
  );
}

function SectionTwoBox(props) {
  return (
    <div className="h-full w-full flex flex-col gap-8 lg:flex-row lg:justify-between">
      <div className={props.style}>
        <Image
          src={props.featureBanner}
          width={343}
          height={249.32}
          className="w-full h-full object-cover rounded-xl"
          alt="banner"
        />
      </div>
      <div className="flex flex-col gap-8 lg:justify-between lg:gap-4 lg:w-1/2 ">
        <h3 className="text-2xl font-medium xl:text-3xl ease-in-out duration-200 min-[1800px]:text-3xl  ">
          {props.boxTitle}
        </h3>
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
