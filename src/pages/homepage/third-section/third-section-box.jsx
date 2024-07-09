import Image from "next/image";

function SectionThreeBox(props) {
  return (
    <div className="w-full h-max flex flex-col gap-1">
      <div className="w-full h-auto object-fit">
        <Image
          src={props.imageUrl}
          width={343}
          height={403.53}
          className="w-full"
          alt="Instructor Image"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-xl text-black block text-center">
          {props.instructorName}
        </p>
        <p className="text-blueRole block text-center">{props.role}</p>
      </div>
    </div>
  );
}

export default SectionThreeBox;
