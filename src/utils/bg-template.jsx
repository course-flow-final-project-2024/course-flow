import Image from "next/image";
function BackgroundTemplate() {
  return (
    <div className="w-full h-[576px] sm:h-[840px] mt-5 relative">
      <Image
        src="/vector/login-page/Vector-8.svg"
        width={33}
        height={117}
        alt="vector-8"
        className="absolute z-10 top-0 md:top-[0%] right-0 min-[426px]:w-[90px] min-[426px]:h-[310px] md:w-[175px] md:h-[620px]  "
      />
      <Image
        src="/vector/login-page/Vector-9.svg"
        width={30}
        height={108}
        alt="vector-9"
        className="absolute z-10 bottom-0 left-0 md:left-[-2%] min-[426px]:w-[60px] min-[426px]:h-[210px] md:w-[115px] md:h-[420px] "
      />
      <Image
        src="/vector/login-page/Ellipse 4.svg"
        width={35}
        height={35}
        alt="ellipse-4"
        className="absolute z-10 top-[37%] sm:top-[60%] right-[1%] sm:right-[5%] scale-[0.3]  sm:scale-[1] "
      />
      <Image
        src="/vector/login-page/Group-5.svg"
        width={14}
        height={14}
        alt="vector-group-5"
        className="absolute z-10 sm:top-[290px] left-1 md:left-[190px]"
      />
      <Image
        src="/vector/login-page/Ellipse-5.svg"
        width={73}
        height={73}
        alt="ellipse-5"
        className="absolute z-10 top-[1%] sm:top-[200px] left-[-10%] md:left-[100px] scale-[0.5] sm:scale-[1]"
      />
    </div>
  );
}

export default BackgroundTemplate;
