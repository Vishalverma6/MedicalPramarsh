import React from 'react'
import LoginImage from "../assets/Login.svg"
import Template from '../components/core/auth/Template'
const Login = () => {
    return (
        <div className='flex justify-center h-screen  bg-gradient-to-b from-indigo-100 to-gray-100 '>
            <Template
                title="Welcome Back to Medical Pramarsh"
                desc1="Access your account to submit reports,"
                desc2="Consult experts, and manage your health journey."
                image1={LoginImage}
                formtype="login"
            />
        </div>
    )
}

export default Login
