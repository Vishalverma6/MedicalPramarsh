import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import bgImage from '../assets/contact-us-bg.jpg';
import contactImage from '../assets/Laboratory-amico.svg';
import Footer from '../components/common/Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen mt-10 flex flex-col bg-white">

      {/* Header */}
      <div
        className="w-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImage})`, height: '300px' }}
      >
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center px-4">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
            <p className="text-lg mt-2">We’re here to help. Get in touch!</p>
          </div>
        </div>
      </div>

      {/* Form & Side Image */}
      <div className="max-w-screen-xl w-full mx-auto bg-white rounded-xl shadow-xl -mt-24 z-10 relative p-6 md:p-16 flex flex-col md:flex-row gap-16 items-stretch">

        {/* Left - Side Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src={contactImage}
            alt="Contact Illustration"
            className="w-full h-full max-h-[600px] object-contain"
          />
        </div>

        {/* Right - Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 flex flex-col gap-6 justify-between"
          noValidate
        >
          <label className="flex flex-col text-gray-700 text-lg">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your Name"
            />
          </label>

          <label className="flex flex-col text-gray-700 text-lg">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Your Email"
            />
          </label>

          <label className="flex flex-col text-gray-700 text-lg flex-grow">
            Message
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              placeholder="Write your message here"
            />
          </label>

          <button
            type="submit"
            className="bg-blue-700 text-white py-3 rounded-md font-semibold hover:bg-blue-800 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Contact Info Section Below */}
      <div className="max-w-[1000px] mx-auto bg-white rounded-xl shadow-md mt-16 p-6 md:p-10 space-y-8">
        <div className="flex items-start gap-4">
          <FaMapMarkerAlt className="text-blue-600 mt-1 text-2xl" />
          <p className="text-gray-800 text-lg">
            Rural Outreach Office: Near Community Health Center, Block - X, District - Y, India
          </p>
        </div>

        <div className="flex items-start gap-4">
          <FaPhoneAlt className="text-blue-600 mt-1 text-2xl" />
          <p className="text-gray-800 text-lg">Helpline & Appointment Queries: +91-90000 12345</p>
        </div>

        <div className="flex items-start gap-4">
          <FaEnvelope className="text-blue-600 mt-1 text-2xl" />
          <p className="text-gray-800 text-lg">Email: support@medicalpramarsh.org</p>
        </div>

        <div className="flex items-start gap-4">
          <FaClock className="text-blue-600 mt-1 text-2xl" />
          <p className="text-gray-800 text-lg">Mon - Fri: 9:00 AM - 6:00 PM</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default ContactUs;
