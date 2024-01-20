import React, { useEffect, useRef, useState } from "react";
import { commonModalClasses } from "../../utils/Theme";
import Container from "../Container";
import FormContainer from "../form/FormContainer";
import SubmitBtn from "../form/SubmitBtn";
import Title from "../form/Title";
import { useLocation, useNavigate } from "react-router-dom";
import { resendOTP, verifyUserEmail } from "../../api/auth";
import { useNotificaion } from "../../hooks";
import { useAuth } from "../../hooks";

const OTP_LENGTH = 6;

const validateOTP = (otp) => {
  let valid = false;
  for (let val of otp) {
    valid = !isNaN(parseInt(val));
    if (!valid) break;
  }
  return valid;
};
export default function EmailVerification() {
  const [otp, newOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeInputField, newActiveInputField] = useState(0);

  const inputRef = useRef();
  const { updateNotification } = useNotificaion();
  const { authInfo, isAuth } = useAuth();
  const { isLoggedIn } = authInfo;
  const isVerified = authInfo.profile?.isVerified;

  const { state } = useLocation();
  const user = state?.user;

  const navigate = useNavigate();

  const focusNextInputField = (index) => {
    newActiveInputField(index + 1);
  };

  const focusPreviousInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;
    newActiveInputField(nextIndex);
  };

  const handleOTPChange = ({ target }, index) => {
    const { value } = target;
    const newOTPAray = [...otp];
    newOTPAray[index] = value.substring(value.length - 1, value.length);
    if (!value) {
      focusPreviousInputField(index);
    } else {
      focusNextInputField(index);
    }
    newOtp([...newOTPAray]);
  };

  // const handleKeyDown = ({ key }, index) => {
  //     if (key === "Backspace") {
  //     focusPreviousInputField(index);
  //     console.log("bye");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateOTP(otp)) return updateNotification("error", "Invalid OTP");
    const {
      user: userResponse,
      Mesg,
      error,
    } = await verifyUserEmail({
      UserID: user.userID,
      OTP: otp.join(""),
    });
    if (error) return updateNotification("error", error);
    updateNotification("success", Mesg);
    localStorage.setItem("auth-token", userResponse.token);
    isAuth();
  };

  const handleResendOTP = async () => {
    const { error, Mesg } = await resendOTP(user.userID);
    if (error) return updateNotification("error", error);

    updateNotification("success", Mesg);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeInputField]);

  useEffect(() => {
    if (!user) navigate("/NotFound");
    if (isLoggedIn && isVerified) navigate("/");
  }, [user, navigate, isLoggedIn, isVerified]);

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses}>
          <div>
            <Title>Please Enter The OTP To Verify Your Account</Title>
            <p className="text-center dark:text-dark-subtle text-secondary">
              OPT has been send to {user.email.charAt(0)}****@gmail.com
            </p>
          </div>
          <div className="flex items-center justify-between space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  ref={index === activeInputField ? inputRef : null}
                  key={index}
                  type="number"
                  value={otp[index] || ""}
                  onChange={(e) => handleOTPChange(e, index)}
                  // onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-10 h-10 text-xl text-center bg-transparent border-2 rounded outline-none dark:border-dark-subtle border-primary dark:focus:border-white focus:border-secondary dark:text-white"
                ></input>
              );
            })}
          </div>
          <div className="">
            <SubmitBtn submitValue="Verify" />
            <button
              onClick={handleResendOTP}
              type="button"
              className="flex justify-center h-4 mt-2 text-lg font-semibold text-center text-blue-500 dark:text-white"
            >
              I don't have an OTP
            </button>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
