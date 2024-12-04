import React from "react";
import './Overview.css'

const Overview = () => {
  return (
    <div className="overview">
      <h3>Dashboard Overview</h3>
      <div className="stats">
        <div className="stat-card">
          <h4>Total Events</h4>
          <p>15</p>
        </div>
        <div className="stat-card">
          <h4>Upcoming Events</h4>
          <p>5</p>
        </div>
        <div className="stat-card">
          <h4>Total Attendees</h4>
          <p>150</p>
        </div>
       
      </div>
    </div>
  );
};

export default Overview;
