import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar/navbar";
import CommonBottomSection from "@/components/bottom-section/common-bottom-section";
import CommonFooter from "@/components/footer/common-footer";
import PageDecoration from "@/components/courses/page-decoration";
import Image from "next/image";
import Button from "@/utils/button";

const PaymentSuccess = () => {
  const router = useRouter();
  const { payment_intent, redirect_status, courseId, courseTitle } =
    router.query;

  useEffect(() => {
    const verifyPaymentAndPostCourse = async () => {
      try {
        await axios.post("/api/courses_detail/payment/verify-payment", {
          payment_intent,
        });
      } catch (error) {
        console.error("Error verifying payment", error);
      }
    };

    if (payment_intent && courseId && redirect_status === "succeeded") {
      verifyPaymentAndPostCourse();
    }
  }, [payment_intent, courseId, redirect_status]);

  return (
    <>
      <Navbar />
      <PageDecoration />
      <div className="w-full h-max px-12 max-sm:px-4 min-h-[600px] xl:min-h-[860px] flex justify-center items-center ">
        <div className="flex flex-col gap-8 lg:gap-12 items-center">
          <Image src="/course-detail/check-circle.svg" width={80} height={80} />
          <h1 className="text-lg font-bold lg:text-2xl">Payment Successful</h1>
          <p className="text-lg lg:text-2xl">Thank you for your purchase</p>
          <p className="text-lg lg:text-2xl">
            <span className="font-bold">{courseTitle}</span> has been added to
            your course list
          </p>
          <div className="w-full flex gap-8 max-sm:gap-2">
            <Button
              style="primary"
              text={`Go to learning page`}
              customStyle="leading-5 max-[400px]:text-sm"
              onClick={() => {
                router.push(`/courses/${courseId}/learning`);
              }}
            />
            <Button
              style="secondary"
              text={`Browse more courses`}
              customStyle="leading-5 max-[400px]:text-sm"
              onClick={() => {
                router.push(`/courses/`);
              }}
            />
          </div>
        </div>
      </div>

      <CommonFooter />
    </>
  );
};

export default PaymentSuccess;
