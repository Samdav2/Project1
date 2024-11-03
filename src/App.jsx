import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {ResetPassword} from "./pages/ResetPassword"


import './App.css'



function App() {
  return (
    <Router>
      <Routes>
         <Route path='/' element={<ResetPassword/>}/>
      </Routes>
    </Router>
    
    
  )
}


export default App
