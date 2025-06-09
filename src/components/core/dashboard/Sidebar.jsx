import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sidebarLinks } from '../../../data/dashboard-links';
import SidebarLink from './SidebarLink';
import { VscSignOut } from 'react-icons/vsc';
import { IoClose } from "react-icons/io5";
import ConfirmationalModal from '../../common/ConfirmationalModal';
import { logout } from '../../../services/operations/authAPI';
import { ACCOUNT_TYPE } from '../../../utils/constants';

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user, loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  if (authLoading || profileLoading) {
    return <div className='spinner mt-10'>Loading...</div>;
  }

  const dashboardTitle =
    user?.accountType === ACCOUNT_TYPE.PATIENT
      ? "Patient Dashboard"
      : user?.accountType === ACCOUNT_TYPE.EXPERT
        ? "Expert Dashboard"
        : user?.accountType === ACCOUNT_TYPE.ADMIN
          ? "Admin Dashboard"
          : "";

  return (
    <>
      <div
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-blue-100 text-gray-700
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0 max-w-[200px]' : '-translate-x-full'}
          md:translate-x-0 md:static md:block border-r border-black
        `}
      >
        {/* Close button on small screens */}
        <div className="flex justify-end md:hidden p-4">
          <button onClick={() => setIsSidebarOpen(false)}>
            <IoClose className="cursor-pointer text-2xl text-gray-800" />
          </button>
        </div>

        {/* Dashboard title */}
        {dashboardTitle && (
          <div className='text-center mt-6 font-bold text-lg text-gray-800 bg-blue-200 mx-3 px-3 py-2 rounded-md mb-4'>
            {dashboardTitle}
          </div>
        )}

        {/* Sidebar Links */}
        <div className="flex flex-col h-[calc(100vh-3.5rem)] py-4 px-4">
          <div className='flex flex-col gap-2'>
            {sidebarLinks.map((link) => {
              if (link.type && user.accountType !== link.type) return null;
              return (
                <SidebarLink
                  key={link?.id}
                  link={link}
                  setIsSidebarOpen={setIsSidebarOpen}
                  iconName={link?.icon}
                />
              );
            })}
          </div>

          {/* Line separator */}
          <div className='mx-auto my-6 h-[1px] w-10/12 bg-black'></div>

          {/* Settings */}
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />

          {/* Logout */}
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are You Sure?",
                text2: "You will be logged out of your account",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className='mt-auto cursor-pointer text-left px-4 text-sm font-semibold text-gray-600'
          >
            <div className='flex items-center gap-2 mb-56 ml-4'>
              <VscSignOut className='text-lg' />
              <span className='text-lg'>Logout</span>
            </div>
          </button>
        </div>
      </div>

      {/* Confirmation modal */}
      {confirmationModal && (
        <div className='absolute inset-0 flex items-center justify-center z-[60]'>
          <ConfirmationalModal modalData={confirmationModal} />
        </div>
      )}
    </>
  );
};

export default Sidebar;
