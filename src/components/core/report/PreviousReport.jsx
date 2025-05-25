import React, { useEffect, useState } from "react";
import { deleteReport, getReportByPatientId } from "../../../services/operations/reportAPI";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const PreviousReport = () => {
  const { patientId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [reports, setReports] = useState([]);

  const fetchReport = async () => {
    try {
      const result = await getReportByPatientId(patientId, token);
      setReports(result);
    } catch (error) {
      console.error("Error fetching reports", error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  // Delete report function
  const deleteHandler = async (reportId) => {
    try {
      console.log("reportID", reportId)
      await deleteReport(reportId, token);
      // Remove deleted report from state to update UI
      setReports((prev) => prev.filter((report) => report._id !== reportId));
    } catch (error) {
      console.error("Error deleting report", error);
    }
  };

  return (
    <div className="px-6 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Previous Medical Reports</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div
            key={report._id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-all bg-white relative"
          >
            <div className="mb-3">
              <h2 className="text-xl font-semibold">{report.reportType || "Unknown Report"}</h2>
              <p className="text-sm text-gray-500">
                Submitted on: {format(new Date(report.createdAt), "dd MMM yyyy")}
              </p>
            </div>

            <div className="mb-2">
              <p className="text-gray-700 mb-1 font-medium">Description:</p>
              <p className="text-gray-600 text-sm">{report.description || "No description provided."}</p>
            </div>

            {report.reportUrl && (
              <div className="my-3">
                {report.resourceType === "raw" || report.reportUrl.includes("/raw/") ? (
                  <a
                    href={report.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View PDF Report
                  </a>
                ) : (
                  <img
                    src={report.reportUrl}
                    alt="Report"
                    className="w-full h-48 object-cover rounded-md"
                  />
                )}
              </div>
            )}

            <div className="mt-2">
              <p className="text-sm">
                <span className="font-medium">Status:</span>{" "}
                <span className={`font-semibold ${report.status === "Reviewed" ? "text-green-600" : "text-yellow-600"}`}>
                  {report.status}
                </span>
              </p>
              {report.status === "Reviewed" && report.review && (
                <p className="text-sm mt-1">
                  <span className="font-medium">Expert Review:</span> {report.review}
                </p>
              )}
            </div>

            {/* Delete button */}
            <button
              onClick={() => deleteHandler(report._id)}
              className="absolute cursor-pointer top-2 right-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {reports.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No reports found for this patient.</p>
      )}
    </div>
  );
};

export default PreviousReport;
