import React, { useState } from "react";
import Button from "@/utils/button";
import { Box, Modal } from "@mui/material";
import PayMentForm from "./payment-form";

export default function PaymentCard() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

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
              borderRadius={"10px"}
              border={"1px"}
              borderColor={"#C8CCDB"}
            >
              <div>
                <div className="h-12 bg-[#a2c4ff] rounded-t-[10px] border-b-[1px] p-2">
                  <p className=" text-2xl font-medium">CourseFlow</p>
                </div>
                <div className="mx-8 mt-5">
                  <p className="text-lg font-medium">Course Name : xxxxx</p>
                  <p className="text-[16px]">Price : xxxxx</p>
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
