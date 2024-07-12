import Image from "next/image";
import Link from "next/link";

function CommonFooter() {
  return (
    <div className="w-full h-max bg-[#183056] py-8 px-4 sm:px-12 ease-in-out duration-200 xl:px-40 xl:min-h-[240px] xl:flex xl:flex-col xl:justify-center min-[1800px]:px-96">
      <div className="flex flex-col gap-8 xl:flex-row xl:justify-between xl:items-center ">
        <Link
          href="/"
          className="w-max h-max hover:scale-110 ease-in-out duration-200 hover"
        >
          <Image
            src="logo/CourseFlowLogo.svg"
            width={140}
            height={32}
            className="w-max "
            alt="website logo"
          />
        </Link>
        <div className="w-max flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-16 ">
          <Link
            href="/courses"
            className="font-normal text-[#C8CCDB] text-base sm:text-xl ease-in-out hover:text-[#F47E20] duration-200 xl:text-base"
          >
            All Courses
          </Link>
          <Link
            href="/courses"
            className="font-normal text-[#C8CCDB] text-base sm:text-xl ease-in-out hover:text-[#F47E20] duration-200 xl:text-base"
          >
            Bundle package
          </Link>
        </div>
        <div className="w-full flex flex-row gap-4 xl:max-w-[230px] ">
          <Link href="https://www.facebook.com" target="_blank">
            <Image
              src="/bottom-section/fb-icon.svg"
              width={48}
              height={48}
              alt="facebook"
              className="sm:w-16 ease-in-out duration-200 hover:scale-105"
            />
          </Link>
          <Link href="https://www.instagram.com" target="_blank">
            <Image
              src="/bottom-section/ig-icon.svg"
              width={48}
              height={48}
              alt="instagram"
              className="sm:w-16 ease-in-out duration-200 hover:scale-105"
            />
          </Link>
          <Link href="https://www.x.com" target="_blank">
            <Image
              src="/bottom-section/tw-icon.svg"
              width={48}
              height={48}
              alt="twitter"
              className="sm:w-16 ease-in-out duration-200 hover:scale-105"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CommonFooter;
