import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar/navbar";
import CommonFooter from "@/components/footer/common-footer";
import PageDecoration from "@/components/courses/page-decoration";
import Image from "next/image";
import Button from "@/utils/button";

const PaymentSuccess = () => {
  const router = useRouter();
  const { payment_intent, redirect_status, courseId, courseTitle } =
    router.query;
  const [actionStatus, setActionStatus] = useState(null);

  useEffect(() => {
    const verifyPaymentAndPostCourse = async () => {
      try {
        const response = await axios.post(
          "/api/courses_detail/payment/verify-payment",
          {
            payment_intent,
          }
        );

        if (
          response.data.status === "added" ||
          response.data.status === "updated"
        ) {
          setActionStatus("completed");
        } else if (response.data.status === "owned") {
          setActionStatus("none");
          router.push(`/my-courses/`);
        }
      } catch (error) {
        console.error("Error verifying payment", error);
        setActionStatus("error");
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
      <div className="w-full h-max px-12 max-sm:px-8 min-h-[860px] flex justify-center items-center ">
        {actionStatus === "completed" ? (
          <div className="flex flex-col gap-8 lg:gap-12 items-center">
            <Image
              src="/course-detail/check-circle.svg"
              width={80}
              height={80}
              alt="green check"
            />
            <h1 className="text-lg font-bold lg:text-2xl">
              Payment Successful
            </h1>
            <p className="text-lg lg:text-2xl">Thank you for your purchase</p>
            <p className="text-lg lg:text-2xl">
              <span className="font-bold text-center">{courseTitle}</span> has
              been added to your course list
            </p>
            <div className="w-full flex gap-8 max-sm:gap-4 max-sm:flex-col ">
              <Button
                style="primary"
                text={`Go to my course`}
                customStyle="leading-5 "
                onClick={() => {
                  router.push(`/my-course`);
                }}
              />
              <Button
                style="secondary"
                text={`Browse more courses`}
                customStyle="leading-5 "
                onClick={() => {
                  router.push(`/courses`);
                }}
              />
            </div>
          </div>
        ) : actionStatus === "none" ? (
          <div className="flex flex-col gap-8 lg:gap-12 items-center">
            <p className="text-2xl font-semibold">Redirecting</p>
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : actionStatus === "error" ? (
          <div className="flex flex-col gap-8 lg:gap-12 items-center">
            <Image
              src="/course-detail/error-icon.svg"
              width={80}
              height={80}
              alt="error"
            />
            <p className="text-5xl font-semibold text-black max-sm:text-xl max-md:text-3xl">
              Oops! Something went wrong
            </p>
            <p className="text-xl  max-sm:text-sm max-md:text-lg font-normal text-black">
              An error occured while processing your request. Please try again
              later
            </p>

            <div className="w-full flex  ">
              <Button
                style="primary"
                text={`Back to course detail`}
                customStyle="leading-5 "
                onClick={() => {
                  router.push(`/courses/${courseId}`);
                }}
              />
            </div>
          </div>
        ) : null}
      </div>

      <CommonFooter />
    </>
  );
};

export default PaymentSuccess;
