import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {ResetPassword} from "./pages/ResetPassword"
import {EventForm} from "./pages/TicketingForm/EventForm"
import {NotificationPage} from "./pages/NotificationScreen/NotificationPage"


import './App.css'



function App() {
  return (
    <Router>
      <Routes>
         <Route path='/ResetPassword' element={<ResetPassword/>}/>
         <Route path='/EventForm' element={<EventForm/>}/>
         <Route path='/NotificationPage' element={<NotificationPage/>}/>
      </Routes>
    </Router>
    
    
  )
}


export default App
