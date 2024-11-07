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
          <p>$53,000 <span className="percent">+55%</span> </p>
        </div>
        <div className="card">
          <span>Today's Users</span>
          <p>2,300 <span className="percent" >+5%</span> </p>
        </div>
        <div className="card">
          <span> New Clients</span>
          <p>+3,052 <span className="percent-n"> -14%</span> </p>
        </div>
        <div className="card">
          <span> Total Sales Clients</span>
          <p>$173,000 <span className="percent"> +8%</span> </p>
        </div>
      </div>
      {/* Add more sections such as graphs, detailed cards here */}
    </div>
  );
}

export default MainDashboard;
