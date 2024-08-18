import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import IMAGES from '../../../assets';

const Navbar = ({ onOpen, setProfileDropdown, profileDropdown, user}) => {

  const handleOpenModal = () => {
    onOpen('notification'); // Replace 'myModalName' with the name of the modal you want to open
  };

  const handleProfileDropdown = () => {
    setProfileDropdown(prev => !prev);
    
  }

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem('token');

    // Redirect to login page
    navigate('/login');
  }

  return (
    <nav className="px-16">
        <div className="relative flex flex-wrap items-center justify-between h-14">
          <div className="">
            <Link to="/" className="flex-shrink-0">
              <img src={IMAGES.ESCALAYT_LOGO} className='min-w-full' alt="" />
            </Link>  
          </div>
          <div className="flex flex-wrap items-center ">
            <div className="flex flex-wrap no_text">
                <Link to = "/admin/dashboard">Dashboard</Link>
                <Link to = "/admin/tickets" className='ml-4'>
                    All Tickets
                  </Link>
            </div>
            <div className="relative flex flex-wrap items-center ml-28">
              <button className="" onClick={handleOpenModal}><img src={IMAGES.NOTIFICATION_ICON} alt="notification" /></button>
              <button className="ml-6" onClick={handleProfileDropdown}><img src={IMAGES.PROFILE_ICON} className='' alt="" /></button>

            
                                
{
        profileDropdown && 
         <div className='absolute right-0 top-full sm_text bg-white border w-40 pl-4 pt-2 mt-2'>
            <div className='mb-4'>
              <div>Notifications</div>
            </div>
            <div className='mb-4' style={{color:"#1F2937"}}>Profile</div>
            <div className='mb-4' style={{color:"#1F2937"}} onClick={handleLogout} >Log out</div>
         </div>
         
      }





            </div>
          </div>
        </div>
    </nav>
  );
};

export default Navbar;