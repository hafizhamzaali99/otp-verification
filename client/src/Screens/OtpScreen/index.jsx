import React, { useEffect, useState } from "react";
import "../../App.css";
import "../../index.css";
import useFetch from "../../Utils/useFetch";
import { toast } from "react-toastify";
import successAnimation from "../../Assets/Lottie/success.json";
import Lottie from "lottie-react";

const OtpScreen = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isDisabled, setIsDisabled] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [counter, setCounter] = useState(30);
  const [success, setSuccess] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [error, setError] = useState("");
  const { request } = useFetch();
  const API_URL = "http://localhost:8000/api/v1/otp";

  useEffect(() => {
    handleGetOTP();
  }, [showAlert]);

  useEffect(() => {
    const otpFilled = otp.every((num) => num !== "");
    setIsDisabled(!otpFilled);
  }, [otp]);

  //handling counter for resend otp when until the counter will be 0

  useEffect(() => {
    if (counter === 0) {
      setResendDisabled(false);
    } else {
      const timer = setTimeout(() => setCounter(counter - 1), 1000); // decrement counter every second

      return () => clearTimeout(timer); // Clean up timer
    }
  }, [counter]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    // Only proceed if the value is a number
    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically move to the next input field
      if (index < 5) {
        document.getElementById(`otp${index + 1}`).focus();
      }
    }

    // Allow backspace and focus to the previous field
    if (value === "" && index >= 0) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index === 0) {
        document.getElementById(`otp${index}`).focus(); //when  backspace is pressed on first field
      } else {
        document.getElementById(`otp${index - 1}`).focus(); //when backspace is pressed on other fields
      }
    }
  };

  const handleResend = () => {
    setCounter(30); //set counter value again 30 to restart the timer
    setResendDisabled(true);
    setOtp(new Array(6).fill(""));
    handleGetOTP();
  };

  //generating hardquoted OTP from backend
  const handleGetOTP = async () => {
    try {
      console.log(API_URL, "API_URL");
      const req = await request(`${API_URL}/generate/`, "GET");
      toast.success(`Your OTP code is ${req?.data?.OTP}`);
    } catch (error) {
      console.log(error);
    }
  };

  //handling OTP verification from backend
  const handleVerifyOTP = async () => {
    try {
      console.log(otp.join(""), "otp data");
      let reqBody = {
        OTP: otp.join(""),
      };
      const req = await request(`${API_URL}/verify/`, "POST", reqBody);
      toast.success(req?.data?.message);
      console.log(req, "getotp resposne");
      setOtp(new Array(6).fill(""));
      setResendDisabled(true);
      setSuccess((prev) => true);
    } catch (error) {
      toast.error(error?.error?.message);
      console.log(error);
      setOtp(new Array(6).fill(""));
    }
  };

  //handling paste feature that if user paste all  the otp at once in single field so it will distribut to all fields
  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      const digits = pastedData.split("").slice(0, otp.length); // Get only the number of digits matching input length
      digits.forEach((digit, index) => {
        newOtp[index] = digit;
      });
      setOtp(newOtp);
      // Move focus to the last field filled by paste
      const lastFieldIndex = digits.length - 1;
      if (lastFieldIndex >= 0 && lastFieldIndex < otp.length) {
        document.getElementById(`otp${lastFieldIndex}`).focus();
      }
    }
  };

  return (
    <div className="mainContainer">
      <div className="container">
        <div className="otpContainer">
          {success ? (
            <div className="row">
              <Lottie
                animationData={successAnimation}
                loop={true}
                autoplay={true}
                className="lottie"
              />
            </div>
          ) : (
            <div className="row">
              <h1 className="otpHead">OTP Verification</h1>
              <div className="otpInputContainer">
                <p className="otpText">Enter 6 digits OTP code</p>
                {otp?.map((data, index) => (
                  <input
                    key={index}
                    id={`otp${index}`}
                    type="text"
                    maxLength="1"
                    value={otp[index]}
                    onChange={(e) => handleChange(e, index)}
                    className="otpInput"
                    onPaste={handlePaste}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && otp[index] === "") {
                        if (index > 0) {
                          document.getElementById(`otp${index - 1}`).focus();
                        }
                      }
                    }}
                  />
                ))}
              </div>
              <div>
                <p className="errorText">{error && error}</p>
              </div>
              <div style={{ marginTop: "20px" }} className="btnContainer">
                <button
                  disabled={otp[5] === ""}
                  className={"btn"}
                  onClick={handleVerifyOTP}
                >
                  Verify & Proceed
                </button>
                <button
                  disabled={resendDisabled}
                  onClick={handleResend}
                  className="btn"
                >
                  Resend OTP
                </button>
              </div>
              <div style={{ margin: "20px 0px" }}>
                <p className="resendText">
                  You can resend OTP after
                  <span> {`00:${counter < 10 ? `0${counter}` : counter}`}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtpScreen;
