import React, { useState, forwardRef } from "react";
import Button from "@/utils/button";
import { Grid, TextField } from "@mui/material";
import Image from "next/image";
import InputMask from "react-input-mask";

function PayMentForm({ setOpen }) {
  const [selectedMethod, setSelectedMethod] = useState("credit");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleClose = () => setOpen(false);
  const handlePay = () => {};
  const handleCvvChange = (e) => {
    const { value } = e.target;
    if (/^\d{0,3}$/.test(value)) {
      setCvv(value);
    }
  };

  return (
    <React.Fragment>
      <div className="mx-8 mt-3 rounded-[10px] border-[1px]">
        <div className="grid grid-cols-2 items-center h-8 bg-[#ffd792] rounded-t-[10px] border-b-[1px] text-center text-[16px] font-normal cursor-pointer">
          <button
            className={`${
              selectedMethod === "credit"
                ? "bg-[#fdc057] rounded-tl-[10px] border-[#fdc057]"
                : "border-gray-300"
            }, border-r-[0.5px], h-full`}
            onClick={() => setSelectedMethod("credit")}
          >
            Credit Card
          </button>
          <button
            className={`${
              selectedMethod === "qr"
                ? "bg-[#fdc057] rounded-tr-[10px] border-[#fdc057]"
                : "border-gray-300"
            }, border-l-[0.5px], h-full`}
            onClick={() => setSelectedMethod("qr")}
          >
            QR Code
          </button>
        </div>
        {selectedMethod === "credit" && (
          <div className="px-3 h-[300px]">
            <p className="mt-3"> Enter your credit card details</p>
            <form noValidate autoComplete="off" className="mt-3">
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Name on card"
                    variant="outlined"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputMask
                    mask="9999 9999 9999 9999"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  >
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        fullWidth
                        label="Card Number"
                        variant="outlined"
                        value={cardNumber}
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item xs={6}>
                  <InputMask
                    mask="99/99"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                  >
                    {(inputProps) => (
                      <TextField
                        {...inputProps}
                        fullWidth
                        label="Expiration Date"
                        variant="outlined"
                        placeholder="MM/YY"
                      />
                    )}
                  </InputMask>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="CVV"
                    variant="outlined"
                    type="password"
                    value={cvv}
                    onChange={handleCvvChange}
                    inputProps={{ maxLength: 3 }}
                  />
                </Grid>
              </Grid>
            </form>
          </div>
        )}
        {selectedMethod === "qr" && (
          <div className="px-3 h-[300px]">
            <p className=" mt-3">Scan the QR code to pay</p>
            <Image src="" alt="QR Code" className="mt-3" />
          </div>
        )}
      </div>
      {selectedMethod === "credit" && (
        <div className="flex justify-evenly my-4 h-12">
          <div className="flex justify-evenly w-28 p-1 h-12">
            <Button
              style="secondary"
              text="Back"
              onClick={handleClose}
              customStyle="!h-10"
            />
          </div>
          <div className="flex justify-evenly w-28 p-1">
            <Button
              style="primary"
              text="Pay"
              onClick={handlePay}
              customStyle="!h-10"
            />
          </div>
        </div>
      )}
      {selectedMethod === "qr" && (
        <div className="flex justify-evenly my-4 h-12">
          <div className="flex justify-evenly w-28 p-1">
            <Button
              style="secondary"
              text="Back"
              onClick={handleClose}
              customStyle="!h-10"
            />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default PayMentForm;
