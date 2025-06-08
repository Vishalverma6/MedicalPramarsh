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
        try {
            dispatch(updateProfile(token, data))
        } catch (error) {
            console.log("ERROR MESSAGE_ ", error.message)
        }

    }

    return (
        <form
            onSubmit={handleSubmit(submitProfileForm)}
            className="w-9/12  flex flex-col  md:mt-80 lg:mt-5  items-center "
        >
            <div className="w-full max-w-[90rem] flex flex-col gap-y-6 rounded-md bg-gray-700 border border-gray-600 px-4 py-6 sm:px-6 sm:py-7 md:px-10 md:py-8">
                <h2 className="text-lg md:text-xl font-semibold text-gray-50">Profile Information</h2>

                {/* First and Last Name */}
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex flex-col gap-2 w-full md:w-1/2">
                        <label htmlFor="firstName" className="text-sm text-gray-100 font-semibold">First Name</label>
                        <input
                            {...register("firstName", { required: true })}
                            defaultValue={user?.firstName}
                            type="text"
                            id="firstName"
                            className="rounded-lg bg-gray-500 p-3 text-gray-50 placeholder:text-gray-400 focus:outline-none"
                            placeholder="Enter first name"
                        />
                        {errors.firstName && <span className="text-xs text-yellow-400">Please enter Your First Name</span>}
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-1/2">
                        <label htmlFor="lastName" className="text-sm text-gray-100 font-semibold">Last Name</label>
                        <input
                            {...register("lastName")}
                            defaultValue={user?.lastName}
                            type="text"
                            id="lastName"
                            className="rounded-lg bg-gray-500 p-3 text-gray-50 placeholder:text-gray-400 focus:outline-none"
                            placeholder="Enter Last Name"
                        />
                    </div>
                </div>

                {/* DOB and Gender */}
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex flex-col gap-2 w-full md:w-1/2">
                        <label htmlFor="dateOfBirth" className="text-sm text-gray-100 font-semibold">Date of Birth</label>
                        <input
                            {...register("dateOfBirth", {
                                required: { value: true, message: "Please enter your Date of Birth." },
                                max: { value: new Date().toISOString().split("T")[0], message: "Date of Birth cannot be in future" }
                            })}
                            defaultValue={user?.additionalDetails?.dateOfBirth}
                            type="date"
                            id="dateOfBirth"
                            className="rounded-lg bg-gray-500 p-3 text-gray-50 placeholder:text-gray-400 focus:outline-none"
                        />
                        {errors.dateOfBirth && <span className="text-xs text-red-500">{errors.dateOfBirth.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-1/2">
                        <label htmlFor="gender" className="text-sm text-gray-100 font-semibold">Gender</label>
                        <select
                            {...register("gender", { required: true })}
                            defaultValue={user?.additionalDetails?.gender}
                            id="gender"
                            className="rounded-lg bg-gray-500 p-3 text-gray-50 placeholder:text-gray-400 focus:outline-none"
                        >
                            {genders.map((ele, i) => (
                                <option key={i} value={ele}>{ele}</option>
                            ))}
                        </select>
                        {errors.gender && <span className="text-xs text-red-500">Please select Your Gender</span>}
                    </div>
                </div>

                {/* Contact and About */}
                <div className="flex flex-col md:flex-row gap-5">
                    <div className="flex flex-col gap-2 w-full md:w-1/2">
                        <label htmlFor="contactNumber" className="text-sm text-gray-100 font-semibold">Contact Number</label>
                        <input
                            {...register("contactNumber", {
                                required: { value: true, message: "Please enter your Contact Number." },
                                minLength: { value: 10, message: "Invalid Contact Number" },
                                maxLength: { value: 12, message: "Invalid Contact Number" }
                            })}
                            defaultValue={user?.contactNumber}
                            type="tel"
                            id="contactNumber"
                            className="rounded-lg bg-gray-500 p-3 text-gray-50 placeholder:text-gray-400 focus:outline-none"
                            placeholder="Enter Contact Number"
                        />
                        {errors.contactNumber && <span className="text-xs text-yellow-50">{errors.contactNumber.message}</span>}
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-1/2">
                        <label htmlFor="about" className="text-sm text-gray-100 font-semibold">About</label>
                        <input
                            {...register("about", {
                                required: { value: true, message: "Please enter your About." }
                            })}
                            defaultValue={user?.additionalDetails?.about}
                            type="text"
                            id="about"
                            className="rounded-lg bg-gray-500 p-3 text-gray-50 placeholder:text-gray-400 focus:outline-none"
                            placeholder="Enter Bio details"
                        />
                        {errors.about && <span className="text-xs font-semibold text-red-500">{errors.about.message}</span>}
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end items-center gap-3 w-full max-w-[90rem] mt-6">
                <button
                    type="button"
                    onClick={() => navigate("/dashboard/my-profile")}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md font-semibold"
                >
                    Cancel
                </button>
                <IconBtn text="Save" type="submit" />
            </div>
        </form>


    )
}

export default EditProfile
