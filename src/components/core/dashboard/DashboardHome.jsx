import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import bgImage from "../../../assets/bg-dashboard.jpg";

const DashboardHome = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  const handleFirstAction = () => {
    if (user?.accountType === "Patient") navigate("/dashboard/upload-report");
    else if (user?.accountType === "Expert") navigate("/dashboard/pending-report");
    else if (user?.accountType === "Admin") navigate("/dashboard/pending-expert");
  };

  const handleSecondAction = () => {
    if (user?.accountType === "Patient") navigate("/dashboard/consult-expert");
    else if (user?.accountType === "Expert") navigate("/dashboard/previous-reviewed-report");
    else if (user?.accountType === "Admin") navigate("/dashboard/approved-expert");
  };

  const handleThirdAction = () => {
    if (user?.accountType === "Patient") navigate("/dashboard/consultations");
    // else if (user?.accountType === "Expert") navigate("/dashboard/pending-reports");
    else if (user?.accountType === "Admin") navigate("/dashboard/pending-report");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat p-6 md:mt-80 lg:mt-5  overflow-y-hidden"
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
        <button
          onClick={handleFirstAction}
          className="bg-blue-600 cursor-pointer text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
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

        <button
          onClick={handleSecondAction}
          className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
        >
          {
            user?.accountType === "Patient"
              ? "Consult an Expert"
              : user?.accountType === "Expert"
                ? "Previous Reviewed Report"
                : user?.accountType === "Admin"
                  ? "Approve Expert"
                  : ""
          }
        </button>

        <button
          onClick={handleThirdAction}
          className="bg-gray-600 cursor-pointer text-white px-6 py-2 rounded-xl hover:bg-gray-700 transition"
        >
          {user?.accountType === "Patient" && (
            <div>View Past Consultations</div>
          )}

          {user?.accountType === "Admin" && (
            <div>Pending Report</div>
          )}

        </button>
      </div>
    </div>
  );
};

export default DashboardHome;
