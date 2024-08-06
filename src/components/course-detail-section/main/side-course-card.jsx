import { useContext } from "react";
import { CourseDetailContext } from "@/pages/courses/[courseId]";
import CourseCardAddAndRemove from "../buttons-and-modal/buttons";
import PaymentModal from "../payment/checkout-modal";

function SideCourseCard() {
  const context = useContext(CourseDetailContext);
  const courseData = context.courseData;

  return (
    <div className="w-full h-max shadow-lg pt-8 pb-2 px-6 flex flex-col gap-6 rounded-lg sticky top-10 ">
      <div className="w-full text-sm text-[#F47E20]">Course</div>
      <div className="w-full flex flex-col gap-2">
        <h3 className="font-medium md:text-xl xl:text-2xl text-black">
          {courseData.length > 0 ? (
            courseData[0].course_name
          ) : (
            <span className="loading loading-dots loading-lg"></span>
          )}
        </h3>
        <span className="text-[#646D89] md:text-sm xl:text-base ">
          {courseData.length > 0 && courseData[0].summary}
        </span>
      </div>
      <h3
        className={
          context.userCourseStatus === "bought"
            ? "hidden"
            : "w-full h-max font-medium md:text-xl xl:text-2xl text-[#646D89]"
        }
      >
        THB {context.formattedPrice}
      </h3>
      <div className="border-t-[1px] flex flex-col gap-4 "></div>
      <CourseCardAddAndRemove customStyle="leading-5" />
      <PaymentModal />
    </div>
  );
}

export default SideCourseCard;
