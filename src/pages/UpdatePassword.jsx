import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {
    const { loading } = useSelector((state) => state.auth);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { password, confirmPassword } = formData;

    const changeHandler = (event) => {
        setFormData((prev) => (
            {
                ...prev,
                [event.target.name]: event.target.value,
            }
        ))

    }

    const submitHandler = (event) => {
        event.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password,confirmPassword,token, navigate));
    }

    return (
        <div className='w-full bg-gradient-to-t to-sky-100'>
            <div className='flex mt-[90px] ml-[50px] items-center justify-center text-black '>
                {
                    loading ? (
                        <div className='spinner'>
                            Loading
                        </div>
                    ) : (
                        <div className='max-w-[500px] p-4 lg:p-6'>
                            <h1 className='text-[1.875rem] font-semibold leading-[2.375] text-black'>
                                Choose New Password
                            </h1>
                            <p className='my-4 text-[1.125rem] leading-[1.625rem] text-gray-700'>Almost done. Enter your new password and you're all set</p>
                            <form onSubmit={submitHandler}>
                                <label className='relative'>
                                    <p className='mb-1 text-gray-900 text-[0.875rem] leading-[1.375rem]'>
                                        New Password <sup className='text-red-500'>*</sup>
                                    </p>
                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        name='password'
                                        value={password}
                                        onChange={changeHandler}
                                        placeholder='Enter New Password'
                                        className=' w-full bg-gray-200 p-[8px] border-b-2 focus:outline-none focus:ring-2 focus:ring-blue-500  rounded-md'
                                    />
                                    <span
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className='absolute right-2 top-[32px] z-[10] cursor-pointer'
                                    >
                                        {
                                            showPassword
                                                ? <AiFillEyeInvisible fontSize={24} fill='#AFB2BF' />
                                                : <AiFillEye fontSize={24} fill='#AFB2BF' />
                                        }
                                    </span>
                                </label>
                                <label className='relative mt-3 block'>
                                    <p className='mb-1 text-gray-900 text-[0.875rem] leading-[1.375rem]'>
                                        Confirm New Password <sup className='text-red-500'>*</sup>
                                    </p>
                                    <input
                                        required
                                        type={showConfirmPassword ? "text" : "password"}
                                        name='confirmPassword'
                                        value={confirmPassword}
                                        onChange={changeHandler}
                                        placeholder='Confirm Password'
                                        className='w-full bg-gray-200 p-[8px] border-b-2 focus:outline-none focus:ring-2 focus:ring-blue-500  rounded-md'
                                    />
                                    <span
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        className='absolute right-2 top-[32px] z-[10] cursor-pointer'
                                    >
                                        {
                                            showConfirmPassword
                                                ? <AiFillEyeInvisible fontSize={24} fill='#AFB2BF' />
                                                : <AiFillEye fontSize={24} fill='#AFB2BF' />
                                        }
                                    </span>
                                </label>
                                <button
                                    type='submit'
                                    className='mt-6 w-full rounded-[8px] bg-yellow-500 cursor-pointer py-[11px] px-[12px] font-medium text-black'
                                >
                                    Reset Password
                                </button>
                            </form>
                            <div className="mt-6 flex items-center justify-between">
                                <Link to={"/login"}>

                                    <p className='flex items-center gap-x-2 text-black font-semibold'>
                                        <BiArrowBack />
                                        Back to Login</p>
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default UpdatePassword
