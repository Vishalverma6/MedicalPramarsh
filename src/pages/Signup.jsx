import React from 'react'
import Template from '../components/core/auth/Template'
import SignupImage from "../assets/Signup.svg"

const Signup = () => {
    return (
        <div className='flex justify-center  bg-gradient-to-b from-indigo-100 to-gray-100 '>
            <Template
                title="Join Medical Pramarsh"
                desc1="Create your account to securely upload reports and consult with verified experts."
                desc2="Experience quick feedback, trusted medical advice, and private communication — all in one place."
                image1={SignupImage}
                formtype="signup"
            />
        </div>
    )
}

export default Signup
