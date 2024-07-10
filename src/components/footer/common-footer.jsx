import Image from "next/image";
import Link from "next/link";

function CommonFooter() {
  return (
    <div className="w-full h-max bg-[#183056] py-8 px-4">
      <div className="flex flex-col gap-8">
        <Image src="logo/CourseFlowLogo.svg" width={140} height={32} />
        <div className="w-full flex flex-col gap-4">
          <Link href="/" className="font-normal text-[#C8CCDB] text-base">
            All Courses
          </Link>
          <Link href="/" className="font-normal text-[#C8CCDB] text-base">
            Bundle package
          </Link>
        </div>
        <div className="w-full flex flex-row gap-4">
          <Link href="/">
            <Image
              src="/bottom-section/fb-icon.svg"
              width={48}
              height={48}
              alt="facebook"
            />
          </Link>
          <Link href="/">
            <Image
              src="/bottom-section/ig-icon.svg"
              width={48}
              height={48}
              alt="instagram"
            />
          </Link>
          <Link href="/">
            <Image
              src="/bottom-section/tw-icon.svg"
              width={48}
              height={48}
              alt="twitter"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CommonFooter;
