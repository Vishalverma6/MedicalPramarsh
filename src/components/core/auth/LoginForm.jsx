import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData

  const changeHandler = (event) => {
    setFormData((prev)=> (
      {
        ...prev,
        [event.target.name]:event.target.value
      }
    ))
  }
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(login(email,password,navigate))

    console.log("Printing the form Data :",formData)
  }
  return (
    <div className='full mt-6'>
      <form onSubmit={submitHandler}
       className=' flex flex-col pb-8 space-y-5'
      >
        <label className='w-full'>
          <p className="text font-medium leading-[1.375] text-gray-700 mb-1">
            Email address <sup className='text-red-500'>*</sup>
          </p>
          <input
            required type='email'
            value={formData.email}
            placeholder='Enter email address'
            name='email'
            onChange={changeHandler}
            className="w-full rounded-[0.5rem] bg-white p-[8px] border-b-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className='w-full relative'>
          <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>
            Password <sup className='text-pink-200'>*</sup>
          </p>
          <input
            required type={showPassword ? ("text") : ("password")}
            value={formData.password}
            placeholder='Enter Password'
            name='password'
            onChange={changeHandler}

            className="w-full rounded-[0.5rem] bg-white p-[8px] border-b-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span onClick={() => setShowPassword((prev) => !prev)}
            className='absolute right-3 top-[36px] cursor-pointer'
          >
            {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' />) :
              (<AiOutlineEye fontSize={24} fill='#AFB2BF' />)}
          </span>

          <Link to="/forgot-password">
            <p className='text-lg mt-1 text-sky-600 max-w-max ml-auto'>
              Forgot Password
            </p>

          </Link>
        </label>
        <button type='submit'
          className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200">
          Sign In
        </button>
      </form>
    </div>
  )
}

export default LoginForm
