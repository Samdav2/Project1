import React, { useState } from "react";
import Overview from "./Overview";
import Analytics from "./Analytics";
import EventsList from "./EventsList";
import ProfileSettings from "./ProfileSettings";
import Footer from "./Footer"
import "./Dashboard.css";

const Dashboard = () => {
  const [organizer, setOrganizer] = useState({
    name: "Organizer Name",
    email: "organizer@example.com",
  });

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
        <button className="action-button create-event">Create Event</button>
        <button className="action-button1 verify-ticket">Verify Ticket</button>
      </div>
     
      <div className="dashboard-content">
        <Overview />
        <Analytics />
        <EventsList />
        <ProfileSettings />
        <Footer />
      </div>

    </div>
  );
};

export default Dashboard;
