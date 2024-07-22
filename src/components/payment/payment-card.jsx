import React, { useState } from "react";
import Button from "@/utils/button";
import { Box, Modal } from "@mui/material";
import PayMentForm from "./payment-form";
import Image from "next/image";

export default function PaymentCard({ courseData }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <div className="flex">
        <Button
          style="primary"
          text="Subscribe This Course"
          customStyle="h-[50px]"
          onClick={handleOpen}
        />
        <Modal open={open}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <Box
              bgcolor={"white"}
              width={{ xs: "350px", sm: "500px" }}
              borderRadius={"24px"}
              border={"1px"}
              borderColor={"#C8CCDB"}
            >
              <div>
                <div className="flex flex-row justify-between h-14 bg-[#fff] rounded-t-[24px] border-b-[1px]">
                  <Image
                    src="/logo/CourseFlowLogo.svg"
                    alt="CourseFlowLogo"
                    width={174}
                    height={19}
                    className="mx-8"
                  />
                  <Image
                    src="/icons/grey-cross.svg"
                    alt="grey-cross"
                    width={21}
                    height={21}
                    className="mx-8 active:scale-[0.5] ease-in-out duration-100 hover:scale-[1.2]  "
                    onClick={handleClose}
                  />
                </div>
                <div className="mx-8 mt-5">
                  <p className="text-lg font-medium">
                    Course Name :{" "}
                    {courseData.length > 0 && courseData[0].course_name}
                  </p>
                  <p className="text-[16px]">
                    Price : {courseData.length > 0 && courseData[0].price}
                  </p>
                </div>
                <div className="mx-8 mt-5">Select payment method :</div>
                <PayMentForm setOpen={setOpen} />
              </div>
            </Box>
          </Box>
        </Modal>
      </div>
    </React.Fragment>
  );
}
