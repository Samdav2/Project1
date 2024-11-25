import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import ResetPassword from "./pages/ResetPassword"
 /*import EventForm from "./pages/TicketingForm/TicketingForm"*/
import RegistrationForm from "./pages/TablesRegistrationForm/RegistrationForm"
import {EventPage} from "./pages/PrivateEvent/EventPage"
/*import {NotificationPage} from "./pages/NotificationScreen/NotificationPage"*/
import {EmptyNotification} from "./pages/NotificationScreen/EmptyNotification"
import SignUpPage from "./pages/SignUp/signUp";
import LoginPage from "./pages/LoginPage/LoginPage";
import EmailVerify from "./components/Ui/emailVerify";
import ProfileCreation from "./pages/ProfileCreation/ProfileCreation";
import MainDashboard from "./pages/MainDashboard/MainDashboard";
import Sidebar from "./components/Ui/Sidebar"
import {Mapview} from "./pages/Mapview/MapView"
import{TitleBar} from "./pages/Calender/TitleBar"
import {LandingPage} from "./pages/LandingPage/LandingPage"
import {UserProfile} from "./pages/User/UserProfile"
import {CreateEvent} from "./pages/createEvent/CreateEvent"

import './App.css'



function App() {
  return (

      <div className="page">
        <Routes>
         {/* <Route path="/" element={<MainDashboard />} /> */}
         {/* <Route path="/analytics" element={<AnalyticsCards />} />
          <Route path="/big-cards" element={<BigCards />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/projects" element={<ProjectList
}/>} />
          <Route path="/orders" element={<OrdersOverview />} /> */}
          <Route path="/" element={ <SignUpPage />} />
          <Route path="/login" element={ <LoginPage />} />
          <Route path="/email" element={<EmailVerify/>} />
          <Route path="/create-profile" element={<ProfileCreation />} />
          <Route path="/creator-dashboard" element={<MainDashboard />} />
          <Route path='/reset-password' element={<ResetPassword/>} />
          <Route path='/user-dashboard' element={<UserProfile />} />
         <Route path='/map-view' element={<TitleBar />} />
         <Route path='/login' element={<LoginPage />} />
         <Route path='/add-event' element={<CreateEvent />} />
      </Routes>
      </div>
      )
}

export default App
