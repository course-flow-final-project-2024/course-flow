import Image from "next/image";
import Link from "next/link";

function CommonFooter() {
  return (
    <div className="w-full h-max bg-[#183056] py-8 px-4 sm:px-12 ease-in-out duration-200 xl:px-40 xl:min-h-[240px] xl:flex xl:flex-col xl:justify-center">
      <div className="flex flex-col gap-8 xl:flex-row xl:justify-between ">
        <Image
          src="logo/CourseFlowLogo.svg"
          width={140}
          height={32}
          className="w-max "
        />
        <div className="w-max flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-16 ">
          <Link
            href="/"
            className="font-normal text-[#C8CCDB] text-base sm:text-xl ease-in-out duration-200 xl:text-base"
          >
            All Courses
          </Link>
          <Link
            href="/"
            className="font-normal text-[#C8CCDB] text-base sm:text-xl ease-in-out duration-200 xl:text-base"
          >
            Bundle package
          </Link>
        </div>
        <div className="w-full flex flex-row gap-4 xl:max-w-[230px] ">
          <Link href="/">
            <Image
              src="/bottom-section/fb-icon.svg"
              width={48}
              height={48}
              alt="facebook"
              className="sm:w-16 ease-in-out duration-200"
            />
          </Link>
          <Link href="/">
            <Image
              src="/bottom-section/ig-icon.svg"
              width={48}
              height={48}
              alt="instagram"
              className="sm:w-16 ease-in-out duration-200"
            />
          </Link>
          <Link href="/">
            <Image
              src="/bottom-section/tw-icon.svg"
              width={48}
              height={48}
              alt="twitter"
              className="sm:w-16 ease-in-out duration-200"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CommonFooter;