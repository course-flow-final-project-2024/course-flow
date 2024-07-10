import Image from "next/image";
import Button from "@/utils/button.jsx";

function CommonBottomSection() {
  return (
    <div className="w-full h-max bg-blueBottom-gradient flex flex-col py-12 px-4 gap-6 items-center ">
      <div className="w-full h-max flex flex-col items-center gap-6 min-h-32">
        <h3 className="text-center text-2xl text-white w-full">
          Want to start learning?
        </h3>
        <div className="w-full flex max-w-[250px] h-full ">
          <Button
            text="Register here"
            style="secondary"
            customStyle="font-bold p-5 border-[1px]"
          />
        </div>
      </div>

      <div className="overflow-hidden h-max">
        <Image
          src="bottom-section/bottom-teaching-vector.svg"
          width={328}
          height={298}
          className="w-full"
        />
      </div>
    </div>
  );
}
export default CommonBottomSection;
