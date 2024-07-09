import Image from "next/image";

function BackgroundVectors() {
  return (
    <>
      <Image
        src="/homepage/first-section-materials/Ellipse.svg"
        width={104}
        height={104}
        className="absolute top-28 "
        alt="ellipse-vector"
      />
      <Image
        src="/homepage/first-section-materials/blueCurve.svg"
        width={682}
        height={541}
        className="absolute bottom-0"
        alt="curve-vector"
      />
      <Image
        src="/homepage/first-section-materials/computer.svg"
        width={317}
        height={314}
        className="absolute bottom-0 left-[50%] translate-x-[-50%]"
      />
    </>
  );
}

export default BackgroundVectors;
