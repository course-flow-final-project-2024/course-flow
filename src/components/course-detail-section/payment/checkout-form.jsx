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
              return_url: `http://localhost:3000/courses/${courseId}/payment-success?&courseTitle=${courseTitle}&amount=${amount}&time=${paymentTime}&payment_intent=${
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
          setErrorMessage("An error occurred. Please try again.");
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
      className="w-full flex flex-col justify-center items-center gap-8 p-4"
    >
      <div className="w-full">
        {errorMessage ? (
          <p className="text-base text-red-600 text-center min-h-[100px] flex items-center justify-center">
            {errorMessage}
          </p>
        ) : (
          <PaymentElement />
        )}
      </div>
      <div className="flex flex-col w-full">
        <div className="flex">
          <Button
            style="primary"
            text={!isLoading ? `Pay ${commaNumber(amount)}฿` : `Processing...`}
            customStyle="py-[18px] px-8 "
          />
        </div>
      </div>
    </form>
  );
}

export default CheckoutForm;
