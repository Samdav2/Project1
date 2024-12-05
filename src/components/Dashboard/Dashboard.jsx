import React, { useState } from "react";
import Overview from "./Overview";
import Analytics from "./Analytics";
import EventsList from "./EventsList";
import ProfileSettings from "./ProfileSettings";
import Footer from "./Footer"
import "./Dashboard.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Dashboard = () => {

    const [organizer, setOrganizer] = useState({
      name: "Organizer Name",
      email: "organizer@example.com",
      profilePicture: "https://via.placeholder.com/100", // Placeholder image
      lastLogin: "2024-12-03 10:30 AM",
    });

  const location = useLocation();
  console.log(location.state)
  const { name, email, user_id, brandName, phoneNo } = location.state || {};
  

  return (
    <div className="dashboard">
        <div className="profile-section">
          <img
            src={organizer.profilePicture}
            alt={`${organizer.name}'s Profile`}
            className="profile-picture"
          />
          <div className="organizer-details">
            <h1>Welcome, {organizer.name}</h1>
            <p>Gmail: {organizer.email}</p>
            <p>Last Login: {organizer.lastLogin}</p>
          </div>
        </div>
        
      <div className="dashboard-content">
        <Overview />
      </div>

      <div className="dashboard-actions">
      <Link to="/add-event" state={{}}> <button className="action-button create-event">Create Event</button> </Link>
         
      <Link to="/verify-ticket" state={{}}> <button className="action-button1 verify-ticket">Verify Ticket</button> </Link> 
      </div>
     
      <div className="dashboard-content">
        <Analytics />
        <EventsList />
        <ProfileSettings />
        <Footer />
      </div>

    </div>
  );
};

export default Dashboard;
