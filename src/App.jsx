import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/common/Navbar'
import Error from './pages/Error'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import OpenRoute from './components/core/auth/OpenRoute'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'
import ConfirmationPage from './pages/ConfirmationPage'
import PrivateRoute from './components/core/auth/PrivateRoute'
import Dashboard from './pages/Dashboard'
import MyProfile from './components/core/dashboard/MyProfile'
import Setting from './components/core/setting/index'
import EditProfile from './components/core/setting/EditProfile'
import DashboardHome from './components/core/dashboard/DashboardHome'
import UploadReport from './components/core/report/UploadReport'
import PreviousReport from './components/core/report/PreviousReport'
import ReportSubmittedMessage from './components/core/report/ReportSubmittedMessage'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'
import PendingExpert from './components/core/expert/PendingExpert'
import { useSelector } from 'react-redux'
import { ACCOUNT_TYPE } from './utils/constants'
import PendingReport from './components/core/report/PendingReport'
import AddReview from './components/core/report/AddReview'
import ReviewedReport from './components/core/report/ReviewedReport'

function App() {
  const { user } = useSelector((state) => state.profile);


  return (
    <>
      <div className='w-screen min-h-screen bg-[#F9F9F9] flex flex-col'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />



          <Route
            path='/signup'
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
          <Route
            path='/login'
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>

            } />

          <Route
            path='/forgot-password'
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            } />

          <Route
            path='/update-password/:token'
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>

            } />

          <Route
            path="/verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />

          <Route
            path='/confirmation'
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />

          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path='/dashboard/home' element={<DashboardHome />} />
            <Route path='/dashboard/my-profile' element={<MyProfile />} />

            <Route path='/dashboard/settings' element={<Setting />} />


            <Route path='/dashboard/upload-report' element={<UploadReport />} />
            <Route path='/dashboard/previous-report/:patientId' element={<PreviousReport />} />
            <Route path='/report-submitted' element={<ReportSubmittedMessage />} />

            {
              user?.accountType === ACCOUNT_TYPE?.ADMIN && (
                <Route path='/dashboard/pending-expert' element={<PendingExpert />} />
              )
            }

            {
              user?.accountType === ACCOUNT_TYPE?.EXPERT && (
                <Route path='/dashboard/add-review/:reportId' element={<AddReview />} />
              )
            }

            {
              (user?.accountType === ACCOUNT_TYPE?.ADMIN || user?.accountType === ACCOUNT_TYPE?.EXPERT) && (
                <>
                  <Route path='/dashboard/pending-report' element={<PendingReport />} />
                  <Route path='/dashboard/previous-reviewed-report' element={<ReviewedReport />} />
                </>

              )
            }


          </Route>


          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </div>

    </>
  )
}

export default App
