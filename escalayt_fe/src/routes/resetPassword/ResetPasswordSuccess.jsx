/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import TicketSuccessIcon from "../../assets/TicketSuccessIcon";

function ResetPasswordSuccess({ onClose }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="bg-white w-[400px] h-[280px] rounded-[12px] shadow-lg p-6 flex flex-col items-center justify-center">
        <div className="h-[180px] ">
          <div className="flex justify-between items-center w-[352px] mb-4">
            <TicketSuccessIcon
              className="w-12 h-12 rounded-lg border p-3"
              style={{ borderColor: "#EAECF0" }}
            />
            <button onClick={onClose} className="text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="w-[352px] flex flex-col gap-1">
            <div className="h-[28px] flex items-center">
              <p className="text-[18px] font-semibold leading-[28px] text-[#101828] text-left">
                Password Reset Successfully
              </p>
            </div>
            <div className="h-[60px] flex items-center">
              <p className="text-[14px] font-normal leading-[20px] text-[#475467] text-left">
                Your password has been reset successfully. You can now log in
                with your new password.
              </p>
            </div>
          </div>
        </div>
        <div className="w-[352px] h-[44px] flex items-center justify-center mt-6">
          <button
            onClick={handleLoginClick}
            className="bg-custom-blue text-white text-[20px] font-semibold leading-[24px] py-2 px-4 w-full h-full border border-custom-blue"
          >
            Login
          </button>
        </div>
      </div>
    </>
  );
}

export default ResetPasswordSuccess;
