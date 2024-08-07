import Image from "next/image";
import React, { useState } from "react";
import Button from "@/utils/button";
import { Box, Modal } from "@mui/material";

function CommonModalBox(props) {
  return (
    <React.Fragment>
      <div className="flex">
        <Modal
          open={props.open}
          BackdropProps={{
            style: {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
          >
            <Box
              bgcolor={"white"}
              width={{ xs: "350px", sm: "528px" }}
              height={{ sm: "212px" }}
              borderRadius={"30px"}
              border={"1px"}
              borderColor={"#C8CCDB"}
            >
              <div>
                <div className="flex justify-between items-center h-14 px-6 py-2 border-b-[1px]">
                  <p className="text-xl">Confirmation</p>
                  <Image
                    src="/icons/grey-cross.svg"
                    height={20}
                    width={20}
                    alt="cross"
                    onClick={props.crossClick}
                    className="active:scale-[0.5] ease-in-out duration-100 hover:scale-[1.2] "
                  />
                </div>
                <div className="p-6">
                  <p className=" text-[#646D89]">{props.AlertMessage}</p>
                  <div className="sm:flex sm:gap-4 mt-6">
                    <div className="flex">
                      <Button
                        style="secondary"
                        text={props.leftText}
                        onClick={props.leftOnClick}
                        customStyle="py-[18px] px-8"
                      />
                    </div>
                    <div className="flex sm:mt-0 mt-4">
                      <Button
                        style="primary"
                        text={props.rightText}
                        onClick={props.rightOnClick}
                        customStyle="py-[18px] px-8"
                      />
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

export default CommonModalBox;

// <CommonModalBox text="" AlertMessage="" leftOnClick="" leftText="" rightOnClick="" rightText="" />

// props.text = text ของปุ่ม modal

// props.AlertMessage = คำถามบนกล่อง modal ("Are you sure to.... ?")

// props.leftOnClick = onClick event ของปุ่มซ้าย (สีส้ม)
// props.leftText    = text ของปุ่มซ้าย

// props.rightOnClick = onClick event ของปุ่มขวา (สีน้ำเงิน)
// props.rightText    = text ของปุ่มขวา
