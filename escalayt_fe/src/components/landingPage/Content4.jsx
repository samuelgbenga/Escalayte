import React from 'react';
import { Link } from 'react-router-dom'; // Import the Link component
import warehouse from '../../assets/landingPage/warehouse.png';
import arrowRight from '../../assets/landingPage/arrow-right.svg';

function Content4() {
  return (
    <>
      <div className='container mx-auto px-4 flex flex-col md:flex-row items-center justify-between'>
        <div className='p-12'>
          <img src={warehouse} alt="A ware-house" className='rounded-lg' />
        </div>
        <div>
          <h1 className='text-4xl font-bold mb-6'>Efficient Facility Management</h1>
          <p className='text-lg mb-4'>
            Escalayt provides a centralized platform <br /> for managing all your facility-related <br /> tickets.
            Track, prioritize and resolve issues <br /> seamlessly
          </p>
          <div>
            <Link to="/signup" className="flex items-center font-bold"> {/* Use Link component here */}
              Make your first sale
              <img src={arrowRight} alt="An arrow" className="ml-2" />
            </Link>
          </div>
          <br />
          <br />
        </div>
      </div>
    </>
  );
}

export default Content4;