"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "@/components/navbar/navbar";
import CommonFooter from "@/components/footer/common-footer";
import PageDecoration from "@/components/courses/page-decoration";
import Image from "next/image";
import Button from "@/utils/button";
import commaNumber from "comma-number";

const PaymentSuccess = () => {
  const router = useRouter();
  const {
    payment_intent,
    redirect_status,
    amount,
    time,
    courseId,
    courseTitle,
  } = router.query;
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
          router.push(`/my-course/`);
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
      <div className="mt-4">
        <PageDecoration />
      </div>
      <div className="w-full h-max px-12 pb-36 max-sm:px-8 min-h-[860px] flex justify-center items-center overflow-scroll ">
        {actionStatus === "completed" ? (
          <div className="flex flex-col gap-6 items-center ">
            <div className="flex flex-col items-center gap-5 ">
              <Image
                src="/course-detail/check-circle.svg"
                width={80}
                height={80}
                alt="green check"
              />
              <h1 className="text-lg font-bold lg:text-2xl">
                Payment Successful
              </h1>
              <p className="text-lg lg:text-xl">Thank you for your purchase</p>
              <p className="text-lg lg:text-xl text-center">
                <span className="font-semibold">{courseTitle}</span> has been
                added to your course list
              </p>
            </div>
            <div className="w-full border-b-[1px] border-base "></div>
            <div className="w-full h-max  flex flex-col bg-white gap-4 ">
              <div className="w-full flex  rounded-xl p-2 ">
                <div className="w-full h-max  flex flex-col border-red-500 gap-3 text-base max-sm:text-sm">
                  <div className="w-full flex justify-between gap-2 ">
                    <p className="text-left text-nowrap">Course Title:</p>
                    <p className="text-right font-semibold">{courseTitle}</p>
                  </div>
                  <div className="w-full flex justify-between gap-2 ">
                    <p className="text-left">Amount Paid:</p>
                    <p className="text-right font-semibold">
                      ฿{commaNumber(amount)}
                    </p>
                  </div>
                  <div className="w-full flex justify-between gap-2 ">
                    <p className="text-left ">Date & Time:</p>
                    <p className="text-right font-semibold">{time}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex mt-8 ">
              <Button
                style="primary"
                text={`Go to my course`}
                customStyle="leading-5 "
                onClick={() => {
                  router.push(`/my-course`);
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
            <p className="text-5xl font-semibold text-black max-sm:text-xl max-md:text-3xl text-center">
              Oops! Something went wrong
            </p>
            <p className="text-xl  max-sm:text-sm max-md:text-lg font-normal text-black text-center">
              An error occured while processing your request. Please try again
              later
            </p>

            <div className="w-full flex">
              <Button
                style="primary"
                text={`Back to Homepage`}
                customStyle="leading-5 "
                onClick={() => {
                  router.push(`/`);
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
