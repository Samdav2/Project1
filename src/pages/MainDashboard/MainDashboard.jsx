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
      <div className="cards1" >
        <div className="card" style={{width: '40%'}}>
          <div>
          <Line data={data} options={options} />
          </div>
          <div>
            <p> Active Users</p> <br/>
            <p> <span className="percent">(+23)</span> <span className="icontext"> than last week </span></p>
          </div>
          <div className="iconcard">
            <div className="upperdiv">
              <div className="innercard">
                <img src ={walletImage} />
                <p> <span className="icontext"> Users </span></p>
              </div>
              <p> <span className="upperdivspan">32,948 </span></p>
              <img src={progress4} />
            </div>
            <div className="upperdiv">
              <div className="innercard">
                <img src ={clicks} />
                <p> <span className="icontext"> Clicks </span></p>
              </div>
              <p> <span className="upperdivspan"> 2,42m </span></p>
              <img src={progress3} />
            </div>
            <div className="upperdiv">
              <div className="innercard">
                <img src ={sales} />
                <p> <span className="icontext"> Sales </span> </p>
              </div>
              <p> <span className="upperdivspan">$2,400 </span></p>
              <img src={progress2} />
            </div>
            <div className="upperdiv">
              <div className="innercard">
                <img src ={items} />
                <p> <span className="icontext">Items </span></p>
              </div>
              <p> <span className="upperdivspan"> 320 </span></p>
              <img src={progress} />
            </div>

          </div>
        </div>
        <div className="card" style={{width: '60%'}}>
          <div>
            <p> <span>Sales Overview </span> </p>
            <p> <span className="percent"> (+5) more </span> <span className="icontext"> in 2021</span></p>
          </div>
          <div>
          <Line data={data} options={options} />
          </div>
        </div>
      </div>
      <div className="cards" style={{marginTop: '20px'}}>
        <div className="card" style={{width: '70%'}}>
          <div>
            <p> <span> Projects </span></p>
              <div className="cards">
                <img src={success} style={{marginRight: '2px'}} />
                <p> <span className="icontext"> 30% done this month</span></p>
              </div>
              <div>
                  <div className="cards" style={{justifyContent: "space-between"}}>
                    <div>
                      <p> Names</p>
                    </div>
                    <div>
                      <p> Members</p>
                    </div>
                    <div>
                      <p> Budget</p>
                    </div>
                    <div>
                      <p> Completion</p>
                    </div>

                  </div>
                  <hr />
              </div>
              <div>
                  <div className="cards" style={{justifyContent: "space-between"}}>
                  <div className="cards" style={{justifyContent: "space-between", verticalAlign: "middle", alignItems: "center", marginRight: "-10%"}}>
                      <div>
                            <img src={xd}/>
                      </div>
                      <div>
                        <p>
                         <span className="icontext" style={{marginLeft: "5px"}}>  Chakra Soft UI Version </span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <p> Label</p>
                    </div>
                    <div>
                      <p> <span className="icontext"> $14,000 </span></p>
                    </div>
                    <div>
                      <p> Label</p>
                    </div>

                  </div>
                  <hr />
              </div>
              <div>
                  <div className="cards" style={{justifyContent: "space-between"}}>
                    <div>
                      <p> Name</p>
                    </div>
                    <div>
                      <p> Label</p>
                    </div>
                    <div>
                      <p> Label</p>
                    </div>
                    <div>
                      <p> Label</p>
                    </div>

                  </div>
                  <hr />
              </div>
              <div>
                  <div className="cards" style={{justifyContent: "space-between"}}>
                    <div>
                      <p> Name</p>
                    </div>
                    <div>
                      <p> Label</p>
                    </div>
                    <div>
                      <p> Label</p>
                    </div>
                    <div>
                      <p> Label</p>
                    </div>

                  </div>
                  <hr />
              </div>
              <div>
                  <div className="cards" style={{justifyContent: "space-between"}}>
                    <div>
                      <p> Name</p>
                    </div>
                    <div>
                      <p> Label</p>
                    </div>
                    <div>
                      <p> Label</p>
                    </div>
                    <div>
                      <p> Label</p>
                    </div>

                  </div>
                  <hr />
              </div>
              <div>
                  <div className="cards" style={{justifyContent: "space-between"}}>
                    <div>
                      <p> Name</p>
                    </div>
                    <div>
                      <p> Label</p>
                    </div>
                    <div>
                      <p> Label</p>
                    </div>
                    <div>
                      <p> Label</p>
                    </div>

                  </div>
              </div>

          </div>

        </div>
        <div className="card" style={{width: '30%'}}>
          <div>
          <p> <span> Orders Overview </span></p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MainDashboard;
