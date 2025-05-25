import React from 'react'
import { useForm } from 'react-hook-form'
import reportTypes from '../../../data/report-type';
import countryCode from '../../../data/country-code';
import { useDispatch, useSelector } from 'react-redux';
import { uploadReport } from '../../../services/operations/reportAPI';
import { useNavigate } from 'react-router-dom';

const UploadReport = () => {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("report", data?.report[0]);
      formData.append("reportType", data?.reportType);
      formData.append("description", data.description || "");
      formData.append("phoneNumber", data.phoneNumber);

      await dispatch(uploadReport(formData, token, navigate));
      reset();
    } catch (error) {
      console.log("Upload Error");
    }
  }


  return (
    <div className='max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Upload Medical Report
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        {/* report type */}
        <div>
          <label className='block font-medium text-gray-700 mb-1'>Report Type</label>
          <select
            {...register("reportType", { required: "Report Type is required" })}
            className="w-full cursor-pointer border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Report Type --</option>
            {reportTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
          {errors.reportType && (
            <p className="text-red-500 text-sm mt-1">{errors.reportType.message}</p>
          )}
        </div>

        {/* report file */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Upload Report (PDF or Image)</label>
          <input
            type='file'
            accept='.pdf,image/*'
            {...register("report", { required: "Report file is required" })}
            className='w-full p-2 cursor-pointer bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
          {errors.report && (
            <p className="text-red-500 text-sm mt-1">{errors.report.message}</p>
          )}
        </div>

        {/* phone number */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Phone Number</label>
          <div className="flex gap-3">
            <select
              {...register("countryCode", { required: "Country code is required" })}
              defaultValue="+91"
              className="border rounded px-2 py-2 w-[40%] focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {countryCode.map((code) => (
                <option key={code.code} value={code.code}>
                  {code.code} ({code.country})
                </option>
              ))}
            </select>

            <input
              type="tel"
              placeholder="Enter phone number"
              {...register("phoneNumber", { required: "Phone number is required" })}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {errors.countryCode && (
            <p className="text-red-500 text-sm mt-1">{errors.countryCode.message}</p>
          )}
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
          )}
        </div>

        {/* description */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Description (Optional)</label>
          <textarea
            {...register("description")}
            rows="3"
            placeholder="Enter a brief description..."
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* consent */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            {...register("consent", { required: "You must agree before submitting." })}
            className="mt-1 cursor-pointer accent-blue-600"
            id="consent"
          />
          <label htmlFor="consent" className="text-sm text-gray-700">
            I hereby give my consent for my medical report to be reviewed and used for medical consultation.
          </label>
        </div>
        {errors.consent && (
          <p className="text-red-500 text-sm mt-1">{errors.consent.message}</p>
        )}

        {/* submit button */}
        <button
          type='submit'
          disabled={isSubmitting}
          className="w-full bg-blue-600 cursor-pointer  text-white font-semibold py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          {isSubmitting ? "Uploading..." : "Upload Report"}
        </button>
      </form>
    </div>

  )
}

export default UploadReport
