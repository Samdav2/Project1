import React from "react";
import Navbar from "../NavBar";
import Overview from "./Overview";
import EventsList from "./EventsList";
import Analytics from "./Analytics";
import ProfileSettings from "./ProfileSettings";
import Footer from "./Footer";
import "./DashBoard.css";

function DashBoard() {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <Overview />
        <EventsList />
        <Analytics />
        <ProfileSettings />
        <Footer />
      </div>
    </div>
  );
}

export default DashBoard;
