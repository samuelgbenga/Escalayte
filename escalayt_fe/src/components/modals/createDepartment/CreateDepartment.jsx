import React, { useState } from "react";
import Confirm from "../createTicket/Confirm";
import CreateUserIcon from "../../../assets/CreateUserIcon";
import CreateDepartmentSuccess from "./CreateDepartmentSuccess";

const CreateDepartment = ({ isOpen, onClose}) => {
  if (!isOpen) return null;
  const [newDepartment, setNewDepartment] = useState({
    department: "",
  });

  const [isCreated, setIsCreated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

     const token = localStorage.getItem("token"); // Retrieve the token from localStorge Or
   

    // check that the person is logged in
    if (!token) {
      alert("You are not logged in. Please log in first.");
      return;
    }

    try {
      // using fetch to connect with the response
      const response = await fetch(
        "http://localhost:8080/api/v1/admin/create-department",
        {
          // method
          method: "POST",

          // header
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newDepartment),
        }
      );

      // if response is ok
      if (response.ok) {
        // set confirm to true

        console.log("Category created successfully");
        setIsCreated(true);
      } else {
        // throw alert error
        alert("Error creating category");
        console.log("Error:", response.statusText);
      }
    }
    
    catch (error) {
      // catch error either way
      alert("Error creating category something else");
      console.log(error);
    }

    console.log("Department:", newDepartment);

    setNewDepartment({ department: "" });
  };

  // handle onChange
  const handleOnChange = (e) => {
    setNewDepartment({ department: e.target.value });
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-10"
        onClick={onClose}
      ></div>

      {/* modal outer wrapper */}
      <div className="fixed w-[100%] flex items-center justify-center z-20">
        {/* modal inner wrapper */}
        {isCreated ? (
          <CreateDepartmentSuccess onClose={onClose} />
        ) : (
          <CategoryComponent
            onClose={onClose}
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            newDepartment={newDepartment}
          />
        )}
      </div>
    </>
  );
};

export default CreateDepartment;

const CategoryComponent = ({
  onClose,
  handleSubmit,
  handleOnChange,
  newDepartment,
}) => {
  return (
    <div className="bg-white w-[448px]  rounded-lg shadow-custom p-6 relative overflow-y-auto">
      {/* modal heading part */}
      <div className="w-[400px]  mb-[20px] flex flex-col items-center justify-center">
        <div className="flex justify-between items-center w-full mb-4 px-[24px] pr-[24px]">
          <div className="rounded-lg custom-shadow p-4 bg-white">
            <CreateUserIcon
              className="w-12 h-12 rounded-lg border p-3"
              style={{ borderColor: "#EAECF0" }}
            />
          </div>

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
            Create New Department
          </p>
        </div>
      </div>

      {/* the form part of the modal */}
      <form onSubmit={handleSubmit}>
        {/* input the new department name */}
        <div className="h-[80px] flex flex-col">
          <div className=" h-[35px] flex items-center">
            <span className="text-[18px] font-sm leading-[24px] text-lg text-left h-[24px] w-[200px] px-4 py-0">
              Department
              <span className="text-[#DA1414]">*</span>
            </span>
          </div>
          <div className="h-[48px] flex items-center px-4 border border-[#0070FF]">
            <input
              type="text"
              value={newDepartment.department}
              onChange={handleOnChange}
              placeholder="Text input"
              className="text-[#09101D] h-[40px] flex items-center text-lg font-medium leading-6 text-left w-full border-none outline-none"
            />
          </div>
        </div>
        {/* button to complete the process */}
        <Confirm />
        {/* <button type="submit">submit</button> */}
      </form>
    </div>
  );
};
