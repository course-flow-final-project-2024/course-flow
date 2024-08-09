import React, { useContext } from "react";
import { CourseDetailContext } from "@/pages/courses/[courseId]";
import { Box, Modal } from "@mui/material";
import Image from "next/image";
import CheckoutForm from "./checkout-form";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/utils/convertToSubcurrency";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is required");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

function PaymentModal() {
  const context = useContext(CourseDetailContext);
  const originalPrice = context.originalPrice;
  const openPaymentModal = context.openPaymentModal;
  const setOpenPaymentModal = context.setOpenPaymentModal;

  const handleClose = () => setOpenPaymentModal(false);

  return (
    <React.Fragment>
      <div className="flex">
        <Modal open={openPaymentModal}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <Box
              bgcolor={"white"}
              width={{ xs: "max-content", sm: "max-content" }}
              height={{ sm: "max-content" }}
              borderRadius={"30px"}
              border={"1px"}
              borderColor={"#C8CCDB"}
            >
              <div>
                <div className="flex justify-between items-center h-14 px-6 py-2 border-b-[1px]">
                  <Image
                    src="/logo/CourseFlowLogo.svg"
                    width={117}
                    height={13.37}
                    alt="website-logo"
                  />
                  <Image
                    src="/icons/grey-cross.svg"
                    height={20}
                    width={20}
                    alt="cross"
                    onClick={handleClose}
                    className="active:scale-[0.8] duration-100 hover:scale-[1.05] "
                  />
                </div>
                <div className="w-full p-4 ">
                  <div
                    role="tablist"
                    className="tabs tabs-lifted tabs-lg bg-white "
                  >
                    <input
                      type="radio"
                      name="my_tabs_2"
                      role="tab"
                      className="tab text-base font-semibold flex justify-center min-w-[120px]   "
                      aria-label="Credit / Debit Card"
                      defaultChecked
                    />

                    <div
                      role="tabpanel"
                      className="tab-content bg-base-100 border-base-300 rounded-box "
                    >
                      {originalPrice > 0 && (
                        <Elements
                          stripe={stripePromise}
                          options={{
                            mode: "payment",
                            amount: convertToSubcurrency(originalPrice),
                            currency: "thb",
                          }}
                        >
                          <CheckoutForm amount={originalPrice} />
                        </Elements>
                      )}
                    </div>

                    <input
                      type="radio"
                      name="my_tabs_2"
                      role="tab"
                      className="tab text-base font-semibold min-w-[120px] "
                      aria-label="QR Code"
                    />
                    <div
                      role="tabpanel"
                      className="tab-content bg-base-100 border-base-300 rounded-box p-6 "
                    >
                      <div className="skeleton min-h-[400px] min-w-[215px] w-full flex flex-col justify-center items-center gap-4">
                        <Image
                          src="/course-detail/coming-soon.svg"
                          width={50}
                          height={50}
                          alt="coming soon"
                        />
                        <span className="text-gray-600 ">Coming Soon...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Box>
        </Modal>
      </div>
    </React.Fragment>
  );
}

export default PaymentModal;
