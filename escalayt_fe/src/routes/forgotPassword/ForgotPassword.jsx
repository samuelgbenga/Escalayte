import React, { useState } from 'react';
import escalogo from '../../assets/forgot-images/esca-logo.svg';
import forgotIcon from '../../assets/forgot-images/forgot-icon.svg';
import settingsImage from '../../assets/forgot-images/settings.png';
import tickIcon from '../../assets/forgot-images/tick-icon.svg';
import closeIcon from '../../assets/forgot-images/close-icon.svg';
import styles from './ForgotPassword.module.css';
import axios from 'axios';

 // import url from .env file
 const apiUrl = import.meta.env.VITE_APP_API_URL;

export default function ForgotPassword() {

  // `email` is the state variable, `setEmail` is the function to update it  
  const [email, setEmail] = useState('');

  // `showModal` is another state variable to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // handleSubmit is a function that handles form submission
  const handleSubmit = async (e) => {

    e.preventDefault();
    try{
      const response = await axios.post(apiUrl + '/api/v1/auth/initiate-forget-password', {email});
      if(response.status === 200){
        setShowModal(true);
      }
    } catch(error) {
      console.error('There was an error sending the reset link:', error);
    }
  };


  return (
    <>
      <nav className={styles['nav-bar']}>
        <img src={escalogo} alt="escalayt-logo" /><span className={styles['p-color']}>Escalayt</span>
      </nav>

      <div className={styles['forgot-password-container']}>
        <div className={styles['forgot-password-card']}>
          <div className={styles['forgot-password-header']}>
          <div className={styles['forgot-password-icon']}>
            <img src={forgotIcon} alt="forgot icon" />
          </div>
          <h2>Forgot Password</h2>
          <p className={styles['para-text']}>Enter your email address below and we'll send you a link to reset your password.</p>
          </div>
          <form onSubmit={handleSubmit} className={styles['forgot-form']}>
            <label htmlFor="email" className={styles['password-label']}>  Email Address</label>
            <input 
            type="email"
            placeholder='Email input'
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
           

            <button type='submit' className= {`${styles['submit-button']} ${styles['bg-p-color']}`}>Send Reset Link</button>
          </form>

        </div>

<div className={styles['password-image']}>
        <img src={settingsImage} alt="settings-image"/>
</div>
      </div>
       
      {/* Modal that shows after successful email submission */}

      {showModal && (
        <div className={styles['modal-overlay']}>
          <div className={styles['modal']}>
            <div className={styles['modal-header']}>
              <div className={styles['modal-icon']}>
                <img src={tickIcon} alt="tick icon" className={styles['tick-icon' ]}/>
              </div>
              <button className={styles['close-button']} onClick={() => setShowModal(false)}>
                <img src={closeIcon} alt="close icon" />
              </button>
            </div>
            <div className={styles['modal-body']}>
              <h2>Check Your Email</h2>
              <p>We have sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.</p>
              <button className={styles['confirm-button']} onClick={() => setShowModal(false)}>Confirm</button>
            </div>
          </div>
        </div>


      )}
      </>
  )
}
