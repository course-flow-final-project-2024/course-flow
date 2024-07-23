import Image from "next/image";

export default function PageDecoration() {
  return (
    <div className=" absolute w-full sm:h-[190px] h-[157px] overflow-hidden z-0">
      <Image
        src="/icons/dec-blue-circle.svg"
        alt="dec-blue-circle icon"
        width={27}
        height={27}
        className=" absolute sm:w-[27px] sm:h-[27px] w-[21px] h-[21px] sm:top-[60px] top-[50px] left-[-10px]"
      />
      <Image
        src="/icons/dec-darkblue-circle.svg"
        alt="dec-darkblue-circle icon"
        width={11}
        height={11}
        className="absolute sm:w-[11px] sm:h-[11px] w-[9px] h-[9px] sm:left-[60px] left-[35px]"
      />
      <Image
        src="/icons/dec-green-cross.svg"
        alt="dec-green-cross icon"
        width={14}
        height={14}
        className="absolute sm:w-[14px] sm:h-[14px] w-[11px] h-[11px] sm:left-[237px] sm:bottom-[51px] left-[65px] bottom-[5px]"
      />
      <Image
        src="/icons/dec-orange-triangle.svg"
        alt="dec-orange-triangle icon"
        width={51}
        height={51}
        className="absolute sm:w-[51px] sm:h-[51px] w-[39px] h-[39px] sm:top-[26px] sm:right-[200px] top-[10px] right-[50px] "
      />
      <Image
        src="/icons/dec-blue-circle.svg"
        alt="dec-blue-circle icon"
        width={74}
        height={74}
        className="absolute sm:w-[74px] sm:h-[74px] w-[36px] h-[36px] sm:right-[-20px] right-[-8px] bottom-0"
      />
    </div>
  );
}
