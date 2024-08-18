/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import CreateCategoryIcon from "../../../assets/CreateCategoryIcon";
import Confirm from "../createTicket/Confirm";
import TicketCategorySuccess from "./TicketCategorySuccess";

export default function CreateCategory({ isOpen, onClose}) {
  if (!isOpen) return null;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

      const token = localStorage.getItem("token"); // Retrieve the token from localStorge Or
   
   
    if (!token) {
      alert("You are not logged in. Please log in first.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/ticket/category/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, description }),
        }
      );

      if (response.ok) {
        setIsConfirmed(true);
        console.log("Category created successfully");
      } else {
        alert("Error creating category");
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      alert("Error creating category");
    }

    console.log("Category Name:", name);
    console.log("Description:", description);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-10"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-20">
        {isConfirmed ? (
          <TicketCategorySuccess onClose={() => setIsConfirmed(false)} /> // Render confirmation modal
        ) : (
          <div className="bg-white w-[448px] h-[488px] rounded-lg shadow-custom p-6 relative overflow-y-auto">
            <div className="w-[400px] h-[125px] mb-[20px] flex flex-col items-center justify-center">
              <div className="flex justify-between items-center w-full mb-4 px-[24px] pr-[24px]">
                <CreateCategoryIcon
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
              <div className="flex w-[352px] h-[28px]">
                <p className="text-lg font-semibold leading-7 text-left">
                  Create New Category
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col">
              <div className="h-[80px] flex flex-col">
                <div className=" h-[35px] flex items-center">
                  <span className="text-[18px] font-sm leading-[24px] text-lg text-left h-[24px] w-[200px] px-4 py-0">
                    Category Name
                    <span className="text-[#DA1414]">*</span>
                  </span>
                </div>
                <div className="h-[48px] flex items-center px-4 border border-[#0070FF]">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Text input"
                    className="text-[#09101D] h-[40px] flex items-center text-lg font-medium leading-6 text-left w-full border-none outline-none"
                  />
                </div>
              </div>

              <div className="h-[128px] flex flex-col">
                <div className=" h-[35px] flex items-center">
                  <span className="text-[18px] font-sm leading-[24px] text-lg text-left h-[24px] w-[169px] px-4 py-0 mt-4 mb-2">
                    Description
                    <span className="text-[#DA1414]">*</span>
                  </span>
                </div>
                <div className="h-[96px] flex items-center px-4 border border-[#0070FF]">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Input"
                    className="text-[#09101D] h-full flex items-center text-lg font-medium leading-6 text-left w-full border-none outline-none pt-2.5"
                  />
                </div>
              </div>
              <Confirm />
            </form>
          </div>
        )}
      </div>
    </>
  );
}
