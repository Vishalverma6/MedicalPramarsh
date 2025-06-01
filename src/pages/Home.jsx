import React from 'react'
import medicalImage from "../assets/Medicalbro.svg";
import medicalImage2 from "../assets/medicalImage2.svg"
import medicalImage3 from "../assets/Laboratory-amico.svg"
import medicalImage4 from "../assets/Medical care-amico.svg"
import Footer from '../components/common/Footer';
import medicalImage5 from "../assets/medicalConcern.svg"


const Home = () => {
    return (
        <div className='w-full mt-6 overflow-x-hidden'>
            {/* section 1  */}
            <section className="w-full  bg-gradient-to-r from-blue-50  py-16 px-6">
                <div className="w-[90%] relative">

                    <div className='flex flex-col opacity-50 md:flex-row justify-between  w-full border border-gray-300 px-4 rounded-md'>
                        <img
                            src={medicalImage}
                            alt="Healthcare Illustration"
                            className=" mb-8 w-full shadow-2xl shadow-sky-300 max-w-md"
                        />
                        <img
                            src={medicalImage2}
                            alt="Healthcare Illustration2"
                            className=" mb-8 w-full max-w-md shadow-2xl shadow-gray-300"
                        />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-85 -mt-24 w-full">
                        <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-lg max-w-3xl text-center z-10">
                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                                Your Trusted Digital Medical Consultation Platform
                            </h1>
                        </div>
                    </div>
                    <div className="flex absolute w-full  flex-col  gap-4 justify-center items-center opacity-85 bg-white/80 backdrop-blur-md p-6 rounded-xl -mt-10">


                        <p className="text-md md:text-lg text-gray-800">
                            Submit your reports and get expert advice from top medical professionals.
                        </p>
                        <div className='flex gap-x-4'>
                            <a
                                href="/submit-report"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-md transition-all"
                            >
                                Submit Report
                            </a>
                            <a
                                href="/signup"
                                className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl shadow-sm transition-all"
                            >
                                Join as Expert
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative bg-gradient-to-r from-white to-blue-50 py-16 px-6 text-gray-800 font-sans mt-10">
                <div className="flex flex-col-reverse md:flex-row justify-between items-center w-full px-4 rounded-md">
                    {/* Text Content */}
                    <div className="w-full md:w-1/2 mt-8 md:mt-0 opacity-70">
                        <div className="bg-white bg-opacity-70 rounded-2xl p-8">
                            <h1 className="text-4xl font-bold text-gray-900 mb-4">Have a Query or Concern?</h1>
                            <p className="text-lg mb-6">
                                Our expert will call you to assist with any medical questions or concerns you may have.
                            </p>
                            <p className="text-lg mb-6">
                                We provide a seamless, secure, and efficient consultation experience. Connect with certified doctors,
                                share reports digitally, and receive professional guidance — all from the comfort of your home.
                            </p>
                        </div>
                    </div>

                    {/* Right-Aligned Image */}
                    <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
                        <img
                            src={medicalImage5}
                            alt="Medical Consultation"
                            className="w-full max-w-lg rounded-lg"
                        />
                    </div>
                </div>
            </section>

            {/* section 2 */}
            <section className="relative  bg-gradient-to-r  from-white to-blue-50 py-16 px-6 text-gray-800 font-sans mt-10">
                <div className='flex flex-col  md:flex-row justify-between w-full   px-4 rounded-md'>
                    <img
                        src={medicalImage3}
                        alt="Healthcare Illustration"
                        className=" mb-8 w-full max-w-md shadow-2xl shadow-blue-300"
                    />

                </div>
                <div className="absolute inset-0  ml-auto mr-20 py-14 px-6 mt-12 mb-12 h-fit bg-white opacity-70 w-[65%] rounded-2xl flex flex-col items-center ">


                    <h1 className="text-4xl font-bold text-gray-900 mb-4">What is Medical Paramarsh?</h1>

                    <p className="text-lg mb-6">
                        Medical Paramarsh is a modern platform designed to bridge the gap between patients and medical experts.
                        It allows users to easily submit their medical reports online and receive trusted, verified feedback
                        from licensed professionals — all while maintaining security and privacy.
                    </p>

                    <ul className="list-disc list-inside space-y-2 text-gray-700 mt-10">
                        <li><strong>Online report submission:</strong> Patients can upload reports in image or PDF formats.</li>
                        <li><strong>Verified expert reviews:</strong> Only certified experts can provide medical feedback.</li>
                        <li><strong>Secure and private platform:</strong> All data is encrypted and handled with care.</li>
                    </ul>
                </div>
            </section>

            {/* section 3 Benefits  */}
            <section class=" relative max-w-6xl bg-gradient-to-b from-white to-blue-100 mb-10 mx-auto px-4 z-30 py-24">
                <img
                    src={medicalImage4}
                    alt="Healthcare Illustration"
                    className=" mb-8 w-full max-w-md absolute -z-10 ml-60"
                />
                <h2 class="text-3xl font-bold text-center text-blue-700 mb-10">Benefits</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-90">
                    {/* <!-- Patient Card --> */}
                    <div class="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                        <h3 class="text-2xl font-semibold text-green-700 mb-4">➤ For Patients</h3>
                        <ul class="space-y-3 text-gray-700">
                            <li class="flex items-start">
                                <span class="text-blue-500 mr-2">✔️</span> Easy report uploads
                            </li>
                            <li class="flex items-start">
                                <span class="text-blue-500 mr-2">✔️</span> Access to qualified experts
                            </li>
                            <li class="flex items-start">
                                <span class="text-blue-500 mr-2">✔️</span> Quick feedback
                            </li>
                        </ul>
                    </div>

                    {/* <!-- Expert Card --> */}
                    <div class="bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                        <h3 class="text-2xl font-semibold text-purple-700 mb-4">➤ For Experts</h3>
                        <ul class="space-y-3 text-gray-700">
                            <li class="flex items-start">
                                <span class="text-blue-500 mr-2">✔️</span> View reports by category
                            </li>
                            <li class="flex items-start">
                                <span class="text-blue-500 mr-2">✔️</span> Provide consultation
                            </li>
                            <li class="flex items-start">
                                <span class="text-blue-500 mr-2">✔️</span> Help patients remotely
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* footer */}
            <Footer />
        </div >
    )
}

export default Home
