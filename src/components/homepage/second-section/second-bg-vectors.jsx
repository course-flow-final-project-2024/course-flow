import Image from "next/image";

function SecondBackgroundVectors() {
  return (
    <>
      <Image
        src="/homepage/second-section-materials/circle-ellipse.svg"
        width={48}
        height={48}
        alt="circle-vector"
        className="absolute top-0 left-12"
      />
      <Image
        src="/homepage/second-section-materials/circle-ellipse-gray.svg"
        width={32}
        height={32}
        alt="circle-vector"
        className="absolute right-10 top-10"
      />
      <Image
        src="/homepage/second-section-materials/section-2-cross.svg"
        width={16}
        height={16}
        alt="cross-vector"
        className="absolute right-8 top-1/2"
      />
      <Image
        src="/homepage/second-section-materials/circle-ellipse-gray.svg"
        width={48}
        height={48}
        alt="cross-vector"
        className="absolute right-8 bottom-4"
      />
    </>
  );
}

export default SecondBackgroundVectors;
