import Image from "next/image";

function BackgroundVectors() {
  return (
    <>
      <Image
        src="/homepage/first-section-materials/Ellipse.svg"
        width={104}
        height={104}
        className="absolute top-28 sm:scale-50 sm:-left-10 sm:top-14 ease-in-out duration-200 "
        alt="ellipse-vector"
      />
      <Image
        src="/homepage/first-section-materials/blueCurve.svg"
        width={682}
        height={541}
        className="absolute scale-[1.4] bottom-10 right-10 sm:scale-[2.3] sm:bottom-28 sm:right-[15vw] "
        alt="curve-vector"
      />
      <Image
        src="/homepage/first-section-materials/computer.svg"
        width={317}
        height={314}
        className="absolute bottom-5 right-[5%] sm:scale-[1.2] sm:bottom-16 sm:right-[12%] ease-in-out duration-200 lg:scale-[1.4] lg:bottom-28 "
      />
    </>
  );
}

export default BackgroundVectors;
