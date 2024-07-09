import Image from "next/image";

function SectionTwoTopBox() {
  return (
    <div className="h-max w-full flex flex-col gap-8">
      <div className="w-full h-auto object-cover z-10">
        <Image
          src="/homepage/second-section-materials/section-2-banner.svg"
          width={343}
          height={249.32}
          className="w-full"
          alt="banner"
        />
      </div>
      <div className="flex flex-col gap-8">
        <span className="text-2xl font-medium">
          Learning experience has been enahnced with new technologies
        </span>
        <div className="flex flex-row w-auto h-max">
          <div className="w-14">
            <Image
              src="homepage/second-section-materials/section-2-checked.svg"
              width={36}
              height={36}
              alt="checked-icon"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className="text-xl font-normal text-left">Secure & Easy</span>
            <span className="text-sm font-normal text-left text-gray-700">
              Duis aute irure dolor in reprehenderit in voluptate velit es se
              cillum dolore eu fugiat nulla pariatur. Excepteur sint.
            </span>
          </div>
        </div>
        <div className=" flex flex-row w-auto h-max">
          <div className="w-14">
            <Image
              src="homepage/second-section-materials/section-2-heart.svg"
              width={36}
              height={36}
              alt="heart-icon"
            />
          </div>
          <div className="w-full flex flex-col gap-2">
            <span className="text-xl font-normal text-left">
              Supports All Students
            </span>
            <span className="text-sm font-normal text-left text-gray-700">
              Duis aute irure dolor in reprehenderit in voluptate velit es se
              cillum dolore eu fugiat nulla pariatur. Excepteur sint.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionTwoTopBox;
