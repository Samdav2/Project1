import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
/*import EventForm, { TicketingForm } from "./pages/TicketingForm/TicketingForm"
import RegistrationForm from "./pages/TablesRegistrationForm/RegistrationForm"
import {EventPage} from "./pages/PrivateEvent/EventPage"
/*import {NotificationPage} from "./pages/NotificationScreen/NotificationPage"*/
/*import {EmptyNotification} from "./pages/NotificationScreen/EmptyNotification"
import SignUpPage from "./pages/SignUp/signUp";
import LoginPage from "./pages/LoginPage/LoginPage";
import EmailVerify from "./components/Ui/emailVerify";
import ProfileCreation from "./pages/ProfileCreation/ProfileCreation";
import MainDashboard from "./pages/MainDashboard/MainDashboard";
import Sidebar from "./components/Ui/Sidebar"
import {Mapview} from "./pages/Mapview/MapView"
import {Calendar} from "./pages/Calender/Calendar"
import {LandingPage} from "./pages/LandingPage/LandingPage"
import {UserProfile} from "./pages/User/UserProfile"
import {CreateEvent} from "./pages/createEvent/CreateEvent"
import Success from "./components/Ui/Success";
import Error from "./components/Ui/Error";
import UpdateUserProfile from "./components/Ui/updateUserProfile";
import UpdateCreatorProfile from "./components/Ui/updateCreatorProfile";
import TicketGenerator from "./pages/TicketGeneration/TicketGeneration";
import VerifyTicket from "./pages/VerifyTicket/VeryfyTicket";
import ResetPassword from "./pages/ResetPassword";*/
import NavBar from "./components/NavBar";
import Overview from "./components/Dashboard/Overview";
import EventsList from "./components/Dashboard/EventsList";
import Analytics from "./components/Dashboard/Analytics";
import ProfileSettings from "./components/Dashboard/ProfileSettings";
import DashBoard from "./components/Dashboard/Dashboard";

//import "./Dashboard.css";

import './App.css'



function App() {
  return(
   
    <div className="dashboard">
      <Routes>
      <Route path="/dashboard"  element={<DashBoard/>} />
      </Routes>

    </div>





      )
}

export default App
