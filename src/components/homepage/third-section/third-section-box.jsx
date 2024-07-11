import Image from "next/image";

function SectionThreeBox(props) {
  return (
    <div className="w-full h-max flex flex-col gap-1 lg:w-max">
      <div className="w-full h-auto object-fit flex flex-col items-center">
        <Image
          src={props.imageUrl}
          width={343}
          height={403.53}
          className="w-full max-w-[450px]"
          alt="Instructor Image"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-xl text-black block text-center sm:text-2xl ease-in-out duration-200">
          {props.instructorName}
        </p>
        <p className="text-blueRole block text-center sm:text-lg ease-in-out duration-200">
          {props.role}
        </p>
      </div>
    </div>
  );
}

export default SectionThreeBox;
