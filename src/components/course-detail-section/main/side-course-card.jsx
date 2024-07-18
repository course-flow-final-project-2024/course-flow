import PaymentCard from "@/components/payment/payment-card";
import Link from "next/link";

function SideCourseCard({ courseData }) {
  const calculatePriceWithComma = (price) => {
    const priceStr = (price * 36).toString();
    if (priceStr.length > 2) {
      return priceStr.slice(0, 1) + "," + priceStr.slice(1);
    }
    return priceStr;
  };

  const calculatedPrice =
    courseData.length > 0 && calculatePriceWithComma(courseData[0].price);

  return (
    <div className="w-full h-max shadow-lg py-8 px-6 flex flex-col gap-6 rounded-lg sticky top-10 ">
      <div className="w-full text-sm text-[#F47E20]">Course</div>
      <div className="w-full flex flex-col gap-2">
        <h3 className="font-medium md:text-xl xl:text-2xl text-black">
          {courseData.length > 0 && courseData[0].course_name}
        </h3>
        <span className="text-[#646D89] md:text-sm xl:text-base ">
          {courseData.length > 0 && courseData[0].summary}
        </span>
      </div>
      <h3 className="w-full h-max font-medium md:text-xl xl:text-2xl text-[#646D89]">
        THB {calculatedPrice}
      </h3>
      <div className="border-t-[1px] flex flex-col gap-4 pt-8">
        <Link
          href="/login"
          className="h-max py-4 rounded-xl bg-white text-[#F47E20]  border-[1px] border-orange-500 active:bg-gray-100 hover:text-[#FBAA1C] hover:border-[#FBAA1C] focus:ring-2 ring-violet-300   text-sm font-bold ease-in-out duration-200 text-center"
        >
          Get in Desire Course
        </Link>
        <Link
          href="/login"
          className="h-[max] py-4 rounded-xl bg-[#2F5FAC] text-white active:bg-[#183056] hover:bg-[#5483D0] focus:ring-2 ring-violet-300 text-sm font-bold ease-in-out duration-200 text-center"
        >
          Subscribe This Course
        </Link>
        <PaymentCard />
      </div>
    </div>
  );
}

export default SideCourseCard;
