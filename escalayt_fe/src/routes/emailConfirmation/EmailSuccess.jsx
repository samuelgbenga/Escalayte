import React from 'react'
import { useNavigate } from "react-router-dom";
import success from '../../assets/emailconfirmation-images/success.svg'

export default function EmailSuccess() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="bg-[#f2f2f2] flex justify-center items-center h-screen">
    <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-[400px]">
    <div className="flex flex-col">
      <img src={success} alt="success-image" className="mb-4 self-center"/>
        <h2 className="mb-4 text-[#0070FF]">Email Confirmed</h2>
        <p className="mb-6 text-[#333333]">Your email has been successfully confirmed. Please log in to continue.</p>
       
        <button onClick={handleLoginClick} className="btn px-4 py-[0.65rem] bg-[#0070FF] text-white border-none text-base cursor-pointer transition ease-in-out duration-300 text-center inline-block w-full no-underline hover:bg-[#0152bb]" >Login</button>
    </div>
</div>
</div>
  )
}
