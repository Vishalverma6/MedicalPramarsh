import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import UpdatePassword from './UpdatePassword'
import DeleteAccounts from './DeleteAccounts'

const Setting = () => {
  return (
    <div className='w-11/12  ml-40 flex flex-col gap-11 md:mt-80 lg:mt-5 mt-16 '>
      <h1 className='  text-2xl font-medium'>
        Edit Profile
      </h1>

      {/* change profile picture  */}
      <ChangeProfilePicture/>

      {/* profile */}
      <EditProfile/>

      {/* Password */}
      <UpdatePassword/>

      {/* delete Account  */}
      <DeleteAccounts/>
    </div>
  )
}

export default Setting
