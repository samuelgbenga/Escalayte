import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { Eye, EyeOff } from 'react-feather';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './UserLogin.module.css';
import { basicSCHEMA } from '../../schemas';
import IMAGES from '../../assets';

 // import url from .env file
 const apiUrl = import.meta.env.VITE_APP_API_URL;
 
export default function Login() {

  const navigate = useNavigate();
  
  
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(showPassword => !showPassword);
  };

  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.post(`${apiUrl}/api/v1/auth/login-user`, {
        username: values.username,
        password: values.password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
  
      if (response.data && response.data.loginInfo) {
        const { username, token } = response.data.loginInfo;
        // Store the username and token in localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        actions.resetForm();
        navigate('/user/dashboard');
      }

    } catch (error) {
      // console.error('Failed to login user', error);
      console.error('Failed to login user');
      console.log(error.response.data);
      // const notify = () => toast(error.response.data);

      // notify();
      toast.error(error.response.data)
      if (error.response) {
        console.error('Error response data:', error.response.data);
      }
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
      username: '',
      password: ''
    },
    validationSchema: basicSCHEMA,
    onSubmit  
  });
  return (
    <div>

        <div className='px-4 py-4 mb-10 md:mb-20'><img src={IMAGES.ESCALAYT_LOGO} alt="" /></div>

        <div className='flex flex-wrap justify-between px-8 sm:px-16'>
            <form onSubmit={handleSubmit} className={`${styles.formContainer} md:w-5/12 lg:w-4/12  h-fit px-4 py-4`}>
                <div className='flex flex-wrap  justify-center'><img src={IMAGES.AUTH_ICON} alt="" /></div>
                <div className='text-lg text-center font-semibold' style={{color:"#101828"}}>Log in to your account</div>
                <div className = "sm_text text-center mb-6" style={{color:"#475467"}}>Welcome back! Please enter your details.</div>

                <div className={`${styles.formInput} mb-2`}>
                  <label className={`block font-normal ps-2`} htmlFor="user_name">Username</label>
                  <input
                    id="username"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${errors.username && touched.username ? "input-error" : ""}  w-full px-2 py-1`} type="text" placeholder='Enter Username' />

                  {errors.username && touched.username && ( <p className="error">{errors.username}</p> )}
                </div>
              
                <div className={`${styles.formInput} mb-1`}>
                  <label className='block font-normal ps-2' htmlFor="user_name">Password</label>

                  <div className='relative '>
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

                <div className='flex flex-wrap justify-end'> <Link to = "/forgot-password" className='mb-8 sm_text p_color'>Forgot password</Link></div>
                <div>
                  <button disabled={isSubmitting} type='submit' className='p_btn w-full py-2 sm_text '>Confirm</button>
                </div>


            </form>

            <div className={`${styles.loginImgDiv}  hidden md:flex md:w-7/12 lg:w-8/12 flex-wrap lg:h-[600px] items-center`}>
                <div className='mx-auto'>
                  <img src={IMAGES.LOGIN_IMAGE} className='' alt="" />
                </div>

            </div>

        </div>

        <ToastContainer />

    </div>
  )
}


// fetchTickets();

//     // Method to ticket count
//     fetchTicketCount(token,
//       setTicketTotalCount,
//       setOpenTicketCount,
//       setResolvedTicketCount,
//       setOngoingTicketCount
//     );