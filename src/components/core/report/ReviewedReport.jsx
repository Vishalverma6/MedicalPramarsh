import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getReportReviewdByExpert } from '../../../services/operations/reportAPI'
import { ACCOUNT_TYPE } from '../../../utils/constants'

const ReviewedReport = () => {
  const [reviewedReports, setReviewedReports] = useState([])
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)

  const fetchReviewedReport = async () => {
    const result = await getReportReviewdByExpert(token)
    if (result) {
      setReviewedReports(result)
    }
  }

  useEffect(() => {
    fetchReviewedReport()
  }, [])

  return (
    <div className="p-4 shadow-2xl shadow-black">
      <h2 className="text-2xl font-bold mb-6">Reviewed Reports</h2>
      {reviewedReports.length === 0 ? (
        <p>No reviewed reports found.</p>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">Report Type</th>
                <th className="p-3 border">Review</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Report Link</th>
                <th className="p-3 border">Patient Email</th>
                <th className="p-3 border">Patient Phone</th>
                <th className="p-3 border">Reviewed On</th>
                {user?.accountType === ACCOUNT_TYPE.ADMIN && (
                  <>
                    <th className="p-3 border">Expert ID</th>
                    {/* Replace with name/phone if you fetch expert data */}
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {reviewedReports.map((report, index) => (
                <tr key={report._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{report.reportType}</td>
                  <td className="p-3 border">{report.review}</td>
                  <td className="p-3 border">{report.status}</td>
                  <td className="p-3 border">
                    <a
                      href={report.reportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="p-3 border">{report.patient?.email}</td>
                  <td className="p-3 border">{report.phoneNumber}</td>
                  <td className="p-3 border">
                    {new Date(report.updatedAt).toLocaleString()}
                  </td>
                  {user?.accountType === ACCOUNT_TYPE.ADMIN && (
                    <td className="p-3 border">{report.expert}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ReviewedReport
