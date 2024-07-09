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

export default SectionTwoBoxFeatures;
