import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaBuilding } from 'react-icons/fa';
import aboutImage from '../assets/about-us.jpg';
import bgImage from '../assets/about-us-bg.jpeg'; // Background image
import Footer from '../components/common/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen mt-10 flex flex-col bg-white">
      
      {/* Header with background image */}
      <div
        className="w-full bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${bgImage})`,
          height: '300px',
        }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
            {/* <p className="text-lg mt-2">For all types of queries</p> */}
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-xl -mt-24 z-10 relative p-6 md:p-12 flex flex-col md:flex-row items-center gap-10">
        {/* Left - Image */}
        <div className="md:w-1/2">
          <img
            src={aboutImage}
            alt="Medical Pramarsh"
            className="w-full max-w-md mx-auto rounded-md"
          />
        </div>

        {/* Right - Content */}
        <div className="md:w-1/2 space-y-5">
          <h2 className="text-2xl font-bold text-blue-800">Medical Pramarsh</h2>
          <p className="text-gray-700 text-lg">
            <strong>Medical Pramarsh</strong> is a healthcare initiative aimed at providing accessible and reliable medical consultations to everyone — especially in rural or underserved areas.
          </p>
          <p className="text-gray-700 text-lg">
            Our mission is to bridge the gap between patients and professional medical advice by offering user-friendly digital platforms for consultations, guidance, and healthcare awareness.
          </p>
          <p className="text-gray-700 text-lg">
            With a dedicated team of doctors, technologists, and volunteers, Medical Pramarsh strives to make healthcare more approachable and informed for everyone.
          </p>
          <p className="text-gray-700 text-lg">
            We believe in empowering individuals through knowledge, offering guidance in local languages, and creating a community where health is a priority, not a privilege.
          </p>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="max-w-7xl mx-auto mt-16 px-6 space-y-12">
        {/* Vision */}
        <div className="bg-blue-50 rounded-xl shadow-md p-6 md:p-10">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">Our Vision</h3>
          <p className="text-gray-700 text-lg">
            To become a trusted digital healthcare platform that ensures quality medical consultation and awareness reach every corner of the country, especially to rural and underserved populations. 
            We envision a healthier society where medical advice is never out of reach for anyone, anywhere.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-blue-50 rounded-xl shadow-md p-6 md:p-10">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">Our Mission</h3>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>To bridge the gap between patients and certified medical professionals through technology.</li>
            <li>To provide multilingual support for greater accessibility in rural and semi-urban regions.</li>
            <li>To raise awareness about preventive healthcare, hygiene, and wellness through digital outreach.</li>
            <li>To work with local authorities, NGOs, and healthcare professionals to ensure trust and credibility.</li>
          </ul>
        </div>
      </div>

      {/* Additional Info */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md mt-16 p-6 md:p-10 space-y-6">
        <div className="flex items-start gap-4">
          <FaMapMarkerAlt className="text-blue-600 mt-1 text-xl" />
          <p className="text-gray-800 text-lg">
            Rural Outreach Office: Near Community Health Center, Block - X, District - Y, India
          </p>
        </div>

        <div className="flex items-start gap-4">
          <FaPhoneAlt className="text-blue-600 mt-1 text-xl" />
          <p className="text-gray-800 text-lg">
            Helpline & Appointment Queries: +91-90000 12345
          </p>
        </div>

        <div className="flex items-start gap-4">
          <FaBuilding className="text-blue-600 mt-1 text-xl" />
          <p className="text-gray-800 text-lg">
            Corporate Office: Medical Pramarsh Foundation, Tech Valley Hub, India
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
