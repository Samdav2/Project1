//components/MainDashboard.js
import React from "react";
import { Line } from 'react-chartjs-2';
import "./MainDashboard.css";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import walletImage from "/src/assets/icon-17.svg";
import  clicks from "/src/assets/icon-16.svg";
import sales from "/src/assets/icon-15.svg";
import items from "/src/assets/icon-14.svg";
import progress4 from "/src/assets/progress-4.svg";
import progress3 from "/src/assets/progress-3.svg";
import progress2 from "/src/assets/progress-2.svg";
import progress from "/src/assets/progress.svg";
import stat from "/src/assets/lines-3.svg";
import success from "/src/assets/success.svg";
import xd from "/src/assets/icon.svg";

ChartJS.register(
  CategoryScale,  // x-axis with categories (like months)
  LinearScale,    // y-axis with linear numbers
  PointElement,   // data points
  LineElement,    // line elements for the line chart
  Title,          // chart title
  Tooltip,        // tooltips on hover
  Legend          // legend for datasets
);



const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Dataset 1',
      backgroundColor: 'rgba(75,192,192,0.4)',  // color for chart background
      borderColor: 'rgba(75,192,192,1)',       // color for chart border
      data: [65, 59, 80, 81, 56, 55, 40],      // data points
    },
  ],
};

const options = {
  scales: {
    x: {
      type: 'category',  // Use 'category' scale for the x-axis
    },
    y: {
      beginAtZero: true, // y-axis starts at 0
    },
  },
};


function MainDashboard() {
  return (
    <div className="Main-dashboard">
      <div className="card" style={{justifyContent: 'space-between', alignItems: 'center', display: 'flex', width: '97%', }}>
        <div>
            <img src={sales} />
        </div>
        <div style={{width: '50%'}}>
          <div>
                <p> Client Name</p>
          </div>
          <div>
                <p> Client Email</p>
          </div>
        </div>
        <div style={{width: '25%'}}>

        </div>
        <div>
                <button> Click here </button>
        </div>

      </div>
      <div className="card" style={{justifyContent:'space-between', width:'97%', marginTop:'10px', }}>
        <div>
          <p> My Summary</p>
        </div>


        <div style={{display:'flex', justifyContent:'space-between', marginTop:'10px'}}>
          <div style={{width: '48%'}}>
           <div className="card" style={{display:'flex', justifyContent:'space-between', width: '100%', alignItems: 'center', backgroundColor:'blue', color: 'white'}}>
             <div>
                <p> Blance</p>
                <p> NGN 0.00</p>
                <p> Last Activity</p>
             </div>
             <div>
              <img src={sales} />
             </div>
           </div >
           <div className="card" style={{display:'flex', justifyContent:'space-between', width: '100%', alignItems: 'center', backgroundColor:'black', color: 'white'}}>
              <div>
                <p> Active Events</p>
                <p> 0</p>
                <p> Next Event</p>
             </div>
             <div>
              <img src={sales} />
             </div>
           </div>
          </div>
          <div style={{width: '48%', marginLeft:'10px'}} >
            <div className="card" style={{display:'flex', justifyContent:'space-between', width: '95%', alignItems: 'center', backgroundColor:'red', color: 'white'}} >
            <div>
                <p> Orders</p>
                <p> 0</p>
                <p> Next Pay By</p>
             </div>
             <div>
              <img src={sales} />
             </div>
            </div>
            <div className="card" style={{display:'flex', justifyContent:'space-between', width: '95%', alignItems: 'center', backgroundColor:'orange', color: 'white'}} >
            <div>
                <p>Ticket Sales</p>
             </div>
             <div>
              <img src={sales} />
             </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{justifyContent:'space-between', width:'97%', marginTop:'10px'}}>
        <div style={{display: 'flex', justifyContent:'space-between'}}>
          <div>
            <div>
                <button> Button </button>
            </div>

            <div>
              <p> See the graphical representation Below</p>
            </div>
          </div>

          <div>
              <button> Button </button>
          </div>

        </div>

        <div>
          <Line data={data} options={options} />
        </div>

      </div>

    </div>
  );
}

export default MainDashboard;
