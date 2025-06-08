import React, { useState } from 'react'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import Tab from '../../common/Tab'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setSignupData } from '../../../slices/authSlice';
import { sendOtp } from '../../../services/operations/authAPI';

const SignupForm = () => {
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.PATIENT);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    // notificationPreference: "",
  });


  const changeHandler = (event) => {
    setFormData((prev) => (
      {
        ...prev,
        [event.target.name]: event.target.value
      }
    ))
  }
  const submitHandler = (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.log("password do not match");
      toast.error("Password do not matched");
      return
    }

    const signupData = {
      ...formData
    };

    const finalData = {
      ...signupData,
      accountType,
    }

    // for the use of signu data after otp verification
    dispatch(setSignupData(finalData));

    // for otp verification
    dispatch(sendOtp(formData.email, navigate))

    // reset form data 
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      contactNumber: "",
      // notificationPreference: "email",
    });

    setAccountType(ACCOUNT_TYPE.STUDENT);
  }

  const tabData = [
    {
      id: 1,
      tabName: "Patient",
      type: ACCOUNT_TYPE.PATIENT,
    },
    {
      id: 2,
      tabName: "Expert",
      type: ACCOUNT_TYPE.EXPERT,
    },
  ]
  return (
    <div className='w-full'>
      {/* tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      {/* form */}
      <form onSubmit={submitHandler} className="pb-8 rounded-lg  space-y-5">
        {/* First Name and Last Name */}
        <div className="flex  flex-row gap-x-4">
          <label className="">
            <p className="text font-medium leading-[1.375] text-gray-700 mb-1">
              First Name <sup className="text-red-500">*</sup>
            </p>
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={changeHandler}
              className="w-full rounded-[0.5rem] bg-white p-[8px] border-b-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </label>
          <label className="mt-[2px]">
            <p className="text-sm font-medium text-gray-700 mb-1">
              Last Name <sup className="text-red-500">*</sup>
            </p>
            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={changeHandler}
              className="w-full rounded-[0.5rem] bg-white p-[8px] border-b-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </label>
        </div>

        {/* Email Address */}
        <div>
          <label>
            <p className="text-sm font-medium text-gray-700 mb-1">
              Email Address <sup className="text-red-500">*</sup>
            </p>
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={changeHandler}
              className="w-full rounded-[0.5rem] bg-white p-[8px] border-b-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </label>
        </div>

        {/* Phone Number */}
        <div>
          <label>
            <p className="text-sm font-medium text-gray-700 mb-1">
              Phone Number <sup className="text-red-500">*</sup>
            </p>
            <div className="flex space-x-2">
              <select
                id="country-code"
                name="country-code"
                className="border className='cursor-pointer' border-gray-300 rounded-md p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                defaultValue="+91"
              >
                <option value="+91">+91 (India)</option>
                <option value="+1">+1 (USA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (Australia)</option>
                <option value="+81">+81 (Japan)</option>
              </select>
              <input
                type="tel"
                name="contactNumber"
                placeholder="Enter your Phone Number"
                value={formData.contactNumber}
                pattern="[0-9]{10}"
                onChange={changeHandler}
                className="w-full rounded-[0.5rem] bg-white p-[8px] border-b-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </label>
        </div>

        {/* Password and Confirm Password */}
        <div className="flex flex-col md:flex-row md:space-x-4">
          <label className="flex-1 relative">
            <p className="text-sm font-medium text-gray-700 mb-1">
              Create Password <sup className="text-red-500">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              placeholder="Enter password"
              onChange={changeHandler}
              className="w-full rounded-[0.5rem] bg-white p-[8px] border-b-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={20} />
              ) : (
                <AiOutlineEye fontSize={20} />
              )}
            </span>
          </label>

          <label className="flex-1 relative mt-4 md:mt-0">
            <p className="text-sm font-medium text-gray-700 mb-1">
              Confirm Password <sup className="text-red-500">*</sup>
            </p>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Confirm Password"
              onChange={changeHandler}
              className="w-full rounded-[0.5rem] bg-white p-[8px] border-b-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={20} />
              ) : (
                <AiOutlineEye fontSize={20} />
              )}
            </span>
          </label>
        </div>

        {/* Notification prefernce  */}
        {/* {accountType === ACCOUNT_TYPE?.EXPERT && (
          <div className="text-sm font-medium text-gray-700 mb-1">
            <label>
              <p>
                Notification Preference <sup className='text-red-500'></sup>
              </p>
              <select
                name='notificationPreference'
                value={formData.notificationPreference}
                onChange={changeHandler}
                className='w-full cursor-pointer rounded-[0.5rem] bg-white p-[8px] border-b-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              >
                <option value="email">Email</option>
                <option value="sms">SMS</option>
                <option value="whatsapp">WhatsApp</option>
              </select>
            </label>
          </div>
        )} */}

        {/* Create Account Button */}
        <button
          type="submit"
          className="w-full mt-6 cursor-pointer bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Create Account
        </button>
      </form>

    </div>
  )
}

export default SignupForm
