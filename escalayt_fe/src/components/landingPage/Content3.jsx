import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import signUpForm from '../../assets/landingPage/form.png';
import check from '../../assets/landingPage/icon.svg';
import arrowRight from '../../assets/landingPage/arrow-right.svg';

function HowitWorks() {
  return (
    <>
      <section className='bg-customBlue py-20'>
        <div className='container mx-auto px-4 flex flex-col md:flex-row items-center justify-between'>
          <div>
            <h2 className='text-4xl font-bold mb-6'>How it Works</h2>
            <p className='text-lg mb-4'>Escalayt simplifies the process of managing facility issues with a straightforward approach.</p>
            <ul>
              <li className='flex items-center'><img src={check} alt="check" className='mr-2' />Create a ticket for any facility issue</li>
              <li className='flex items-center'><img src={check} alt="check" className='mr-2' />Track the progress in real-time</li>
              <li className='flex items-center'><img src={check} alt="check" className='mr-2' />Collaborate with our team to resolve the issue</li>
              <li className='flex items-center'><img src={check} alt="check" className='mr-2' />Generate detailed reports for better decision making</li>
            </ul>
            <div className='p-6'>
              <Link to="/signup" className="flex items-center font-bold"> {/* Use Link component here */}
                Make your first sale
                <img src={arrowRight} alt="An arrow" className="ml-2" />
              </Link>
            </div>
          </div>
          <br />
          <br />
          <div>
            <img src={signUpForm} alt="A picture of the signup form" className='rounded-lg' />
          </div>
        </div>
      </section>
    </>
  );
}

export default HowitWorks;
