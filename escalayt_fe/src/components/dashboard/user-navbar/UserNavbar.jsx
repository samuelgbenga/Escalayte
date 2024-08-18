import React from 'react';
import { Link } from 'react-router-dom';

import IMAGES from '../../../assets';

const UserNavbar = ({ onOpen, setProfileDropdown, profileDropdown}) => {
    const handleOpenModal = () => {
        onOpen('notification'); // Replace 'myModalName' with the name of the modal you want to open
      };
    

  const handleProfileDropdown = () => {
    setProfileDropdown(prev => !prev);
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
                <Link to = "/user/dashboard">Dashboard</Link>
                <Link to = "/user/tickets" className='ml-4'>My Tickets</Link>
            </div>
            <div className="flex flex-wrap items-center ml-28">
              <button className="" onClick={ handleOpenModal}><img src={IMAGES.NOTIFICATION_ICON} alt="notification" /></button>
              <button className="ml-6" onClick={handleProfileDropdown}><img src={IMAGES.PROFILE_ICON} className='' alt="" /></button>
            </div>
          </div>
        </div>
    </nav>
  );
};

export default UserNavbar;