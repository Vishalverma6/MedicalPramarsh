import React from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

const Template = ({ title, desc1, desc2, image1, formtype }) => {
    return (
        <div className='flex w-11/12 max-w-[1100px] justify-between items-center py-12 mt-7 md:gap-x-36 bg-gradient-to-l from-blue-50 '>
            {/* lect part */}
            <div className='mx-auto w-full  max-w-[500px] md:mx-0 px-10 '>
                <h1 className='text-black text-[1.875rem] font-semibold leading-[2.375rem]'>{title}</h1>
                <p className='mt-4 text-[1.125rem] leading-[1.625rem]'>
                    <span className='text-gray-700'>{desc1}</span> <br/>
                    <span className='font-edu-sa font-bold italic text-sky-600  text-[1rem]'>{desc2}</span>
                </p>
                {formtype === "signup" ? (<SignupForm />) : (<LoginForm />)}
            </div>

            {/* Right part(image part) */}
            <div className={`${formtype === "signup" ? "-mt-[214px]": "-mt-40" }  hidden w-11/12 max-w-[450px] md:flex  shadow-2xl shadow-slate-800`}>
                <img 
                    src={image1}
                    width={500}
                    height={600}
                    loading='lazy'
                    className='bg-gradient-to-b from-blue-100  p-6'

                    alt='signup'
                />
            </div>
        </div>
    )
}

export default Template
