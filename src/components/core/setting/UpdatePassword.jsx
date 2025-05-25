import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';
import { changePassword } from '../../../services/operations/settingsAPI';
import { setLoading } from '../../../slices/authSlice';

const UpdatePassword = () => {

    const { token } = useSelector((state) => state.auth)
    const { loading } = useSelector((state) => state.auth)

    const navigate = useNavigate();
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        reset,
    } = useForm();

    const submitPasswordForm = async (data) => {
        try {
            await changePassword(token, data);
            
        } catch (error) {
            console.log("ERROR MESSAGE-",error.message)
        }
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                oldPassword:"",
                newPassword:"",
                confirmNewPassword:"",
            })
        }
    }, [reset,isSubmitSuccessful])
    return (
        <form onSubmit={handleSubmit(submitPasswordForm)}>
            
            <div className='w-9/12 flex flex-col gap-y-6 rounded-md bg-gray-700 border-[1px] border-gray-600 px-10 p-7'>
                <h2 className="text-lg font-semibold text-gray-50">Password</h2>

                {/* current password and new password */}
                <div className='flex flex-col gap-5 lg:flex-row
            '>
                    {/* current password */}
                    <div className='relative flex flex-col gap-2 lg:w-[31%]'>
                        <label htmlFor='oldPassword'
                            className='text-[14px] font-semibold text-gray-100'
                        >
                            Current Password
                        </label>
                        <input
                            type={showOldPassword ? "text" : "password"}
                            name='oldPassword'
                            id="oldPassword"
                            placeholder='Enter Current Password'
                            className='rounded-lg bg-gray-500 p-3  text-[16px] leading-[18px] text-gray-50  shadow-[0_1px_0_0] shadow-white/50 placeholder:text-gray-400 focus:outline-none '
                            {...register("oldPassword", { required: true })}
                        />
                        <span onClick={() => setShowOldPassword((prev) => !prev)}
                            className='absolute right-3 top-[39px] z-[10] cursor-pointer'>
                            {showOldPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                        {errors.oldPassword && (
                            <span className="-mt-1 text-[12px] text-yellow-400">
                                Please enter Current Password
                            </span>
                        )}
                    </div>

                    {/* new password */}
                    <div className='relative flex flex-col gap-2 lg:w-[31%]'>
                        <label htmlFor='newPassword'
                            className='text-[14px] font-semibold text-gray-100'
                        >
                            New Password
                        </label>
                        <input
                            type={showNewPassword ? "text" : "password"}
                            id="newPassword"
                            name='newPassword'
                            placeholder='Enter new Password'
                            className='rounded-lg bg-gray-500 p-3  text-[16px] leading-[18px] text-gray-50  shadow-[0_1px_0_0] shadow-white/50 placeholder:text-gray-400 focus:outline-none '
                            defaultValue=""
                            {...register("newPassword", { required: true })}
                        />
                        <span
                            onClick={() => setShowNewPassword((prev) => !prev)}
                            className='absolute  right-3 top-[39px] z-[10] cursor-pointer'>
                            {showNewPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                        {errors.newPassword && (
                            <span className="-mt-1 text-[12px] text-yellow-400">
                                Please enter New Password
                            </span>
                        )}
                    </div>

                    {/* confirm New Password */}
                    <div className='relative flex flex-col gap-2 lg:w-[31%]'>
                        <label htmlFor='confirmNewPassword'
                            className='text-[14px] font-semibold text-gray-100'
                        >
                            Confirm New Password
                        </label>
                        <input
                            type={showConfirmNewPassword ? "text" : "password"}
                            name='confirmNewPassword'
                            id="confirmNewPassword"
                            placeholder='Enter Confirm New Password'
                            className='rounded-lg bg-gray-500 p-3  text-[16px] leading-[18px] text-gray-50  shadow-[0_1px_0_0] shadow-white/50 placeholder:text-gray-400 focus:outline-none '
                            defaultValue=""
                            {...register("confirmNewPassword", { required: true })}
                        />
                        <span
                            onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                            className='absolute right-3 top-[39px] z-[10] cursor-pointer'>
                            {showConfirmNewPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                        {errors.confirmNewPassword && (
                            <span className="-mt-1 text-[12px] text-yellow-400">
                                Please enter Confirm Password
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className=' w-9/12 mt-6 flex justify-end gap-2'>
                <button
                    onClick={() => {
                        navigate("/dashboard/my-profile")
                    }}
                    className="cursor-pointer rounded-md bg-gray-500 py-2 px-5 font-semibold text-gray-50"
                >
                    Cancel
                </button>

                <IconBtn
                    type="submit"
                    text="Update"
                />
            </div>
        </form>
    )
}

export default UpdatePassword
