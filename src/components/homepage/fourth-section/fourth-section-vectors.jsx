import Image from "next/image";

function FourthSectionVectors() {
  return (
    <>
      <Image
        src="homepage/fourth-section-materials/blue-circle.svg"
        width={33.75}
        height={33.75}
        alt="blue circle"
        className="absolute top-0 right-0"
      />
      <Image
        src="homepage/fourth-section-materials/gray-circle.svg"
        width={12}
        height={13}
        alt="gray circle"
        className="absolute top-16 right-10"
      />
      <Image
        src="homepage/fourth-section-materials/cross.svg"
        width={18}
        height={18}
        alt="cross"
        className="absolute bottom-14 left-10"
      />
    </>
  );
}

export default FourthSectionVectors;
