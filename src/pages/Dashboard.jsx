import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/core/dashboard/Sidebar';
import { GiHamburgerMenu } from "react-icons/gi";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (profileLoading || authLoading) {
    return <div className='spinner mt-20'>Loading..</div>;
  }

  return (
    <div className='relative flex min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-slate-200 text-black'>
      
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Mobile hamburger menu */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className='absolute cursor-pointer left-4 top-4 z-50 text-2xl md:hidden'
      >
        <GiHamburgerMenu />
      </button>

      {/* Overlay when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className='h-[calc(100vh-3.5rem)] w-full overflow-auto'>
        <div className='mx-auto w-11/12 py-10 flex'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
