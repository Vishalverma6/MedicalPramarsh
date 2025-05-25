import React from 'react';

const DashboardHome = () => {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-blue-800 mb-4">
        Welcome to Medical Pramarsh
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Your trusted platform for medical advice and expert consultations.
        Upload your reports, talk to professionals, and take control of your health.
      </p>
      <div className="flex justify-center gap-4">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
          Upload Report
        </button>
        <button className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition">
          Consult an Expert
        </button>
        <button className="bg-gray-600 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition">
          View Past Consultations
        </button>
      </div>
    </div>
  );
};

export default DashboardHome;
