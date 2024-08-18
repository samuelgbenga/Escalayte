import React from 'react'

import TicketSuccessIcon from "../../../assets/TicketSuccessIcon";

const CreateDepartmentSuccess = ({onClose}) => {
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
              Department Created Successfully
            </p>
          </div>
          <div className="h-[60px] flex items-center">
            <p className="text-[14px] font-normal leading-[20px] text-[#475467] text-left">
              Your new Department has been created and is now available
              for use. You can now register a new Employee to this Department.
            </p>
          </div>
        </div>
      </div>
      <div className="w-[352px] h-[44px] flex items-center justify-center mt-6">
        <button
          onClick={onClose} // Ensure this function closes the modal
          className="bg-custom-blue text-white text-[20px] font-semibold leading-[24px] py-2 px-4 w-full h-full border border-custom-blue"
        >
          Confirm
        </button>
      </div>
    </div>
  </>
  )
}

export default CreateDepartmentSuccess