import React from 'react'
import { BiCheckCircle } from 'react-icons/bi'


const ReportSubmittedMessage = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-green-50 border border-green-300 rounded-lg shadow">
      <div className="flex items-center gap-3 mb-4">
        <BiCheckCircle className="text-green-600 w-6 h-6" />
        <h2 className="text-xl font-semibold text-green-700">
          Report Submitted Successfully!
        </h2>
      </div>

      <p className="text-gray-700 mb-2">
        Thank you for submitting your medical report.
      </p>
      <p className="text-gray-700">
        One of our medical experts will review your report and contact you shortly on the provided phone number.
      </p>
    </div>
  )
}

export default ReportSubmittedMessage
