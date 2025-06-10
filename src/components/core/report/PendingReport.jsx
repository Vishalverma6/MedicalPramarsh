import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // 👈 for accessing user
import { useNavigate } from 'react-router-dom'; // 👈 for navigation
import { getPendingReports } from '../../../services/operations/reportAPI';
import toast from 'react-hot-toast';

const PendingReport = () => {
  const [pendingReports, setPendingReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.profile); // 👈 get user
  const navigate = useNavigate(); // 👈 navigation hook

  const fetchPendingReports = async () => {
    try {
      const result = await getPendingReports();
      setPendingReports(result || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingReports();
  }, []);

  const handleAddReview = (reportId) => {
    if (user?.approved === false) {
      toast.error("You do not have access to add a review. Please wait for admin approval.");
      return;
    } else {
      navigate(`/dashboard/add-review/${reportId}`);
    }
  };


  return (
    <div className="p-4 flex flex-col md:p-8 bg-gradient-to-br from-green-100 shadow-2xl shadow-black ">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">Pending Reports</h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading...</p>
      ) : pendingReports.length === 0 ? (
        <p className="text-gray-500 text-center">No pending reports found.</p>
      ) : (
        <div className="space-y-6">

          {/* Mobile Cards */}
          <div className="block md:hidden space-y-4">
            {pendingReports.map((report, index) => (
              <div key={report._id} className="bg-white rounded-lg shadow-md p-4 border border-gray-300">
                <p className="text-sm text-gray-500">#{index + 1}</p>
                <p><span className="font-semibold">Email:</span> {report.patient?.email || "N/A"}</p>
                <p><span className="font-semibold">Phone:</span> {report.phoneNumber}</p>
                <p><span className="font-semibold">Type:</span> {report.reportType}</p>
                <p>
                  <span className="font-semibold">Link:</span>{" "}
                  <a href={report.reportUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    View Report
                  </a>
                </p>
                <p><span className="font-semibold">Status:</span> <span className="text-yellow-600">{report.status}</span></p>

                {/* Button only for Expert */}
                {user?.accountType === "Expert" && (
                  <button
                    onClick={() => handleAddReview(report._id)}
                    className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Add Review
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full bg-white border-2 border-gray-200 shadow rounded-md">
              <thead>
                <tr className="bg-gray-100 text-sm">
                  <th className="py-2 px-4 border">#</th>
                  <th className="py-2 px-4 border">Patient Email</th>
                  <th className="py-2 px-4 border">Phone</th>
                  <th className="py-2 px-4 border">Report Type</th>
                  <th className="py-2 px-4 border">Report Link</th>
                  <th className="py-2 px-4 border">Status</th>
                  {user?.accountType === "Expert" && (
                    <th className="py-2 px-4 border">Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {pendingReports.map((report, index) => (
                  <tr key={report._id} className="text-center text-sm">
                    <td className="py-2 px-4 border">{index + 1}</td>
                    <td className="py-2 px-4 border">{user?.approved === false ? "*******@gmail.com" : `${report.patient?.email}` || "N/A"}</td>
                    <td className="py-2 px-4 border">{user?.approved === false ? "**********":`${report.phoneNumber}`}</td>
                    <td className="py-2 px-4 border">{report.reportType}</td>
                    <td className="py-2 px-4 border">
                      <a
                        href={report.reportUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View Report
                      </a>
                    </td>
                    <td className="py-2 px-4 border text-yellow-600 font-medium">{report.status}</td>

                    {/* Button only for Expert */}
                    {user?.accountType === "Expert" && (
                      <td className="py-2 px-4 border">
                        <button
                          onClick={() => handleAddReview(report._id)}
                          className="px-3 cursor-pointer py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Add Review
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingReport;
