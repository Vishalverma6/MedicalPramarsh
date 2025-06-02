import React, { useEffect, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import OTPInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, signup } from '../services/operations/authAPI';

const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { signupData, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, [navigate, signupData])

    const submitHandler = (event) => {
        event.preventDefault();
        console.log("vishal23")
        const {
            accountType,
            firstName,
            lastName,
            email,
            contactNumber,
            password,
            confirmPassword,
        } = signupData;

        dispatch(signup(accountType, firstName, lastName, email,contactNumber, password,
            confirmPassword, otp, navigate));
    }
    return (
        <div className='w-full h-screen bg-gradient-to-br from-indigo-100 to-gray-100 '>
            <div className='flex items-center justify-center mt-[100px] '>
                {
                    loading ? (
                        <div className='spinner flex flex-col items-center justify-center '>
                            Loading...
                        </div>
                    ) : (
                        <div className="max-w-[500px] p-4 lg:p-8 shadow-md shadow-stone-50 ">
                            <h1 className='font-semibold text-[1.875rem] leading-[2.375rem] text-black'>
                                Verify Email
                            </h1>
                            <p className="text-[1.125rem] leading-[1.625rem] my-4 text-gray-700">A verification code has been sent to you .Enter the code below.</p>
                            <form onSubmit={submitHandler}
                                className='flex flex-col items-center'
                            >
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderInput={(props) =>
                                        <input {...props}
                                            placeholder='-'
                                            style={{
                                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18) "
                                            }}
                                            className='text-white font-semibold w-[48px] lg:w-[40px] border-0 bg-gray-500
                                     rounded-[0.5rem] aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-500'
                                        />
                                    }
                                    containerStyle={{
                                        gap: "0 6px"
                                    }}
                                />
                                <button className='w-full bg-yellow-500 cursor-pointer py-[12px] px-[12px] rounded-[8px]
                                    mt-6  text-black font-semibold'>
                                    Verify Email
                                </button>
                            </form>

                            <div className='flex justify-between'>
                                <div className="mt-6 flex items-center justify-between">
                                    <Link 
                                     onClick={navigate("/login")}
                                    >
                                        <p className='flex items-center gap-x-2 text-black font-semibold'>
                                            <BiArrowBack />
                                            Back to Login
                                        </p>
                                    </Link>
                                </div>
                                <button
                                    className='flex items-center text-sky-900 font-semibold cursor-pointer hover:text-sky-950  gap-x-2 mt-6'
                                onClick={() => dispatch(sendOtp(signupData.email, navigate))} 
                                >
                                    Resend it
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default VerifyEmail
