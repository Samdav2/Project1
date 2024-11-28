import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "./MainDashboard.css";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import sales from "/src/assets/icon-15.svg";
import { useLocation } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Dataset 1",
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const options = {
  scales: {
    x: { type: "category" },
    y: { beginAtZero: true },
  },
};

function MainDashboard(){

   const location = useLocation();
  console.log(location.state)
  const { name, email, id } = location.state || {};

  return (
    <div className="upperdiv">
    <div className="Main-dashboard">
      <div className="divl">
      <div className="top">
        <img src={sales} alt="Sales Icon" />
        <div>
          <p>{name || "Failed Fecthing Name"}</p>
          <p>{email || "No Email Provided"}</p>
          <p></p>
        </div>
        <button>Settings</button>
      </div>

      <div className="summary-container">
        <div className="divtest">
        <div className="card blue">
          <div>
            <p>Balance</p>
            <p>NGN 0.00</p>
            <p>Last Activity</p>
          </div>
          <img src={sales} alt="Sales Icon" />
        </div>

        <div className="card black">
          <div>
            <p>Active Events</p>
            <p>0</p>
            <p>Next Event</p>
          </div>
          <img src={sales} alt="Sales Icon" />
        </div>
        </div>

        <div className="divtest">

        <div className="card red">
          <div>
            <p>Orders</p>
            <p>0</p>
            <p>Next Pay By</p>
          </div>
          <img src={sales} alt="Sales Icon" />
        </div>

        <div className="card orange">
          <p>Ticket Sales</p>
          <img src={sales} alt="Sales Icon" />
        </div>
      </div>
      </div>

{/* Quick Action Section */}

      <div className="upperquickaction" >
        <h1> Quick Actions </h1>
      <div className="summary-container">
        <div className="divtest">
        <div className="card blue">
          <div>
            <p>Create Event</p>
          </div>
          <button className="quickactionbutton"> Create New Event </button>
        </div>

        <div className="card black">
          <div>
            <p>Verify Ticket </p>

          </div>
          <button className="quickactionbutton"> Verify Ticket </button>
        </div>
        </div>

        <div className="divtest">

        <div className="card red">
          <div>
            <p>Download Data</p>
          </div>
          <button className="quickactionbutton"> Download Data </button>

        </div>

        <div className="card orange">
          <p>Withdraw</p>
          <button className="quickactionbutton"> Withdraw </button>
        </div>
      </div>
      </div>
    </div>

      <div className="graph-container">
        <div className="graph-header">
          <button className="graph-button">Button</button>
          <p><span className="graphtext"> See the graphical representation below </span></p>
        </div>
        <Line data={data} options={options} />
      </div>
      </div>
    </div>
    </div>
  );
}

export default MainDashboard;
