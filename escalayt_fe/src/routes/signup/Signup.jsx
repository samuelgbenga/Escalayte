/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router";
import BankingMgtIcon from "../../assets/BankingMgtIcon";
import EscalaytImage from "../../assets/EscalaytImage";
import ResetPasswordIcon from "../../assets/ResetPasswordIcon";
// import Eye from "../../assets/Eye";
import { Eye, EyeOff } from 'react-feather';
import SignupSuccess from "./SignupSuccess";
import { useFormik } from 'formik';
import { signupSCHEMA } from '../../schemas';
import styles from '../login/Login.module.css';
import IMAGES from '../../assets';
 
export default function Signup() {

  // import url from .env file
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSignupSucessful, setIsSignupSucessful] = useState(false);
 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
 
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
 
  const onSubmit = async (values, actions) => {
 
    const requestBody = {
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      phone: values.phone,
      userName: values.username,
      password: values.password,
      confirmPassword: values.confirmPassword, // Not neccssary
    };

    console.log(requestBody);
 
    try {
      const response = await fetch(`${apiUrl}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
 
      if (response.ok) {
        setIsSignupSucessful(true);
        alert("Registration successful!");
        // navigate("/login");
      } else {
        // const errorText = await response.json();
        // alert(`Registration failed: ${errorText}`);
        console.log(response);
        // Extract error message from the response
        const errorData = await response.json();
        const errorMessage = errorData.message || "Error creating user";
        console.log(errorData)
        console.log(errorMessage);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
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
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      phone:''
    },
    validationSchema: signupSCHEMA,
    onSubmit  
  });

 
  return (
    <>
        {isSignupSucessful && (
        <div className="fixed inset-0 flex items-center justify-center bg-overlay z-50">
          <SignupSuccess onClose={() => setIsSignupSucessful(false)} />
        </div>
      )}
 
      <div
        className={`${
          isSignupSucessful ? "filter-blurred" : ""
        }`}
      >

        {/* Logo */}
        <div className='px-4 py-4 mb-10 md:mb-10'><img src={IMAGES.ESCALAYT_LOGO} alt="" /></div>
 
          {/* Form Section */}
        <div className="">

          <div className='lg:w-10/12 mx-auto flex flex-wrap justify-between px-8 sm:px-16'>
              <form onSubmit={handleSubmit} className={`${styles.formContainer} md:w-5/12 lg:w-5/12  h-fit px-6 py-4`}>

                <div className='flex flex-wrap  justify-center'><img src={IMAGES.AUTH_ICON} alt="" /></div>

                <div className='text-lg text-center font-semibold' style={{color:"#101828"}}>Sign up</div>
                <div className = "sm_text text-center mb-6" style={{color:"#475467"}}>
                 Please enter your details.
                </div>

                {/* First Name */}
                <div className={`${styles.formInput}`}>
                      <label className={`block font-normal ps-2`} htmlFor="firstname">First Name</label>
                      <input
                        id="firstname"
                        name="firstname"
                        value={values.firstname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${errors.firstname && touched.firstname ? "input-error" : ""}  w-full px-2 py-1`} type="text" placeholder='Enter Firstname' />

                      {errors.firstname && touched.firstname && ( <p className="error">{errors.firstname}</p> )}
                </div>

                  {/* Last Name */}
                <div className={`${styles.formInput}`}>
                      <label className={`block font-normal ps-2`} htmlFor="lastname">Last Name</label>
                      <input
                        id="lastname"
                        name="lastname"
                        value={values.lastname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${errors.lastname && touched.lastname ? "input-error" : ""}  w-full px-2 py-1`} type="text" placeholder='Enter Firstname' />

                      {errors.lastname && touched.lastname && ( <p className="error">{errors.lastname}</p> )}
                </div>

                  {/* Email */}
                  <div className={`${styles.formInput}`}>
                      <label className={`block font-normal ps-2`} htmlFor="email">Email Address</label>
                      <input
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${errors.email && touched.email ? "input-error" : ""}  w-full px-2 py-1`} type="text" placeholder='Enter Email Address' />

                      {errors.email && touched.email && ( <p className="error">{errors.email}</p> )}
                </div>

                {/* User Name */}
                <div className={`${styles.formInput}`}>
                      <label className={`block font-normal ps-2`} htmlFor="username">Username</label>
                      <input
                        id="username"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${errors.username && touched.username ? "input-error" : ""}  w-full px-2 py-1`} type="text" placeholder='Enter Username' />

                      {errors.username && touched.username && ( <p className="error">{errors.username}</p> )}
                </div>
                  
                  {/* Password */}
                <div className={`${styles.formInput}`}>
                  <label className='block font-normal ps-2' htmlFor="password">Password</label>

                  <div className='relative'>
                    <input
                    id='password'
                    name = "password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${errors.password && touched.password ? "input-error" : ""}  w-full px-2 py-1`} 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder='Enter Password' />

                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                      <button type="button" onClick={togglePasswordVisibility}>
                        {showPassword ? <EyeOff style={{ color: '#0070FF' }} /> : <Eye style={{ color: '#0070FF' }}/>}
                      </button>
                    </div>
                  </div>

                  {errors.password && touched.password && ( <p className="error">{errors.password}</p> )}

                </div>

                {/* Confirm Password */}
                <div className={`${styles.formInput}`}>
                  <label className='block font-normal ps-2' htmlFor="confirmPassword">Confirm Password</label>

                  <div className='relative'>
                    <input
                    id='confirmPassword'
                    name = "confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${errors.confirmPassword && touched.confirmPassword ? "input-error" : ""}  w-full px-2 py-1`} 
                    type={showConfirmPassword ? 'text' : 'password'} 
                    placeholder='Enter Password' />

                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                      <button type="button" onClick={toggleConfirmPasswordVisibility}>
                        {showConfirmPassword ? <EyeOff style={{ color: '#0070FF' }} /> : <Eye style={{ color: '#0070FF' }}/>}
                      </button>
                    </div>
                  </div>

                  {errors.confirmPassword && touched.confirmPassword&& ( <p className="error">{errors.confirmPassword}</p> )}

                </div>

                  {/* Phone Number*/}
                  <div className={`${styles.formInput} mb-6`}>
                      <label className={`${styles.exclude} block font-normal ps-2`} htmlFor="phone">Phone Number</label>
                      <input
                        id="phone"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${errors.phone && touched.phone ? "input-error" : ""}  w-full px-2 py-1`} type="text" placeholder='Enter Phone Number' />

                      {errors.phone && touched.phone && ( <p className="error">{errors.phone}</p> )}
                </div>
  
                  {/* Submit Button */}

                <div>
                      <button disabled={isSubmitting} type='submit' className='p_btn w-full py-2 sm_text '>Confirm</button>
                </div>

              </form>

              <div className={`${styles.loginImgDiv} hidden md:flex md:w-7/12 lg:w-7/12  flex-wrap lg:h-[600px] items-center`}>
                  <div className='ml-auto'>
                      <img src={IMAGES.LOGIN_IMAGE} className='' alt="" />
                  </div>
              </div>
          </div>

        </div>
 
       
      </div>
    </>
  );
}