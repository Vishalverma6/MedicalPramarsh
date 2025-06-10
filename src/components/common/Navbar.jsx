import React from 'react'
import { Link, matchPath, matchRoutes, useLocation, useNavigate } from 'react-router-dom'
import Logo from "../../assets/logo1.png"
import { NavbarLinks } from '../../data/navbar-links'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../services/operations/authAPI'
import ProfileDropDown from '../core/auth/ProfileDropDown'

const Navbar = () => {
    const { token } = useSelector((state) => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-gray-700 bg-gradient-to-l from-blue-100 to-white'>
            <div className='flex w-11/12  items-center  md:justify-between md:px-40 gap-x-5'>
                <Link to="/"
                    className='mt-9 md:items-center cursor-pointer mb-10 hidden md:flex text-center'
                >
                   
                    <img src={Logo} alt='medicalpramarsh'
                        width={80} height={30} loading='lazy' className='cursor-pointer' />
                </Link>

                {/* nav Links  */}
                <nav>
                    <ul className='flex gap-x-2 md:gap-x-6'>
                        {
                            NavbarLinks?.map((link, index) => {
                                const hideOnMobile = ['About Us', 'Contact Us'].includes(link.title);

                                return (
                                    <li key={index} className={hideOnMobile ? 'hidden md:block' : ''}>
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link.path) ? 'text-yellow-400' : 'text-black'} hover:translate-y-0.5`}>
                                                {link?.title}
                                            </p>
                                        </Link>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </nav>

                {/* Signup And login Button */}
                <div className='flex gap-x-3 md:gap-x-4'>
                    {
                        token === null && (
                            <Link to="/login">
                                <button className='cursor-pointer border border-richblack-700 bg-richblack-800 px-[10px] py-[6px]
                                text-richblack-100 rounded-md'>
                                    Log In
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='cursor-pointer border px-[10px] py-[6px]
                                  rounded-md'>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }

                    {/* Profile Dropdown  */}
                    {
                        token !== null && (<ProfileDropDown />)
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
