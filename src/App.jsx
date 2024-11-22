import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
 /*import {ResetPassword} from "./pages/ResetPassword"*/
 /*import EventForm from "./pages/TicketingForm/TicketingForm"*/
/*import RegistrationForm from "./pages/TablesRegistrationForm/RegistrationForm"*/
import {EventPage} from "./pages/PrivateEvent/EventPage"
/*import {NotificationPage} from "./pages/NotificationScreen/NotificationPage"*/
import {EmptyNotification} from "./pages/NotificationScreen/EmptyNotification"
import {CardFormCard} from "./pages/PaymentPage/CardFormCard"
import SignUpPage from "./pages/SignUp/signUp";
import LoginPage from "./pages/LoginPage/LoginPage";
import EmailVerify from "./components/Ui/emailVerify";
import ProfileCreation from "./pages/ProfileCreation/ProfileCreation";
import MainDashboard from "./pages/MainDashboard/MainDashboard";
import Sidebar from "./components/Ui/Sidebar"
import './App.css'



function App() {
  return (

      <div className="main-content">
        <Routes>
         {/* <Route path="/" element={<MainDashboard />} /> */}
         {/* <Route path="/analytics" element={<AnalyticsCards />} />
          <Route path="/big-cards" element={<BigCards />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/orders" element={<OrdersOverview />} /> */}
          <Route path="/" element={ <SignUpPage />} />
          <Route path="/login" element={ <LoginPage />} />
          <Route path="/email" element={<EmailVerify/>} />
          <Route path="/create-profile" element={<ProfileCreation />} />
          <Route path="/creator-dashboard" element={<MainDashboard />} />


        </Routes>
      </div>

  );
}

export default App;
