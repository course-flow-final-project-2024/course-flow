// import HomepageCarouselItem from "./fourth-section-carousel-item";
import Image from "next/image";

function HomepageCarouselItem(props) {
  return (
    <div className="carousel-item bg-[#E5ECF8] h-max w-[80%] max-w-sm overflow-y-visible rounded-lg py-2 relative">
      <div className="w-full p-6 flex flex-col overflow-y-visible">
        <Image
          src={props.carouselImage}
          width={248}
          height={298}
          alt="graduate"
          className="w-full -translate-y-10"
        />
        <div className="h-max w-full flex flex-col gap-2 -translate-y-4 overflow-y-visible">
          <span className="font-normal text-2xl text-start text-[#2F5FAC]">
            {props.graduateName}
          </span>
          <p className="font-normal text-sm text-gray-700">
            {props.graduateDescription}
          </p>
        </div>
        <Image
          src="homepage/fourth-section-materials/quotemarks-right.svg"
          width={40}
          height={30}
          className="absolute bottom-3 right-6"
          alt="quotation mark symbol"
        />
        <Image
          src="homepage/fourth-section-materials/quotemarks-right.svg"
          width={44}
          height={34}
          className="absolute -top-7 left-12 rotate-180"
          alt="quotation mark symbol"
        />
      </div>
    </div>
  );
}

function FourthSectionCarousel() {
  return (
    <div className="carousel carousel-center bg-white max-w-full space-x-4 py-7 ">
      <HomepageCarouselItem
        carouselImage="homepage/fourth-section-materials/graduates-1.svg"
        graduateName="Saiful Islam"
        graduateDescription="Start with something simple and small, then expand over time. If people call it a ‘toy’ you’re definitely onto something.
        If you’re waiting for encouragement from others, you’re doing it wrong. By the time people think an idea is good, it’s probably too late."
      />
      <HomepageCarouselItem
        carouselImage="homepage/fourth-section-materials/graduates-1.svg"
        graduateName="Saiful Islam"
        graduateDescription="Start with something simple and small, then expand over time. If people call it a ‘toy’ you’re definitely onto something.
        If you’re waiting for encouragement from others, you’re doing it wrong. By the time people think an idea is good, it’s probably too late."
      />
      <HomepageCarouselItem
        carouselImage="homepage/fourth-section-materials/graduates-1.svg"
        graduateName="Saiful Islam"
        graduateDescription="Start with something simple and small, then expand over time. If people call it a ‘toy’ you’re definitely onto something.
        If you’re waiting for encouragement from others, you’re doing it wrong. By the time people think an idea is good, it’s probably too late."
      />
      <HomepageCarouselItem
        carouselImage="homepage/fourth-section-materials/graduates-1.svg"
        graduateName="Saiful Islam"
        graduateDescription="Start with something simple and small, then expand over time. If people call it a ‘toy’ you’re definitely onto something.
        If you’re waiting for encouragement from others, you’re doing it wrong. By the time people think an idea is good, it’s probably too late."
      />
      <HomepageCarouselItem
        carouselImage="homepage/fourth-section-materials/graduates-1.svg"
        graduateName="Saiful Islam"
        graduateDescription="Start with something simple and small, then expand over time. If people call it a ‘toy’ you’re definitely onto something.
        If you’re waiting for encouragement from others, you’re doing it wrong. By the time people think an idea is good, it’s probably too late."
      />
      <HomepageCarouselItem
        carouselImage="homepage/fourth-section-materials/graduates-1.svg"
        graduateName="Saiful Islam"
        graduateDescription="Start with something simple and small, then expand over time. If people call it a ‘toy’ you’re definitely onto something.
        If you’re waiting for encouragement from others, you’re doing it wrong. By the time people think an idea is good, it’s probably too late."
      />
    </div>
  );
}

export default FourthSectionCarousel;
