import React from "react";
import { Line } from "react-chartjs-2";
import "./MainDashboard.css";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import sales from "/src/assets/icon-15.svg";

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

function MainDashboard() {
  return (
    <div className="Main-dashboard">
      <div className="top">
        <img src={sales} alt="Sales Icon" />
        <div>
          <p>Client Name</p>
          <p>Client Email</p>
        </div>
        <button>Click here</button>
      </div>

      <div className="summary-container">
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

      <div className="graph-container">
        <div className="graph-header">
          <button className="graph-button">Button</button>
          <p>See the graphical representation below</p>
        </div>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default MainDashboard;
