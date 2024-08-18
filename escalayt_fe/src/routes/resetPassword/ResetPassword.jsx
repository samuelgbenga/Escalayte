/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import BankingMgtIcon from "../../assets/BankingMgtIcon";
import EscalaytImage from "../../assets/EscalaytImage";
import ResetPasswordIcon from "../../assets/ResetPasswordIcon";
import Eye from "../../assets/Eye";
import ResetPasswordSuccess from "./ResetPasswordSuccess";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      axios
        .get(
          `http://localhost:8080/api/v1/auth/confirm-reset-password?token=${token}`
        )
        .then((response) => {
          const jwtToken = response.data.split(":")[1].trim();
          console.log(jwtToken);
          localStorage.setItem("token", jwtToken);
          setIsTokenValid(true);
        })
        .catch((error) => {
          setErrorMessage("Invalid token. Try again!");
        });
    } else {
      setErrorMessage("No token provided. Try again!");
    }
  }, [location]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const token = localStorage.getItem("token"); // Corrected key to retrieve the token
    console.log(token);

    if (!token) {
      alert("User is not authenticated!");
      return;
    }

    // Decode JWT token to get the roles
    const payload = JSON.parse(atob(token.split(".")[1]));
    const roles = payload.roles || [];

    let endpoint = "";
    if (roles[0] === "ADMIN" || roles.includes("ADMIN")) {
      endpoint = "http://localhost:8080/api/v1/admin/new-admin-password";
    } else if (roles[0] === "USER") {
      endpoint = "http://localhost:8080/api/v1/users/new-user-password";
    } else {
      alert("Unauthorized role!");
      return;
    }

    try {
      const response = await axios.post(
        `${endpoint}?newPassword=${newPassword}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setIsPasswordReset(true);
      } else {
        alert("Failed to reset password!");
      }
    } catch (error) {
      alert("Error occurred while resetting password!");
    }
  };

  return (
    <>
      {isPasswordReset && (
        <div className="fixed inset-0 flex items-center justify-center bg-overlay z-50">
          <ResetPasswordSuccess onClose={() => setIsPasswordReset(false)} />
        </div>
      )}

      <div
        className={`flex flex-col items-center ${
          isPasswordReset ? "filter-blurred" : ""
        }`}
      >
        <div className="flex items-center w-[119px] h-[32px] absolute top-[24px] left-[24px] gap-[8px] ">
          <BankingMgtIcon className="w-[32px] h-[32px]" />
          <span className="w-[79px] h-[24px] font-montserrat font-bold text-[18px] leading-[24px] text-left text-[#0070FF]">
            Escalayt
          </span>
        </div>

        <div className="absolute w-[448px] h-[472px] top-[124px] left-[50px]  rounded-[12px] shadow-lg shadow-[#1018281A]">
          <form onSubmit={handleSubmit}>
            <div className="w-full h-[180px] bg-white">
              <div className="w-full h-[160px] flex flex-col gap-[4px]">
                <div className="h-[84px] w-full bg-white flex justify-center items-center">
                  <ResetPasswordIcon />
                </div>
                <div className="h-[72px] w-[400px] bg-white mx-auto flex flex-col items-center">
                  <div className="h-[32px] flex items-center justify-center">
                    <span className="font-semibold text-[18px] leading-[28px] text-center text-[#101828]">
                      Reset Your Password
                    </span>
                  </div>
                  <div className="h-[40px] flex items-center justify-center">
                    <span className="font-normal text-[14px] leading-[20px] text-center text-[#475467]">
                      Enter your new password below to reset your account
                      password.
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full h-[20px]"></div>
            </div>

            <div className="w-full h-[192px] bg-white flex flex-col items-center justify-center gap-[8px]">
              <div className="h-[80px] w-[400px] bg-white flex flex-col rounded-[2px]">
                <div className="h-[32px] flex items-center">
                  <span className="w-[114px] h-[24px] text-[16px] font-sm pl-[16px] leading-[24px] text-left text-[#09101D]">
                    Password<span className="text-[#DA1414]">*</span>
                  </span>
                </div>
                <div className="h-[48px] flex items-center p-[12px] pl-[16px] gap-[0px] border border-[#0070FF]">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-[344px] h-[24px] font-sm leading-[24px] text-left text-black placeholder-gray-300 focus:outline-none"
                    placeholder="Password Input"
                  />
                  <div
                    className="w-[24px] h-[24px] cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    <Eye />
                  </div>
                </div>
              </div>
              <div className="h-[80px] w-[400px] bg-white flex flex-col rounded-[2px]">
                <div className="h-[32px] flex items-center">
                  <span className="w-[180px] h-[24px] text-[16px] font-sm pl-[16px] leading-[24px] text-left text-[#09101D]">
                    Confirm Password<span className="text-[#DA1414]">*</span>
                  </span>
                </div>
                <div className="h-[48px] flex items-center p-[12px] pl-[16px] gap-[0px] border border-[#0070FF]">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-[344px] h-[24px] font-sm leading-[24px] text-left text-black placeholder-gray-300 focus:outline-none"
                    placeholder="Password Input"
                  />
                  <div
                    className="w-[24px] h-[24px] cursor-pointer"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    <Eye />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-[100px]">
              <div className="h-[68px] w-[448px] mt-[32px]">
                <button
                  type="submit"
                  className="h-[44px] w-[400px] mx-auto mt-[0px] mb-[24px] bg-[#0070FF] border border-[#0070FF] flex items-center justify-center"
                >
                  <div className="w-[124px] h-[24px] text-[16px] font-sm leading-[24px] text-left text-[#FFFFFF]">
                    Reset Password
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center absolute left-[1100px] top-[110px]">
          <EscalaytImage className="w-[500px] h-[800px]" />
        </div>
      </div>
    </>
  );
}
