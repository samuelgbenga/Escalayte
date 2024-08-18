/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import DownArrowIcon from "../../../../assets/DownArrowIcon";

const EmployeeDropDown = ({
  options,
  selectedValue,
  onSelect,
  setEmployeeDetails,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    onSelect(option.id);
    setIsOpen(false);
    setEmployeeDetails({
      fullName: option.fullName,
      email: option.email,
      username: option.username,
      jobTitle: option.jobTitle,
      department: option.department,
    });
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-[400px]">
      <span className="text-[18px] font-sm leading-[24px] text-lg text-left h-[24px] w-[200px] px-4 py-0">
        Full Name
        <span className="text-[#DA1414]">*</span>
      </span>
      <div
        className="h-[48px] flex items-center px-4 border border-[#0070FF] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`text-lg font-medium leading-6 ${
            !selectedValue && "text-gray-500"
          }`}
        >
          {selectedValue
            ? options.find((option) => option.id === selectedValue).fullName
              ? options.find((option) => option.id === selectedValue).fullName
              : "No name"
            : "Select An Employee"}
        </span>
        <DownArrowIcon />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border border-[#0070FF] mt-1 rounded-md z-10 max-h-[400px] overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.id}
              className="h-[48px] flex items-center px-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              <span className="text-gray-500 text-lg font-medium leading-6">
                {option.fullName ? option.fullName : "No Name"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeDropDown;
