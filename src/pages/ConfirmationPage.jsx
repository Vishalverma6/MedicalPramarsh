import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center  min-h-screen bg-gradient-to-r from-blue-100  px-4">
      <div className=" p-8 rounded-lg shadow-2xs shadow-amber-200 max-w-md w-full bg-gradient-to-br from-sky-100 -mt-60 text-center">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Password Changed Successfully</h2>
        <p className="text-gray-700 mb-6">
          Your password has been updated. You can now log in with your new credentials or return to the homepage.
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/login">
            <button className=" cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Go to Login
            </button>
          </Link>
          <Link to="/">
            <button className=" cursor-pointer bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
