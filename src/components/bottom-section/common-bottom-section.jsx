import Image from "next/image";
import Button from "@/utils/button.jsx";

function CommonBottomSection() {
  return (
    <div className="w-full h-max bg-blueBottom-gradient flex flex-col py-12 px-4 gap-6 items-center xl:flex-row xl:min-h-[500px] xl:justify-between xl:px-40 overflow-hidden min-[1800px]:px-96  ">
      <div className="w-max h-max flex flex-col items-center gap-6 min-h-32 xl:self-start xl:mt-16 xl:items-start xl:gap-10">
        <h3 className="text-center text-2xl text-white w-full sm:text-3xl ease-in-out duration-200 xl:text-5xl">
          Want to start learning?
        </h3>
        <div className="w-full flex max-w-[250px] h-full ease-in-out duration-200 sm:max-w-[400px] ">
          <Button
            text="Register here"
            style="secondary"
            customStyle="font-bold p-3 border-[1px] sm:text-xl ease-in-out duration-200 xl:py-4 xl:max-w-[250px] xl:text-base ease-in-out duration-200"
          />
        </div>
      </div>

      <div className="h-full w-max xl:flex xl:flex-col relative ">
        <Image
          src="bottom-section/bottom-teaching-vector.svg"
          width={328}
          height={298}
          className="w-full sm:scale-110 ease-in-out duration-200 xl:scale-[1.8] relative xl:-bottom-20 xl:right-16 "
          alt="lecturers"
        />
      </div>
    </div>
  );
}
export default CommonBottomSection;
