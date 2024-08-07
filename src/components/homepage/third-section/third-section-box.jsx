import Image from "next/image";

function SectionThreeBox(props) {
  return (
    <div className="w-full h-full flex flex-col gap-2 lg:w-full ">
      <div className="w-full h-max object-cover flex flex-col items-center ">
        <Image
          src={props.imageUrl}
          width={399}
          height={403.53}
          className="w-full"
          alt="Instructor Image"
        />
      </div>
      <div className="flex flex-col lg">
        <p className="text-xl text-black block text-center sm:text-xl xl:text-2xl ease-in-out duration-200">
          {props.instructorName}
        </p>
        <p className="text-blueRole block text-center sm:text-base xl:text-lg  ease-in-out duration-200">
          {props.role}
        </p>
      </div>
    </div>
  );
}

export default SectionThreeBox;
