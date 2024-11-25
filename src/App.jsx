import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
 import {ResetPassword} from "./pages/ResetPassword"
 /*import EventForm from "./pages/TicketingForm/TicketingForm"*/
import RegistrationForm from "./pages/TablesRegistrationForm/RegistrationForm"
import {EventPage} from "./pages/PrivateEvent/EventPage"
import {NotificationPage} from "./pages/NotificationScreen/NotificationPage"
import {EmptyNotification} from "./pages/NotificationScreen/EmptyNotification"
/*import {TicketingForm} from "./pages/TicketingForm/TicketingForm" */
import {Mapview} from "./pages/Mapview/MapView"
import{TitleBar} from "./pages/Calender/TitleBar"
import {LandingPage} from "./pages/LandingPage/LandingPage"
import {UserProfile} from "./pages/User/UserProfile"
import LoginPage from "./pages/LoginPage/LoginPage";


import './App.css'



function App() {
  return (


      <Routes>
         <Route path='/reset-password' element={<ResetPassword/>} />
         {/*<Route path='/' element={<EventForm/>} /> /> */}
         <Route path='/buy-ticket-table' element={<RegistrationForm />} />
         {/*<Route path='/' element={<EventPage />} /> */}
         {/*<Route path='/' element={<NotificationPage />} />  */}
         {/*<Route path='/' element={<EmptyNotification />} /> */}
         {/*<Route path='/' element={<TicketingForm />} />  */}
         {/*<Route path='/' element={<Mapview />} /> */}
         {/* <Route path='/' element={<LandingPage />} /> */}
         <Route path='/user-dashboard' element={<UserProfile />} />
         <Route path='/map-view' element={<TitleBar />} />
         <Route path='/login' element={<LoginPage />} />
      </Routes>





  );
}

export default App;
