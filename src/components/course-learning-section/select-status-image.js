import Image from "next/image";
export default function StatusImage(status) {
  switch (status) {
    case 1:
      return (
        <Image
          src="/vector/learning-page/Vector-done.svg"
          width={20}
          height={20}
          alt="vector-done"
        />
      );
    case 2:
      return (
        <div className="flex items-center justify-center relative">
          <Image
            src="/vector/learning-page/Ellipse-8.svg"
            width={20}
            height={20}
            alt="ellipse-8"
          />
          <Image
            src="/vector/learning-page/Ellipse-9.svg"
            width={10}
            height={10}
            alt="ellipse-9"
            className="absolute left-0"
          />
        </div>
      );
    case 3:
      return (
        <Image
          src="/vector/learning-page/Ellipse-8.svg"
          width={20}
          height={20}
          alt="ellipse-8"
        />
      );
    default:
      return;
  }
}
