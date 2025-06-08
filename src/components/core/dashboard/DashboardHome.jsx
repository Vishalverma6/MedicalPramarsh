import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import bgImage from "../../../assets/bg-dashboard.jpg";

const DashboardHome = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  console.log("user22", user)

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-6"
      // style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dashboard Type */}
      <div className="bg-white/80 rounded-xl shadow-md p-4 max-w-xl mx-auto mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
          {
            user?.accountType === "Patient"
              ? "Patient Dashboard"
              : user?.accountType === "Expert"
                ? "Expert Dashboard"
                : user?.accountType === "Admin"
                  ? "Admin Dashboard"
                  : ""
          }
        </h1>
      </div>

      {/* Welcome Message */}
      <div className="bg-white/70 rounded-xl shadow p-6 max-w-3xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-4">
          Welcome to Medical Pramarsh
        </h2>
        <p className="text-lg text-gray-700">
          {user?.accountType === "Patient"
            ? "Upload your medical reports, consult with trusted experts, and take charge of your health journey."
            : user?.accountType === "Expert"
              ? "Review and respond to pending patient reports. Help people with your medical expertise."
              : user?.accountType === "Admin"
                ? "Manage experts and oversee pending verifications for a seamless healthcare experience."
                : "Your trusted platform for medical advice and expert consultations. Upload your reports, talk to professionals, and take control of your health."}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
          {
            user?.accountType === "Patient"
              ? "Upload Report"
              : user?.accountType === "Expert"
                ? "View Pending Report"
                : user?.accountType === "Admin"
                  ? "Pending Expert"
                  : ""
          }
        </button>
        <button className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition">
          {
            user?.accountType === "Patient"
              ? "Consult an Expert"
              : user?.accountType === "Expert"
                ? "Add Review"
                : user?.accountType === "Admin"
                  ? "Approve Expert"
                  : ""
          }
        </button>
        <button className="bg-gray-600 text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition">
          {
            user?.accountType === "Patient"
              ? "View Past Consultations"
              : user?.accountType === "Expert"
                ? "View Pending Report"
                : user?.accountType === "Admin"
                  ? "Pending Report"
                  : ""
          }
        </button>
      </div>
    </div>
  );
};

export default DashboardHome;
