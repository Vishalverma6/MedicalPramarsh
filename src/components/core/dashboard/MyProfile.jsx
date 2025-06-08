import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FaRegEdit } from 'react-icons/fa';
import IconBtn from '../../common/IconBtn';

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();


  return (
    <div className='flex flex-col w-full p-3 md:w-11/12 mt-10 md:mt-80 lg:mt-5  text-white gap-10 items-center '>
      <h1 className='text-3xl text-black mr-auto ml-36 font-semibold'>
        My Profile
      </h1>

      {/* section 1*/}
      <div className='flex flex-col md:flex-row h-full md:w-9/12 items-center justify-between
      bg-gray-600 p-2 px-2 md:p-6 md:px-10 rounded-md border border-gray-500'>
        <div className='flex gap-x-1 md:gap-x-4 items-center'>
          <img src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[30px] md:w-[70px] rounded-full object-cover"
          />
          <div className='flex flex-col gap-1'>
            <p className='capitalize  font-semibold'> {user?.firstName + " " + user?.lastName}</p>
            <p className='text-gray-300'>{user?.email}</p>
          </div>
        </div>
        <div className='ml-auto md:mt-[-40px]'>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <FaRegEdit />
          </IconBtn>
        </div>
      </div>

      {/* section 2 */}
      <div className='flex w-full md:w-9/12 items-center justify-between
      bg-gray-600 p-6 px-10 rounded-md border border-gray-500'>
        <div className='flex flex-col gap-y-7'>
          <p className='font-semibold'>About</p>
          <p className='text-gray-300'>{user?.additionalDetails?.about ?? "write something about Yourself"}</p>
        </div>

        <div className='mb-auto md:mt-[-20px]'>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <FaRegEdit className='' />
          </IconBtn>
        </div>
      </div>

      {/* section 3 */}
      <div className='flex w-full  md:w-9/12 items-center justify-between
      bg-gray-600 py-2 px-3 md:p-6 md:px-10 rounded-md border border-gray-500' >
        <div>
          <div className='flex  flex-col gap-10'>
            Personal details
          </div>

          <div className='flex flex-col md:flex-row md:items-center items-start gap-x-32'>
            <div className='flex flex-col gap-5'>
              <div>
                <p className='text-gray-300'>First Name</p>
                <p className=' capitalize font-semibold'> {user?.firstName}</p>
              </div>
              <div>
                <p className='text-gray-300'>Email</p>
                <p className=' capitalize font-semibold'>{user?.email}</p>
              </div>
              <div>
                <p className='text-gray-300'>Gender</p>
                <p className=' capitalize font-semibold'>{user?.additionalDetails?.gender ?? "Add your Gender"}</p>
              </div>
            </div>

            <div className='flex flex-col gap-5'>
              <div className='flex flex-col gap-1 '>
                <p className='text-gray-300'>Last Name</p>
                <p className=' capitalize font-semibold'>{user?.lastName}</p>
              </div>
              <div>
                <p className='text-gray-300'>Phone Number</p>
                <p className=' capitalize font-semibold'>{user?.additionalDetails?.contactNumber ?? "add Phone number"}</p>
              </div>
              <div>
                <p className='text-gray-300'>Date of Birth</p>
                <p className=' capitalize font-semibold'>{user?.additionalDetails?.dateOfBirth ?? "Add Date of birth"}</p>
              </div>

            </div>
          </div>
        </div>

        <div className='mb-auto  '>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <FaRegEdit className='' />
          </IconBtn>
        </div>
      </div>

    </div>
  )
}

export default MyProfile
