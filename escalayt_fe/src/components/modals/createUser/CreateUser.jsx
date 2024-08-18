import { useEffect, useRef, useState } from "react";
import React from "react";
import DropdownDepartment from "./DropdownDepartment";
import { useFetchDepartment } from "./useFetchDepartment";
import CreateUserIcon from "../../../assets/CreateUserIcon";
import Confirm from "../createTicket/Confirm";
import TicketSuccessIcon from "../../../assets/TicketSuccessIcon";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useFormik } from 'formik';
import { createUserSchema } from "../../../schemas"; 


 // import url from .env file
 const apiUrl = import.meta.env.VITE_APP_API_URL;

// Testing url
const URLS = {
  DEPARTMENT: "http://localhost:8080/api/v1/admin/get-all-department",
  CREATE_USER: "http://localhost:8080/api/v1/admin/register-user",
};



// // this is to handle post request
//     // post request header

const CreateUser = ({ isOpen, onClose}) => {
  if (!isOpen) return null;

const token = localStorage.getItem("token");

//second parameter for setting header
const option = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};
  
  // fetch department info
  const { data, isLoading, isError } = useFetchDepartment(
    URLS.DEPARTMENT,
    option
  );


  const [departments, setDepartments] = useState([{ id: "", department: "" }]);

  const [departmentId, setDepartmentId] = useState();

  // boolean check submission status
  const [isAfterFirstSubmit, setIsAfterFirstSubmit] = useState(false);

  // use Effect here for fetching department
  useEffect(() => {
    const departmentList =
      data &&
      data.map((department) => ({
        id: department.id,
        department: department.department,
      }));

    departmentList && setDepartments(departmentList);
  }, [data]);

  // handle submition
  const onSubmit = async (values, actions) => {
    console.log("i am called")
    
    const newUser = {
      fullName: values.fullName,
      email: values.email,
      departmentId: departmentId,
      jobTitle: values.jobTitle
    };

    console.log("new user", newUser)

    // check that the person is logged in
    if (!token) {
      alert("You are not logged in. Please log in first.");
      return;
    }

    try {
      // using fetch to connect with the response
      const response = await fetch(`${URLS.CREATE_USER}`, {
        // method
        method: "POST",

        // header
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        // set confirm to true
        setIsAfterFirstSubmit(true);
        console.log("User created successfully");
        toast.success("User created successfully");
      } else {
        // Extract error message from the response
        const errorData = await response.json();
        const errorMessage = errorData.message || "Error creating user";
        toast.error(errorMessage);
      }
    } catch (error) {
      // catch error either way
      alert("Error creating user");
      console.log(error);
    }

    //clear the space aftewards
    // actions.resetForm();
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      jobTitle: '',
    },
    validationSchema: createUserSchema,
    onSubmit  
  });


  return (
    <>
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={onClose}
        ></div>
        <div
          className={` ${
            !isAfterFirstSubmit && "bg-white"
          }  w-[448px]  rounded-lg shadow-custom p-6 relative overflow-y-auto z-20 `}
        >
          {isAfterFirstSubmit ? (
            <CreateNewUserSuccess onClose={onClose} />
          ) : (
            <>
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
                    Create New User
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="form">
                
                {/* FULL NAME */}
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
                      // ref={fullNameRef}
                      id="fullName"
                      name="fullName"
                      value={values.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter Full Name"
                      className="text-[#09101D] h-[40px] flex items-center text-lg font-medium leading-6 text-left w-full border-none outline-none"
                    />
                  </div>
                  {errors.fullName && touched.fullName && ( <p className="error">{errors.fullName}</p> )}
                </div>

                {/* EMAIL */}
                <div className="h-[80px] flex flex-col mb-3">
                  <div className=" h-[35px] flex items-center">
                    <span className="text-[18px] font-sm leading-[24px] text-lg text-left h-[24px] w-[200px] px-4 py-0">
                      Email
                      <span className="text-[#DA1414]">*</span>
                    </span>
                  </div>
                  <div className="h-[48px] flex items-center px-4 border border-[#0070FF]">
                    <input
                      type="text"
                      // ref={emailRef}
                      id="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter Email"
                      className="text-[#09101D] h-[40px] flex items-center text-lg font-medium leading-6 text-left w-full border-none outline-none"
                    />
                  </div>
                  {errors.email && touched.email && ( <p className="error">{errors.email}</p> )}
                </div>
                
                {/* DEPARTMENT */}
                <div className="h-[80px] flex flex-col mb-3">
                  <div className=" h-[35px] flex items-center">
                    <span className="text-[18px] font-sm leading-[24px] text-lg text-left h-[24px] w-[200px] px-4 py-0">
                      Department
                      <span className="text-[#DA1414]">*</span>
                    </span>
                  </div>

                  <DropdownDepartment
                    options={departments}
                    selectedValue={departmentId}
                    onSelect={setDepartmentId}
                  />
                </div>


                {/* JOB TITLE */}
                <div className="h-[80px] flex flex-col mb-3">
                  <div className=" h-[35px] flex items-center">
                    <span className="text-[18px] font-sm leading-[24px] text-lg text-left h-[24px] w-[200px] px-4 py-0">
                     Job Title
                      <span className="text-[#DA1414]">*</span>
                    </span>
                  </div>
                  <div className="h-[48px] flex items-center px-4 border border-[#0070FF]">
                    <input
                      type="text"
                      // ref={emailRef}
                      id="jobTitle"
                      name="jobTitle"
                      value={values.jobTitle}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter Job Title"
                      className="text-[#09101D] h-[40px] flex items-center text-lg font-medium leading-6 text-left w-full border-none outline-none"
                    />
                  </div>
                  {errors.jobTitle && touched.jobTitle && ( <p className="error">{errors.jobTitle}</p> )}
                </div>

                {/* SUBMIT BTN */}
                <div className="">
                <button disabled={isSubmitting}  type="submit" className="text-white text-md-semibold bg-custom-blue p-4 rounded h-[44px] w-[400px] flex items-center justify-center mt-10">
                      Confirm
                    </button>
                </div>

              </form>
            </>
          )}
        </div>

        <ToastContainer />
      </div>
      
    </>
  );
};

