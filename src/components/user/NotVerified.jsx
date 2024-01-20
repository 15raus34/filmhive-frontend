import React from "react";
import { useAuth } from "../../hooks";
import { useNavigate } from "react-router-dom";

export default function NotVerified() {
  const { authInfo } = useAuth();
  const { profile, isLoggedIn } = authInfo;
  const isVerified = authInfo.profile?.isVerified;
  const navigate = useNavigate();

  const handleResend = () => {
    navigate("/auth/email-verification", {
      state: { user: profile },
      replace: true,
    });
  };

  return (
    <div>
      {isLoggedIn && !isVerified && (
        <p className="p-2 text-lg text-center bg-blue-50">
          It Seems You Haven't Verify Your Account,{" "}
          <button
            onClick={handleResend}
            className="font-semibold text-blue-500 hover:underline"
          >
            Click Here To Verify Your Account
          </button>
        </p>
      )}
    </div>
  );
}
