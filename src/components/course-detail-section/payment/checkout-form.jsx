"use client";

import React, { useState, useContext } from "react";
import axios from "axios";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/utils/convertToSubcurrency";
import { CourseDetailContext } from "@/pages/courses/[courseId]";
import commaNumber from "comma-number";
import Button from "@/utils/button";
import Image from "next/image";

function CheckoutForm({ amount }) {
  const context = useContext(CourseDetailContext);
  const courseId = context.courseId;
  const courseTitle = context.courseData[0].course_name;
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const getClientSecret = async () => {
      if (courseId) {
        try {
          const response = await axios.post(
            "/api/stripe-payment/create-payment-intent",
            {
              amount: convertToSubcurrency(amount),
              courseId,
            }
          );

          const clientSecret = response.data.clientSecret;

          if (!stripe || !elements) {
            setErrorMessage("Payment processing is currently unavailable.");
            setIsLoading(false);
            return;
          }

          const { error: submitError } = await elements.submit();

          if (submitError) {
            setErrorMessage(submitError.message);
            setIsLoading(false);
            return;
          }

          const formatDate = (date) => {
            const options = {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
            };
            return new Intl.DateTimeFormat("en-US", options).format(date);
          };

          const paymentTime = formatDate(new Date());

          const { error: confirmError } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
              return_url: `https://courseflowth.vercel.app/courses/${courseId}/payment-success?&courseTitle=${courseTitle}&amount=${amount}&time=${paymentTime}&payment_intent=${
                clientSecret.split("_secret_")[0]
              }`,
            },
          });

          if (confirmError) {
            console.error("Error confirming payment", confirmError);
            setErrorMessage(
              "Failed to confirm payment, please try again later"
            );
          }

          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data", error);
          setErrorMessage("An unexpected error occurred. Please try again.");
          setIsLoading(false);
        }
      }
    };

    getClientSecret();
  };

  if (!stripe || !elements) {
    return (
      <div className="w-full flex justify-center py-12">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handlePaymentSubmit}
      className="w-full flex flex-col justify-center items-center gap-6 p-4"
    >
      <div className="w-full min-h-[220px]">
        {errorMessage ? (
          <div className="flex flex-col w-full min-h-[270px] justify-around items-center gap-12 pt-6 ">
            <div className="flex flex-col items-center gap-3">
              <Image
                src="/course-detail/warning.svg"
                width={60}
                height={60}
                alt="refresh"
              />
              <p className="text-base sm:text-xl h-max text-[#666666] text-center  ">
                {errorMessage}
              </p>
            </div>
            <button
              className="sm:w-[300px] w-[200px] border-[1px] border-gray-400 px-4 py-2 rounded-lg hover:scale-[1.05] duration-200  "
              type="button"
              onClick={() => {
                setErrorMessage(false);
              }}
            >
              <div className="flex gap-2 justify-center">
                <Image
                  src="/course-detail/refresh.svg"
                  width={25}
                  height={25}
                  alt="refresh"
                />
                <span className="text-base sm:text-lg">Try Again</span>
              </div>
            </button>
          </div>
        ) : (
          <PaymentElement />
        )}
      </div>
      {errorMessage ? null : (
        <div className="flex flex-col w-full">
          <div className="flex">
            <Button
              style="primary"
              text={
                !isLoading ? `Pay ${commaNumber(amount)}฿` : `Processing...`
              }
              customStyle="py-[18px] px-8 "
            />
          </div>
        </div>
      )}
    </form>
  );
}

export default CheckoutForm;
