import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
 /*import {ResetPassword} from "./pages/ResetPassword"*/
 /*import EventForm from "./pages/TicketingForm/TicketingForm"*/
/*import RegistrationForm from "./pages/TablesRegistrationForm/RegistrationForm"*/
import {EventPage} from "./pages/PrivateEvent/EventPage"
/*import {NotificationPage} from "./pages/NotificationScreen/NotificationPage"*/
import {EmptyNotification} from "./pages/NotificationScreen/EmptyNotification"
import {CardFormCard} from "./pages/PaymentPage/CardFormCard"


import './App.css'



function App() {
  return (

      <div className="main-content">
        <Routes>
         {/*} <Route path="/" element={<MainDashboard />} />
          <Route path="/analytics" element={<AnalyticsCards />} />
          <Route path="/big-cards" element={<BigCards />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/orders" element={<OrdersOverview />} /> */}
        </Routes>
      </div>

  );
}

export default App;
