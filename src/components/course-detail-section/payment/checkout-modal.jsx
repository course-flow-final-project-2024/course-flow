import React, { useContext } from "react";
import { CourseDetailContext } from "@/pages/courses/[courseId]";
import { Box, Modal } from "@mui/material";
import Image from "next/image";
import CheckoutForm from "./checkout-form";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/utils/convertToSubcurrency";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";

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
                    className="active:scale-[0.8] duration-100 hover:scale-[1.05] hover:cursor-pointer "
                  />
                </div>

                <div className="w-full sm:min-w-[600px]  "></div>

                <Tabs position="relative" variant="unstyled">
                  <div className="flex flex-col gap-5 pt-2 pb-3 px-3 sm:pt-4 sm:pb-6 sm:px-6 ">
                    <div className="relative border-b-2 border-base-200 mx-6 pb-[7px] pt-[5px] ">
                      <TabList>
                        <Tab w="100%">
                          <div className="flex gap-[1px] sm:gap-2 items-center ">
                            <Image
                              src="/course-detail/credit-card.svg"
                              width={30}
                              height={30}
                              alt="credit-card"
                            />
                            <span className="text-sm sm:text-lg font-medium leading-4">
                              Credit/Debit Card
                            </span>
                          </div>
                        </Tab>

                        <Tab w="100%">
                          <div className="flex gap-[1px] sm:gap-2 items-center ">
                            <Image
                              src="/course-detail/qr-code.svg"
                              width={30}
                              height={30}
                              alt="credit-card"
                            />
                            <span className="text-sm sm:text-lg font-medium">
                              QR Code
                            </span>
                          </div>
                        </Tab>
                      </TabList>
                      <TabIndicator
                        mt="7px"
                        height="3px"
                        bg="black"
                        borderRadius="2px"
                      />
                    </div>
                    <div className="border-2 rounded-3xl p-1 border-base-200 ">
                      <TabPanels>
                        <TabPanel>
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
                        </TabPanel>
                        <TabPanel>
                          <div className=" min-h-[340px] min-w-[260px] w-full flex flex-col justify-center items-center gap-4">
                            <Image
                              src="/course-detail/coming-soon.svg"
                              width={50}
                              height={50}
                              alt="coming soon"
                            />
                            <span className="text-gray-600 ">
                              Coming Soon...
                            </span>
                          </div>
                        </TabPanel>
                      </TabPanels>
                    </div>
                  </div>
                </Tabs>
              </div>
            </Box>
          </Box>
        </Modal>
      </div>
    </React.Fragment>
  );
}

export default PaymentModal;
