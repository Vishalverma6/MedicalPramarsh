import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { updateProfile } from '../../../services/operations/settingsAPI';


const genders = ["Select", "Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

const EditProfile = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitProfileForm = async (data) => {
        try{
            dispatch(updateProfile(token, data))
        } catch(error) {
            console.log("ERROR MESSAGE_ ", error.message)
        }

    }

    return (
        <form onSubmit={handleSubmit(submitProfileForm)}>

            {/* profile information */}
            <div className='w-9/12 flex flex-col gap-y-6 rounded-md bg-gray-700 border-[1px] border-gray-600 px-10 p-7'>
                <h2 className="text-lg font-semibold text-gray-50">
                    Profile Information
                </h2>

                {/* first Name and last Name  */}
                <div className='flex flex-col gap-5 lg:flex-row'>
                    {/* first Name */}
                    <div className='flex flex-col gap-2 lg:w-[48%] '>
                        <label
                            className='text-[14px] text-gray-100 font-semibold'
                            htmlFor='firstName'>
                            First Name
                        </label>
                        <input
                            type='text'
                            name='firstName'
                            id='firstName'
                            placeholder='Enter first name'
                            className='rounded-lg bg-gray-500 p-3 text-[16px] leading-[18px] text-gray-50  shadow-[0_1px_0_0] shadow-white/50 placeholder:text-gray-400 focus:outline-none '
                            {...register("firstName", { required: true })}
                            defaultValue={user?.firstName}
                        />
                        {errors.firstName && (
                            <span className='-mt-1 text-[12px] text-yellow-400'>
                                Please enter Your First Name
                            </span>
                        )}
                    </div>

                    {/* last Name  */}
                    <div className="flex flex-col gap-2 lg:w-[48%]">
                        <label htmlFor='lastName'
                            className='text-[14px] text-gray-100 font-semibold'
                        >
                            Last Name
                        </label>
                        <input
                            type='text'
                            name='lastName'
                            id='lastName'
                            placeholder='Enter Last Name'
                            className='rounded-lg bg-gray-500 p-3 text-[16px] leading-[18px] text-gray-50  shadow-[0_1px_0_0] shadow-white/50 placeholder:text-gray-400 focus:outline-none '
                            {...register("lastName")}
                            defaultValue={user?.lastName}
                        />
                        {/* {
                            errors.lastName && (
                                <span className='-mt-1 text-[12px] text-yellow-400'>
                                    Please enter your Last Name
                                </span>
                            )
                        } */}
                    </div>
                </div>

                {/* Date of Birth And gender */}
                <div className='flex flex-col gap-5 lg:flex-row'>
                    {/* for date of birth */}
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor="dateOfBirth"
                            className='text-[14px] font-semibold text-gray-100'>
                            Date of Birth
                        </label>
                        <input
                            type='date'
                            name='dateOfBirth'
                            id='dateOfBirth'
                            className='rounded-lg bg-gray-500 p-3 cursor-pointer text-[16px] leading-[18px] text-gray-50  shadow-[0_1px_0_0] shadow-white/50 placeholder:text-gray-400 focus:outline-none '
                            {...register("dateOfBirth", {
                                required: {
                                    value: true,
                                    message: "Please enter your Date of Birth .",
                                },
                                max: {
                                    value: new Date().toISOString().split("T")[0],
                                    message: "date of Birth cannot be in future",
                                },
                            })}
                            defaultValue={user?.additionalDetails?.dateOfBirth}
                        />
                        {
                            errors.dateOfBirth && (
                                <span className='-mt-1 text-[12px] text-red-500'>
                                    {errors.dateOfBirth.message}
                                </span>
                            )
                        }
                    </div>

                    {/* For Gender */}
                    <div className='flex flex-col gap-2 lg:w-[48%]' >
                        <label htmlFor="gender"
                            className='text-[14px] font-semibold text-gray-100'>
                            Gender
                        </label>
                        <select
                            type='text'
                            name='gender'
                            id='gender'
                            className='rounded-lg bg-gray-500 p-3 text-[16px] leading-[18px] text-gray-50  shadow-[0_1px_0_0] shadow-white/50 cursor-pointer placeholder:text-gray-400 focus:outline-none '
                            {...register("gender", { required: true })}
                            defaultValue={user?.additionalDetails?.gender}
                        >
                            {
                                genders.map((ele, index) => {
                                    return (
                                        <option key={index} value={ele}>
                                            {ele}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        {
                            errors.gender && (
                                <span className='-mt-1 text-[12px] text-red-500'>
                                    Please select Your Gender
                                </span>
                            )
                        }
                    </div>
                </div>

                {/* Contact Number and About */}
                <div className='flex flex-col gap-5 lg:flex-row'>
                    {/* contact number */}
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor="contactNumber" className='text-[14px] font-semibold text-gray-100'>
                            Contact Number
                        </label>
                        <input
                            type='tel'
                            name='contactNumber'
                            id='contactNumber'
                            className='rounded-lg bg-gray-500 p-3 text-[16px] leading-[18px] text-gray-50  shadow-[0_1px_0_0] shadow-white/50 placeholder:text-gray-400 focus:outline-none '
                            placeholder='Enter Contact Number'
                            {...register("contactNumber", {
                                required: {
                                    value: true,
                                    message: "Please enter your Contact Number .",
                                },
                                maxLength: { value: 12, message: "Invalid Contact Number" },
                                minLength: { value: 10, message: "Invalid Contact Number" },
                            })}
                            defaultValue={user?.contactNumber}
                        />
                        {
                            errors.contactNumber && (
                                <span className='-mt-1 text-[12px] text-yellow-50'>
                                    {errors.contactNumber.message}
                                </span>
                            )
                        }
                    </div>

                    {/* About */}
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor="about" className='text-[14px] font-semibold text-gray-100'>
                            About
                        </label>
                        <input
                            type='text'
                            name='about'
                            id='about'
                            className='rounded-lg bg-gray-500 p-3 text-[16px] leading-[18px] text-gray-50  shadow-[0_1px_0_0] shadow-white/50 placeholder:text-gray-400 focus:outline-none '
                            placeholder='Enter Bio details'
                            {...register("about", {
                                required: {
                                    value: true,
                                    message: "Please enter your About .",
                                },
                            })}
                            defaultValue={user?.additionalDetails?.about}
                        />
                        {
                            errors.about && (
                                <span className='-mt-1 text-[12px] font-semibold text-red-500'>
                                    {errors.about.message}
                                </span>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className='flex gap-2 justify-end w-9/12 mt-6'>
                <button
                    onClick={() => {
                        navigate("/dashboard/my-profile")
                    }}
                    className='bg-gray-500 rounded-md py-2 px-3
                     font-semibold text-gray-50 cursor-pointer
                      '
                >
                    Cancel
                </button>
                <IconBtn
                    text="Save"
                    type="submit"
                />
            </div>
        </form>
    )
}

export default EditProfile