export default CreateUser;

const CreateNewUserSuccess = ({ onClose }) => {
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
                User Created Succesfully
              </p>
            </div>
            <div className="h-[60px] flex items-center">
              <p className="text-[14px] font-normal leading-[20px] text-[#475467] text-left">
                New user has been created
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
  );
};








// import { useEffect, useRef, useState } from "react";
// import React from "react";
// import DropdownDepartment from "./DropdownDepartment";
// import { useFetchDepartment } from "./useFetchDepartment";
// import CreateUserIcon from "../../../assets/CreateUserIcon";
// import Confirm from "../createTicket/Confirm";
// import TicketSuccessIcon from "../../../assets/TicketSuccessIcon";

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


//  // import url from .env file
//  const apiUrl = import.meta.env.VITE_APP_API_URL;

// // Testing url
// const URLS = {
//   DEPARTMENT: "http://localhost:8080/api/v1/admin/get-all-department",
//   CREATE_USER: "http://localhost:8080/api/v1/admin/register-user",
// };



// // // this is to handle post request
// //     // post request header

// const CreateUser = ({ isOpen, onClose}) => {
//   if (!isOpen) return null;

//   const token = localStorage.getItem("token");

// //second parameter for setting header
// const option = {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
// };
  
//   // fetch info
//   const { data, isLoading, isError } = useFetchDepartment(
//     URLS.DEPARTMENT,
//     option
//   );

//   console.log(data);

//   //full name ref
//   const fullNameRef = useRef();

//   // use ref email
//   const emailRef = useRef();

//   // use ref passwrod
//   const passwordRef = useRef();

//   const [departments, setDepartments] = useState([{ id: "", department: "" }]);

//   const [departmentId, setDepartmentId] = useState();

//   // boolean check submission status
//   const [isAfterFirstSubmit, setIsAfterFirstSubmit] = useState(false);

//   // console.log
//   // use Effect here
//   useEffect(() => {
//     const departmentList =
//       data &&
//       data.map((department) => ({
//         id: department.id,
//         department: department.department,
//       }));

//     departmentList && setDepartments(departmentList);
//   }, [data]);

//   // handle submition
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent the default form submission behavior

//     const newUser = {
//       fullName: fullNameRef.current.value,
//       email: emailRef.current.value,
//       phoneNumber: 87654321,
//       departmentId: departmentId,
//     };

//     // check that the person is logged in
//     if (!token) {
//       alert("You are not logged in. Please log in first.");
//       return;
//     }

//     try {
//       // using fetch to connect with the response
//       const response = await fetch(`${URLS.CREATE_USER}`, {
//         // method
//         method: "POST",

//         // header
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newUser),
//       });

//       if (response.ok) {
//         // set confirm to true
//         setIsAfterFirstSubmit(true);
//         console.log("User created successfully");
//         toast.success("User created successfully");
//       } else {
//         // Extract error message from the response
//         const errorData = await response.json();
//         const errorMessage = errorData.message || "Error creating user";
//         toast.error(errorMessage);
//       }
//     } catch (error) {
//       // catch error either way
//       alert("Error creating user");
//       console.log(error);
//     }

//     console.log("password", newUser.phoneNumber);
//     console.log("email", newUser.email);
//     console.log("full name", newUser.fullName);
//     console.log("department id", departmentId);

//     //clear the space aftewards
//     emailRef.current.value = "";
//     fullNameRef.current.value = "";
//   };

