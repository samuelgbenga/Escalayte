import React, { useState, useEffect, useRef } from "react";
import { useFetchAllEmployee } from "./useFetchAllEmployee";
import { useFetchPutDetails } from "./useFetchPutDetails";


const ProfileForAdminEdit = ({ onClose }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [url, setUrl] = useState(
    "http://localhost:8080/api/v1/admin/get-admin-details"
  );

  const [url1, setUrl1] = useState("");

  const [option1, setOption1] = useState({
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: null, // Initial body is null or can be an empty object
  });

  const [option, setOption] = useState({
    // method
    method: "GET",
    // header
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const { data, isLoading, isError } = useFetchAllEmployee(url, option);

    const { data1, isLoading1, isError1 } = useFetchPutDetails(
      url1,
      option1.body == null ? null : option1
    );

  const fullNameRef = useRef();

  const emailRef = useRef();

  // i commented out username because it is
  // the security context uses
  // hence changing it will require the user to login again
  const passwordRef = useRef();

  const phoneNumberRef = useRef();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleOnSubmit = () => {
    //console.log("hello world");

    // Assuming fullNameRef is a reference to an input element
    const fullName = fullNameRef.current.value;

    // Split the full name into an array
    const nameParts = fullName.split(" ");

    // Extract the first name and last name
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" "); // This handles middle names as part of the last name

    let newInfo = {
      firstName: firstName,
      lastName: lastName,
      //username: usernameRef.current.value,
      email: emailRef.current.value,
      phoneNumber: phoneNumberRef.current.value,
      password: passwordRef.current.value,
    };

    setUrl1("http://localhost:8080/api/v1/admin/update-admin-details");

    setOption1((prevOption) => ({
      ...prevOption,
      body: JSON.stringify(newInfo),
    }));

    console.log(newInfo);
  };

  //   useEffect(() => {
  //     console.log(data1);
  //   }, [data1]);

  return (
    <div className="fixed  left-0 flex w-full item-center justify-center h-full">
      <div
        className={` ${"bg-white"} text-sm  w-full h-full shadow-custom p-6 overflow-y-auto z-20 `}
      >
        {isLoading || isLoading1 ? (
          <Spinner />
        ) : (
          <div>
            <div className="flex justify-between items-center w-full mb-4 px-[24px] pr-[24px]">
              <button className="text-gray-600" onClick={onClose}>
                <svg
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.5 16.5L1 9M1 9L8.5 1.5M1 9H19"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <SaveChanges handleOnSubmit={handleOnSubmit} />
            </div>
            <FormSubmit
              fullNameRef={fullNameRef}
              emailRef={emailRef}
              passwordRef={passwordRef}
              phoneNumberRef={phoneNumberRef}
              data={data}
            />
          </div>
        )}{" "}
      </div>
    </div>
  );
};

export default ProfileForAdminEdit;

const Spinner = () => {
  return (
    <div role="status">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

function SaveChanges({ handleOnSubmit }) {
  return (
    <>
      <div className="bg-custom-blue p-4 h-[44px] w-[160px] flex items-center justify-center mt-6 mb-5">
        <button
          onClick={handleOnSubmit}
          className="text-white text-md-semibold"
        >
          Save changes
        </button>
      </div>
    </>
  );
}

const FormSubmit = ({
  fullNameRef,
  emailRef,
  phoneNumberRef,
  passwordRef,
  data,
}) => {
  return (
    <>
      <form className="w-[400px]">
        {/* enter full name */}

        {/* input the new department name */}
        <div className="h-[80px] flex flex-col mb-3">
          <div className=" h-[35px] flex items-center">
            <span className="text-[18px] font-sm leading-[24px] text-lg text-left h-[24px] w-[200px] px-4 py-0">
              Full Name
              <span className="text-[#DA1414]">*</span>
            </span>
          </div>
          <div className="h-[48px] flex items-center px-4 border border-[#0070FF]">
            <input
              type="text"
              defaultValue={data.fullName}
              ref={fullNameRef}
              placeholder="Enter Full Name"
              className="text-[#09101D] h-[40px] flex items-center text-lg font-medium leading-6 text-left w-full border-none outline-none"
            />
          </div>
        </div>

        {/* enter email */}

        <div className="h-[80px] flex flex-col mb-3">
          <div className=" h-[35px] flex items-center">
            <span className="text-[18px] font-sm leading-[24px] text-lg text-left h-[24px] w-[200px] px-4 py-0">
              Email
              <span className="text-[#DA1414]">*</span>
            </span>
          </div>
          <div className="h-[48px] flex items-center px-4 border border-[#0070FF]">
            <input
              type="email"
              defaultValue={data.email}
              ref={emailRef}
              placeholder="Enter Email"
              className="text-[#09101D] h-[40px] flex items-center text-lg font-medium leading-6 text-left w-full border-none outline-none"
            />
          </div>
        </div>

        {/* drop Phone number */}

        <div className="h-[80px] flex flex-col mb-3">
          <div className=" h-[35px] flex items-center">
            <span className="text-[18px] font-sm leading-[24px] text-lg text-left h-[24px] w-[200px] px-4 py-0">
              Phone Number
              <span className="text-[#DA1414]">*</span>
            </span>
          </div>
          <div className="h-[48px] flex items-center px-4 border border-[#0070FF]">
            <input
              type="text"
              defaultValue={data.phoneNumber}
              ref={phoneNumberRef}
              placeholder="Phone number"
              className="text-[#09101D] h-[40px] flex items-center text-lg font-medium leading-6 text-left w-full border-none outline-none"
            />
          </div>
        </div>

        <div className="h-[80px] flex flex-col mb-3">
          <div className=" h-[35px] flex items-center">
            <span className="text-[18px] font-sm leading-[24px] text-lg text-left h-[24px] w-[200px] px-4 py-0">
              Password
              <span className="text-[#DA1414]">*</span>
            </span>
          </div>
          <div className="h-[48px] flex items-center px-4 border border-[#0070FF]">
            <input
              type="text"
              ref={passwordRef}
              placeholder="Enter a new password"
              className="text-[#09101D] h-[40px] flex items-center text-lg font-medium leading-6 text-left w-full border-none outline-none"
            />
          </div>
        </div>

        {/* submit button */}
      </form>
    </>
  );
};
