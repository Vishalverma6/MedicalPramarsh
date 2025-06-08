import React from 'react'
import Logo from '../../assets/logo.png' // adjust the path if needed
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="bg-[#c7daf5] text-gray-800 py-10 mt-18">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-evenly items-center">

                {/* Logo */}
                <div className="flex flex-col items-center mb-6 md:mb-0">
                    <img src={Logo} alt="Medical Pramarsh Logo" className="w-12 h-12" />
                    <span className="text-xl font-semibold mt-2">Medical Pramarsh</span>
                </div>

                {/* Social Media Icons */}
                <div className="text-center">
                    <p className="mb-3 font-medium">STAY IN TOUCH</p>
                    <div className="flex space-x-4 justify-center">
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="bg-white shadow-md hover:shadow-lg p-3 rounded-full transition"
                        >
                            <FaInstagram className="text-pink-500 text-xl" />
                        </a>
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="bg-white shadow-md hover:shadow-lg p-3 rounded-full transition"
                        >
                            <FaFacebook className="text-blue-600 text-xl" />
                        </a>
                        <a
                            href="https://www.twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                            className="bg-white shadow-md hover:shadow-lg p-3 rounded-full transition"
                        >
                            <FaTwitter className="text-sky-500 text-xl" />
                        </a>
                        <a
                            href="https://www.youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="YouTube"
                            className="bg-white shadow-md hover:shadow-lg p-3 rounded-full transition"
                        >
                            <FaYoutube className="text-red-600 text-xl" />
                        </a>
                    </div>
                </div>

            </div>

            <div className="mt-6 text-center text-sm text-gray-600">
                &copy; 2025 Medical Pramarsh. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
