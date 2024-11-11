import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {ResetPassword} from "./pages/ResetPassword"
import EventForm from "./pages/TicketingForm/EventForm"
import RegistrationForm from "./pages/TablesRegistrationForm/RegistrationForm";


import './App.css'



function App() {
  return (
      <Routes>
         {/* <Route path='/' element={<ResetPassword/>}/> */}
         {/* <Route path='/' element={<EventForm/>} /> */}
         <Route path='/' element={<RegistrationForm />} />
      </Routes>


  )
}

export default App;
