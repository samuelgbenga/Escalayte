/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import CreateTicketIcon from "../../../assets/CreateTicketIcon";
import Confirm from "./Confirm";
import Dropdown from "./Dropdown";
import TicketSuccess from "./TicketSuccess";

export default function CreateTicket({
  isOpen,
  onClose,
  fetchFilteredTickets,
  token,
  page,
  setTickets,
  setTotalPages,
  filters
}) {
  if (!isOpen) return null;
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const [fileTitle, setFileTitle] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [isTicketCardLoading, setIsTicketCardLoading] = useState(false); // Loader for ticket card

  // import url from .env file
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  useEffect(() => {
    const fetchCategoryOptions = async () => {
      console.log("fetching");
      const token = localStorage.getItem("token");

      try {
        const response = await fetch(apiUrl + "/api/v1/ticket/categories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("category data", data);
          const options = data.map((singleData, index) => ({
            value: singleData.id,
            label: singleData.name,
          }));

          console.log(options);
          setCategoryOptions(options);
        } else {
          alert("Failed to fetch category options. Please try again.");
        }
      } catch (error) {
        alert("An error occurred. Please try again.");
      }
    };

    fetchCategoryOptions();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file); // set the selected file
      setFileTitle(file.name); // Extract and set the file title
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsTicketCardLoading(true);

    const formData = new FormData(); // Create a new FormData object
    formData.append("title", title);
    formData.append("location", location);
    formData.append("priority", priority);
    formData.append("description", description);
    formData.append("file", file);
    formData.append("fileTitle", fileTitle);

    const categoryId = category;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/ticket/category/${categoryId}/ticket/create-ticket`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          //body: JSON.stringify(requestBody),
          body: formData, // Send the FormData object
        }
      );

      if (response.ok) {
        // Handle successful response
        setIsConfirmed(true);
        // setIsSuccess(true);
        // alert("Ticket created successfully.");
        // Call fetchFilteredTickets to update the ticket table after successful ticket creation
        await fetchFilteredTickets(token, page, setTickets, setTotalPages, filters);
      } else {
        // Handle error response
        alert("Failed to create ticket. Please try again.");
      }
    } catch (error) {
      // Handle network error
      alert("An error occurred. Please try again.");
      console.log(error)
    } finally{
      setIsTicketCardLoading(false);
    }
  };

  const priorityLevelOptions = [
    { value: "HIGH", label: "High" },
    { value: "MEDIUM", label: "Medium" },
    { value: "LOW", label: "Low" },
  ];

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-10"
        onClick={onClose}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center z-20">
        {isConfirmed ? (
          <TicketSuccess onClose={() => setIsConfirmed(false)} /> // Render confirmation modal
        ) : (
          <div className="bg-white  w-[500px] h-[100vh] rounded-lg shadow-custom p-6 relative overflow-y-auto">
            <div className="w-[400px] h-[116px] mb-[20px] flex flex-col items-center justify-center">
              <div className="flex justify-between items-center w-full mb-4 px-[24px] pr-[24px]">
                <CreateTicketIcon
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
                  Create New Ticket
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col mt-4">
              <div className="flex flex-col gap-2">
                <div className="h-[80px] flex flex-col">
                  <div className=" h-[32px] flex items-center">
                    <span className="text-[18px] font-medium leading-[24px] text-lg text-left h-[24px] w-[73px] px-4 py-0">
                      Title
                      <span className="text-[#DA1414]">*</span>
                    </span>
                  </div>
                  <div className="h-[48px] flex items-center px-4 border border-[#0070FF]">
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Text input"
                      className="text-gray-500 h-[40px] flex items-center text-lg font-medium leading-6 text-left w-full border-none outline-none"
                    />
                  </div>
                </div>

                <div className="h-[80px] flex flex-col">
                  <div className=" h-[32px] flex items-center">
                    <span className="text-[18px] font-medium leading-[24px] text-lg text-left h-[24px] w-[73px] px-4 py-0">
                      Location
                      <span className="text-[#DA1414]">*</span>
                    </span>
                  </div>
                  <div className="h-[48px] flex items-center px-4 border border-[#0070FF]">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Text input"
                      className="text-gray-500 h-[40px] flex items-center text-lg font-medium leading-6 text-left w-full border-none outline-none"
                    />
                  </div>
                </div>

                <div className="h-[80px] flex flex-col ">
                  <div className=" h-[32px] flex items-center ">
                    <span className="text-[18px] font-medium leading-[24px] text-lg text-left h-[24px] w-[73px] px-4 py-0">
                      Category
                      <span className="text-[#DA1414]">*</span>
                    </span>
                  </div>
                  <Dropdown
                    options={categoryOptions}
                    selectedValue={category}
                    onSelect={setCategory}
                  />
                </div>

                <div className="h-[80px] flex flex-col">
                  <div className=" h-[32px] flex items-center">
                    <span className="text-[18px] font-medium leading-[24px] text-lg text-left h-[24px] w-[169px] px-4 py-0">
                      Priority Level
                      <span className="text-[#DA1414]">*</span>
                    </span>
                  </div>
                  <Dropdown
                    options={priorityLevelOptions}
                    selectedValue={priority}
                    onSelect={setPriority}
                  />
                </div>

                <div className="h-[128px] flex flex-col">
                  <div className=" h-[32px] flex items-center">
                    <span className="text-[18px] font-medium leading-[24px] text-lg text-left h-[24px] w-[169px] px-4 py-0">
                      Description
                      <span className="text-[#DA1414]">*</span>
                    </span>
                  </div>
                  <div className="h-[96px] flex items-center px-4 border border-[#0070FF]">
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Input"
                      className="text-gray-500 h-full flex items-center text-lg font-medium leading-6 text-left w-full border-none outline-none pt-2.5"
                    />
                  </div>
                </div>

                <div className="  w-full h-[129px] flex items-center justify-center  mt-2 mb-2 p-10 pt-10 border-dashed border-2 border-gray-300 rounded-[8px] relative">
                  <div className="flex flex-col w-[235px] h-[49px]">
                    <div className="flex items-center gap-1">
                      <div className="w-[172px] h-[24px] text-base-medium text-gray-900">
                        Drop your files here or
                      </div>
                      <label
                        htmlFor="file-upload"
                        className="w-auto h-[24px] text-base-semibold text-blue-600 cursor-pointer"
                      >
                        browse
                      </label>
                    </div>
                    <div className="flex justify-center items-center w-[144px] h-[20px] text-sm-medium text-gray-500 mt-1 ml-12">
                      Maximum size: 50MB
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileChange}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              {/* SUBMIT BTN */}
              <div className="">
                  <button disabled={isTicketCardLoading} type="submit" className="text-white text-md-semibold bg-custom-blue p-4 rounded h-[44px] w-full flex items-center justify-center mt-10">
                    Confirm
                  </button>
                </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
