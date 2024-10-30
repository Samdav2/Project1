//components/MainDashboard.js
import React from "react";
import "./MainDashboard.css";

function MainDashboard() {
  return (
    <div className="Main-dashboard">
      <div className="breadcrumb">
        <span>Pages / Dashboard</span>
      </div>
      <div className="cards">
        <div className="card">
          <span>Today's Money</span>
          <p>$53,000</p>
          <span>+55%</span>
        </div>
        <div className="card">
          <span>Today's Users</span>
          <p>2,300</p>
          <span>+5%</span>
        </div>
        {/* Add more cards */}
      </div>
      {/* Add more sections such as graphs, detailed cards here */}
    </div>
  );
}

export default MainDashboard;
