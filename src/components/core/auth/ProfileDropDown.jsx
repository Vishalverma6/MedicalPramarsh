import React, { useRef, useState } from 'react'
import { AiOutlineCaretDown } from 'react-icons/ai';
import { VscDashboard, VscSignOut } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { logout } from '../../../services/operations/authAPI';

const ProfileDropDown = () => {

    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, ()=> setOpen(false))


    if (!user) return null

    return (
            <button className='relative cursor-pointer'
             onClick={() => setOpen(true)}
            >
                <div className='flex items-center gap-x-1 '>
                    <img
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className='aspect-square w-[30px] rounded-full  object-cover'
                    />
                    <AiOutlineCaretDown className='text-sm '/>
                </div>
                {
                    open && (
                        <div 
                         onClick={(event) => event.stopPropagation()}
                         className='flex flex-col absolute top-[118%] text-white z-[100] divide-y-[1px] divide-gray-700
                          overflow-hidden rounded-md border-[1px] border-gray-500 bg-gray-600'
                          ref={ref}>
                            <Link to="/dashboard/my-profile"
                             onClick={() => setOpen(false)}
                            >
                                <div className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm
                                 text-gray-100 hover:bg-gray-500 hover:text-gray-50 '>
                                    <VscDashboard className='text-lg' />
                                    Dashboard
                                </div>
                            </Link>
                            <div 
                             onClick={() => {
                                dispatch(logout(navigate))
                                setOpen(false)
                             }}
                            className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-gray-100 hover:bg-gray-500 hover:text-gray-50'>
                                <VscSignOut lassName='text-lg' />
                                Logout
                            </div>
                        </div>
                    )
                }
            </button>
    )
}

export default ProfileDropDown
