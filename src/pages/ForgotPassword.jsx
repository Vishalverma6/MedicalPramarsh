import React, { useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';

const ForgotPassword = () => {
    const { loading } = useSelector((state) => state.auth);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();


    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent))
    }
    return (
        <div className='full h-screen bg-gradient-to-r from-sky-100 '>
            <div className='flex mt-[90px] ml-[50px] items-center justify-center text-black '>
                {
                    loading ? (
                        <div className='spinner'></div>
                    ) : (
                        <div className='max-w-[500px] p-2 lg:p-6'>
                            <h1 className='text-[1.875rem] font-semibold leading-[2.375]'>
                                {
                                    !emailSent ? "Reset your Password" : "Check Your Email"
                                }
                            </h1>
                            <p className=' text-[1.125rem] leading-[1.625rem] text-gray-700'>
                                {
                                    !emailSent ?
                                        "Have no fear. we'll email you intructions to reset your password. if you don't have access to your email we can try account recovery."
                                        : `We have sent the reset email ${email}`
                                }
                            </p>
                            <form onSubmit={submitHandler}
                                className='flex flex-col '>
                                {
                                    !emailSent && (
                                        <label className='w-full'>
                                            <p className='mb-1 leading-[1.375] mt-4 text-[0.875rem] text-gray-800'>
                                                Email Address <sup className='text-red-500'>*</sup>
                                            </p>
                                            <input
                                                required
                                                type='email'
                                                name='email'
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder='Enter Your email addess'
                                                className=' w-full bg-gray-200 p-[8px] border-b-2 focus:outline-none focus:ring-2 focus:ring-blue-500  rounded-md'
                                            />
                                        </label>
                                    )
                                }
                                <button
                                    type='submit'
                                    className='mt-6 w-full rounded-[8px] cursor-pointer bg-blue-600 py-[11px] px-[12px] font-medium'
                                >
                                    {
                                        !emailSent ? "Submit" : "Resend Email"
                                    }
                                </button>
                            </form>

                            <div className='mt-6 flex items-center justify-between'>
                                <Link to="/login">
                                    <p className='flex items-center gap-x-2 text-black font-semibold'>
                                        <BiArrowBack />
                                        Back to Login Page
                                    </p>
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default ForgotPassword
