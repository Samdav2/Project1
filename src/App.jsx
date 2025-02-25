import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import EventForm, { TicketingForm } from "./pages/TicketingForm/TicketingForm"
import EventTablesForm from "./pages/TablesForm/EventTablesForm"
import {EventPage} from "./pages/PrivateEvent/EventPage"
/*import {NotificationPage} from "./pages/NotificationScreen/NotificationPage"*/
import {EmptyNotification} from "./pages/NotificationScreen/EmptyNotification"
import SignUpPage from "./pages/SignUp/signUp";
import LoginPage from "./pages/LoginPage/LoginPage";
import EmailVerify from "./components/Ui/emailVerify";
import ProfileCreation from "./pages/ProfileCreation/ProfileCreation";
import MainDashboard from "./pages/MainDashboard/MainDashboard";
import Sidebar from "./components/Ui/Sidebar"
import MapView from "./pages/Mapview/MapView"
import Calender from "./pages/Calender/Calendar"
import {LandingPage} from "./pages/LandingPage/LandingPage"
import {UserProfile} from "./pages/User/UserProfile"
import {CreateEvent} from "./pages/createEvent/CreateEvent"
import Success from "./components/Ui/Success";
import Error from "./components/Ui/Error";
import UpdateUserProfile from "./components/Ui/updateUserProfile";
import UpdateCreatorProfile from "./components/Ui/updateCreatorProfile";
import TicketGenerator from "./pages/TicketGeneration/TicketGeneration";
import VerifyTicket from "./pages/VerifyTicket/VeryfyTicket";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./components/Dashboard/Dashboard"
import Terms from "/src/pages/Content/Terms"
import AboutUs from "/src/pages/Content/About"

import './App.css'



function App() {
  return(
      <div className="page">
        <Routes>
         {/* <Route path="/" element={<MainDashboard />} /> */}
         {/* <Route path="/analytics" element={<AnalyticsCards />} />
          <Route path="/big-cards" element={<BigCards />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/projects" element={<ProjectList
}/>} />
          <Route path="/orders" element={<OrdersOverview />} /> */}
          <Route path="/sign-up" element={ <SignUpPage />} />
          <Route path="/email" element={<EmailVerify/>} />
          <Route path="/create-profile" element={<ProfileCreation />} />
          {/*<Route path="/creator-dashboard" element={<MainDashboard />} />*/}
          <Route path='/reset-password' element={<ResetPassword/>} />
          <Route path='/user-dashboard' element={<UserProfile />} />
         {/*<Route path='/map-view' element={<TitleBar />} /> */}
         <Route path='/login' element={<LoginPage />} />
         <Route path='/add-event' element={<CreateEvent />} />
         <Route path='/success' element={<Success />} />
         <Route path='/error' element={<Error />} />
         <Route path='/update-user-profile' element={<UpdateUserProfile />} />
         <Route path='/update-creator-profile' element={<UpdateCreatorProfile />} />
         <Route path='/' element={<LandingPage />} />
         <Route path='/get-ticket/:eventId' element={<TicketingForm />} />
         <Route path='/ticket' element={<TicketGenerator/>} />
         <Route path='/verify-ticket' element={<VerifyTicket/>} />
         <Route path='/reset-pass' element={<ResetPassword/>} />
         <Route path='/creator-dashboard' element={<Dashboard />} />
         <Route path='map' element={<MapView />} />
         <Route path='calendar' element={<Calender />} />
         <Route path='terms' element={<Terms />} />
         <Route path='about-us' element={<AboutUs />} />

      </Routes>
      </div>
      )
}

export default App