//   return (
//     <>
//       <div className="fixed inset-0 z-20 flex items-center justify-center">
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-10"
//           onClick={onClose}
//         ></div>
//         <div
//           className={` ${
//             !isAfterFirstSubmit && "bg-white"
//           }  w-[448px]  rounded-lg shadow-custom p-6 relative overflow-y-auto z-20 `}
//         >
//           {isAfterFirstSubmit ? (
//             <CreateNewUserSuccess onClose={onClose} />
//           ) : (
//             <>
//               <div className="w-[400px]  mb-[20px] flex flex-col items-center justify-center">
//                 <div className="flex justify-between items-center w-full mb-4 px-[24px] pr-[24px]">
//                   <div className="rounded-lg custom-shadow p-4 bg-white">
//                     <CreateUserIcon
//                       className="w-12 h-12 rounded-lg border p-3"
//                       style={{ borderColor: "#EAECF0" }}
//                     />
//                   </div>

//                   <button onClick={onClose} className="text-gray-600">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-6 w-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                       strokeWidth={2}
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M6 18L18 6M6 6l12 12"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//                 <div className="flex w-[352px] h-[28px]">
//                   <p className="text-lg font-semibold leading-7 text-left">
//                     Create New User
//                   </p>
//                 </div>
//               </div>

//               <form onSubmit={handleSubmit} className="form">
//                 {/* enter full name */}

//                 {/* input the new department name */}
//                 <div className="h-[80px] flex flex-col mb-3">
//                   <div className=" h-[35px] flex items-center">
//                     <span className="text-[18px] font-sm leading-[24px] text-lg text-left h-[24px] w-[200px] px-4 py-0">
//                       Full Name
//                       <span className="text-[#DA1414]">*</span>
//                     </span>
//                   </div>
//                   <div className="h-[48px] flex items-center px-4 border border-[#0070FF]">
//                     <input
//                       type="text"
//                       ref={fullNameRef}
//                       placeholder="Enter Full Name"
//                       className="text-[#09101D] h-[40px] flex items-center text-lg font-medium leading-6 text-left w-full border-none outline-none"
//                     />
//                   </div>
//                 </div>


//                 {/* enter email */}

//                 <div className="h-[80px] flex flex-col mb-3">
//                   <div className=" h-[35px] flex items-center">
//                     <span className="text-[18px] font-sm leading-[24px] text-lg text-left h-[24px] w-[200px] px-4 py-0">
//                       Email
//                       <span className="text-[#DA1414]">*</span>
//                     </span>
//                   </div>
//                   <div className="h-[48px] flex items-center px-4 border border-[#0070FF]">
//                     <input
//                       type="text"
//                       ref={emailRef}
//                       placeholder="Enter Email"
//                       className="text-[#09101D] h-[40px] flex items-center text-lg font-medium leading-6 text-left w-full border-none outline-none"
//                     />
//                   </div>
//                 </div>

//                 {/* enter password on change */}

              

//                 {/* drop down list */}

//                 <div className="h-[80px] flex flex-col mb-3">
//                   <div className=" h-[35px] flex items-center">
//                     <span className="text-[18px] font-sm leading-[24px] text-lg text-left h-[24px] w-[200px] px-4 py-0">
//                       Department
//                       <span className="text-[#DA1414]">*</span>
//                     </span>
//                   </div>

//                   <DropdownDepartment
//                     options={departments}
//                     selectedValue={departmentId}
//                     onSelect={setDepartmentId}
//                   />
//                 </div>

//                 {/* submit button */}

//                 <Confirm />
//               </form>
//             </>
//           )}
//         </div>

//         <ToastContainer />
//       </div>
      
//     </>
//   );
// };

// export default CreateUser;

// const CreateNewUserSuccess = ({ onClose }) => {
//   return (
//     <>
//       <div className="bg-white w-[400px] h-[280px] rounded-[12px] shadow-lg p-6 flex flex-col items-center justify-center">
//         <div className="h-[180px] ">
//           <div className="flex justify-between items-center w-[352px] mb-4">
//             <TicketSuccessIcon
//               className="w-12 h-12 rounded-lg border p-3"
//               style={{ borderColor: "#EAECF0" }}
//             />
//             <button onClick={onClose} className="text-gray-600">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>
//           <div className="w-[352px] flex flex-col gap-1">
//             <div className="h-[28px] flex items-center">
//               <p className="text-[18px] font-semibold leading-[28px] text-[#101828] text-left">
//                 User Created Succesfully
//               </p>
//             </div>
//             <div className="h-[60px] flex items-center">
//               <p className="text-[14px] font-normal leading-[20px] text-[#475467] text-left">
//                 New user has been created
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="w-[352px] h-[44px] flex items-center justify-center mt-6">
//           <button
//             onClick={onClose} // Ensure this function closes the modal
//             className="bg-custom-blue text-white text-[20px] font-semibold leading-[24px] py-2 px-4 w-full h-full border border-custom-blue"
//           >
//             Confirm
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };
