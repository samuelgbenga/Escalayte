import React from "react";
import { Link } from "react-router-dom";
import focusedManUsingLaptop from "../../assets/landingPage/Image1.png";

function Content1() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50 pt-0 border-1">
      <section className="py-2 border-1 mb-16 pt-0 md:space-x-16 mr-2">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between pt-0">
          <div className="max-w-md mx-auto text-left mb-8 md:mb-0 md:mr-8">
            <br />
            <br />
            <h1 className="text-4xl font-bold mb-8">
              Your Comprehensive Facility Management Solution
            </h1>
            <p className="text-lg mb-4">
              Streamline your facility management with our efficient and
              user-friendly ticketing system.
            </p>
            <div className="flex justify-center md:justify-start items-center space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 border w-full md:w-96"
              />
              <button className="bg-blue-600 text-white px-6 py-2 whitespace-nowrap">
                Start Free Trial
              </button>
            </div>
            <p className="mt-2 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-black underline">
                Log In now
              </Link>
            </p>
          </div>
          <div className="relative mt-2 md:mt-0 mx-auto md:mx-0 pt-2 md:pt-0 md:ml-8 flex-shrink-0">
            <img
              src={focusedManUsingLaptop}
              alt="Man using the laptop"
              className="rounded-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Content1;
