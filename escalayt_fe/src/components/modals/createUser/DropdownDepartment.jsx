/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import DownArrowIcon from "../../../assets/DownArrowIcon";

const DropdownDepartment = ({ options, selectedValue, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelect = (value) => {
    onSelect(value);
    setIsOpen(false);
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
      <div
        className="h-[48px] flex items-center px-4 border border-[#0070FF] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-lg font-medium leading-6 ${!selectedValue && "text-gray-500"}`} >
          {selectedValue
            ? options.find((option) => option.id === selectedValue).department
              ? options.find((option) => option.id === selectedValue).department
              : "No name"
            : "Select department"}
        </span>
        <DownArrowIcon />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border border-[#0070FF] mt-1 rounded-md z-10 max-h-[200px] overflow-y-auto">
          {options.map((option) => (
            <div
              key={option.id}
              className="h-[48px] flex items-center px-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option.id)}
            >
              <span className="text-gray-500 text-lg font-medium leading-6">
                {option.department ? option.department : "No Name"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownDepartment;
