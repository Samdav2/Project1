import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "./MainDashboard.css";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import sales from "/src/assets/icon-15.svg";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

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
              <div className="cardTitle">Balance (NGN): <span className="orderValue">0</span></div>
              <p style={{padding:'10px', backgroundColor: 'white', borderRadius: '10px', color: 'black', fontWeight: '600', cursor: 'pointer', fontSize: '15px', fontFamily: 'sans-serif'}}>Last Activity</p>
          </div>
            <span className="cartIcon">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_341_1920)">
              <rect x="5.5" y="2" width="25" height="25" rx="6" fill="#4FD1C5"/>
              </g>
              <path d="M16.0476 19.1874C16.4791 19.1874 16.8289 18.8377 16.8289 18.4062C16.8289 17.9747 16.4791 17.6249 16.0476 17.6249C15.6161 17.6249 15.2664 17.9747 15.2664 18.4062C15.2664 18.8377 15.6161 19.1874 16.0476 19.1874Z" fill="white"/>
              <path d="M21.5164 19.1874C21.9478 19.1874 22.2976 18.8377 22.2976 18.4062C22.2976 17.9747 21.9478 17.6249 21.5164 17.6249C21.0849 17.6249 20.7351 17.9747 20.7351 18.4062C20.7351 18.8377 21.0849 19.1874 21.5164 19.1874Z" fill="white"/>
              <path d="M22.9031 11.1989C22.8482 11.1317 22.7791 11.0777 22.7007 11.0406C22.6223 11.0035 22.5367 10.9843 22.4499 10.9845H15.0195L14.8699 10.1354C14.8539 10.0449 14.8066 9.963 14.7362 9.90397C14.6659 9.84495 14.577 9.8126 14.4851 9.81262H12.9226C12.819 9.81262 12.7197 9.85378 12.6464 9.92703C12.5731 10.0003 12.532 10.0996 12.532 10.2032C12.532 10.3068 12.5731 10.4062 12.6464 10.4795C12.7197 10.5527 12.819 10.5939 12.9226 10.5939H14.1575L15.2722 16.9117C15.2882 17.0022 15.3355 17.0841 15.4059 17.1431C15.4762 17.2022 15.5651 17.2345 15.657 17.2345H21.907C22.0106 17.2345 22.1099 17.1933 22.1832 17.1201C22.2564 17.0468 22.2976 16.9475 22.2976 16.8439C22.2976 16.7403 22.2564 16.6409 22.1832 16.5677C22.1099 16.4944 22.0106 16.4532 21.907 16.4532H15.9846L15.8469 15.672H21.7468C21.8823 15.6718 22.0135 15.6249 22.1184 15.539C22.2232 15.4532 22.2951 15.3338 22.322 15.201L23.0251 11.6854C23.0421 11.6003 23.0399 11.5126 23.0188 11.4284C22.9977 11.3443 22.9582 11.2659 22.9031 11.1989Z" fill="white"/>
              <defs>
              <filter id="filter0_d_341_1920" x="-4.76837e-07" y="-2.38419e-07" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="3.5"/>
              <feGaussianBlur stdDeviation="2.75"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_341_1920"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_341_1920" result="shape"/>
              </filter>
              </defs>
              </svg>

            </span>
        </div>

        <div className="card black">
          <div>
            <div className="cardTitle">Active Events: <span className="orderValue">0</span></div>
            <p style={{padding:'10px', backgroundColor: 'white', borderRadius: '10px', color: 'black', fontWeight: '600', cursor: 'pointer', fontSize: '15px', fontFamily: 'sans-serif'}}>Next Event</p>
          </div>
          <span className="cartIcon">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_341_1920)">
            <rect x="5.5" y="2" width="25" height="25" rx="6" fill="#4FD1C5"/>
            </g>
            <path d="M16.0476 19.1874C16.4791 19.1874 16.8289 18.8377 16.8289 18.4062C16.8289 17.9747 16.4791 17.6249 16.0476 17.6249C15.6161 17.6249 15.2664 17.9747 15.2664 18.4062C15.2664 18.8377 15.6161 19.1874 16.0476 19.1874Z" fill="white"/>
            <path d="M21.5164 19.1874C21.9478 19.1874 22.2976 18.8377 22.2976 18.4062C22.2976 17.9747 21.9478 17.6249 21.5164 17.6249C21.0849 17.6249 20.7351 17.9747 20.7351 18.4062C20.7351 18.8377 21.0849 19.1874 21.5164 19.1874Z" fill="white"/>
            <path d="M22.9031 11.1989C22.8482 11.1317 22.7791 11.0777 22.7007 11.0406C22.6223 11.0035 22.5367 10.9843 22.4499 10.9845H15.0195L14.8699 10.1354C14.8539 10.0449 14.8066 9.963 14.7362 9.90397C14.6659 9.84495 14.577 9.8126 14.4851 9.81262H12.9226C12.819 9.81262 12.7197 9.85378 12.6464 9.92703C12.5731 10.0003 12.532 10.0996 12.532 10.2032C12.532 10.3068 12.5731 10.4062 12.6464 10.4795C12.7197 10.5527 12.819 10.5939 12.9226 10.5939H14.1575L15.2722 16.9117C15.2882 17.0022 15.3355 17.0841 15.4059 17.1431C15.4762 17.2022 15.5651 17.2345 15.657 17.2345H21.907C22.0106 17.2345 22.1099 17.1933 22.1832 17.1201C22.2564 17.0468 22.2976 16.9475 22.2976 16.8439C22.2976 16.7403 22.2564 16.6409 22.1832 16.5677C22.1099 16.4944 22.0106 16.4532 21.907 16.4532H15.9846L15.8469 15.672H21.7468C21.8823 15.6718 22.0135 15.6249 22.1184 15.539C22.2232 15.4532 22.2951 15.3338 22.322 15.201L23.0251 11.6854C23.0421 11.6003 23.0399 11.5126 23.0188 11.4284C22.9977 11.3443 22.9582 11.2659 22.9031 11.1989Z" fill="white"/>
            <defs>
            <filter id="filter0_d_341_1920" x="-4.76837e-07" y="-2.38419e-07" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="3.5"/>
            <feGaussianBlur stdDeviation="2.75"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_341_1920"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_341_1920" result="shape"/>
            </filter>
            </defs>
            </svg>

          </span>
        </div>
        </div>

        <div className="divtest">

        <div className="card red">
          <div>
            <div className="cardTitle">Orders: <span className="orderValue">0</span></div>
            <p style={{padding:'10px', backgroundColor: 'white', borderRadius: '10px', color: 'black', fontWeight: '600', cursor: 'pointer', fontSize: '15px', fontFamily: 'sans-serif'}}> Next Pay By</p>
          </div>
          <span className="cartIcon">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_341_1920)">
            <rect x="5.5" y="2" width="25" height="25" rx="6" fill="#4FD1C5"/>
            </g>
            <path d="M16.0476 19.1874C16.4791 19.1874 16.8289 18.8377 16.8289 18.4062C16.8289 17.9747 16.4791 17.6249 16.0476 17.6249C15.6161 17.6249 15.2664 17.9747 15.2664 18.4062C15.2664 18.8377 15.6161 19.1874 16.0476 19.1874Z" fill="white"/>
            <path d="M21.5164 19.1874C21.9478 19.1874 22.2976 18.8377 22.2976 18.4062C22.2976 17.9747 21.9478 17.6249 21.5164 17.6249C21.0849 17.6249 20.7351 17.9747 20.7351 18.4062C20.7351 18.8377 21.0849 19.1874 21.5164 19.1874Z" fill="white"/>
            <path d="M22.9031 11.1989C22.8482 11.1317 22.7791 11.0777 22.7007 11.0406C22.6223 11.0035 22.5367 10.9843 22.4499 10.9845H15.0195L14.8699 10.1354C14.8539 10.0449 14.8066 9.963 14.7362 9.90397C14.6659 9.84495 14.577 9.8126 14.4851 9.81262H12.9226C12.819 9.81262 12.7197 9.85378 12.6464 9.92703C12.5731 10.0003 12.532 10.0996 12.532 10.2032C12.532 10.3068 12.5731 10.4062 12.6464 10.4795C12.7197 10.5527 12.819 10.5939 12.9226 10.5939H14.1575L15.2722 16.9117C15.2882 17.0022 15.3355 17.0841 15.4059 17.1431C15.4762 17.2022 15.5651 17.2345 15.657 17.2345H21.907C22.0106 17.2345 22.1099 17.1933 22.1832 17.1201C22.2564 17.0468 22.2976 16.9475 22.2976 16.8439C22.2976 16.7403 22.2564 16.6409 22.1832 16.5677C22.1099 16.4944 22.0106 16.4532 21.907 16.4532H15.9846L15.8469 15.672H21.7468C21.8823 15.6718 22.0135 15.6249 22.1184 15.539C22.2232 15.4532 22.2951 15.3338 22.322 15.201L23.0251 11.6854C23.0421 11.6003 23.0399 11.5126 23.0188 11.4284C22.9977 11.3443 22.9582 11.2659 22.9031 11.1989Z" fill="white"/>
            <defs>
            <filter id="filter0_d_341_1920" x="-4.76837e-07" y="-2.38419e-07" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="3.5"/>
            <feGaussianBlur stdDeviation="2.75"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_341_1920"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_341_1920" result="shape"/>
            </filter>
            </defs>
            </svg>

          </span>
        </div>

        <div className="card orange">
          <p style={{padding:'10px', backgroundColor: 'white', borderRadius: '10px', color: 'black', fontWeight: '600', cursor: 'pointer', fontSize: '15px', fontFamily: 'sans-serif'}}>Ticket Sales</p>
          <span className="cartIcon">
            <svg width="56" height="56" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_341_1920)">
            <rect x="5.5" y="2" width="56" height="56" rx="6" fill="#4FD1C5"/>
            </g>
            <path d="M16.0476 19.1874C16.4791 19.1874 16.8289 18.8377 16.8289 18.4062C16.8289 17.9747 16.4791 17.6249 16.0476 17.6249C15.6161 17.6249 15.2664 17.9747 15.2664 18.4062C15.2664 18.8377 15.6161 19.1874 16.0476 19.1874Z" fill="white"/>
            <path d="M21.5164 19.1874C21.9478 19.1874 22.2976 18.8377 22.2976 18.4062C22.2976 17.9747 21.9478 17.6249 21.5164 17.6249C21.0849 17.6249 20.7351 17.9747 20.7351 18.4062C20.7351 18.8377 21.0849 19.1874 21.5164 19.1874Z" fill="white"/>
            <path d="M22.9031 11.1989C22.8482 11.1317 22.7791 11.0777 22.7007 11.0406C22.6223 11.0035 22.5367 10.9843 22.4499 10.9845H15.0195L14.8699 10.1354C14.8539 10.0449 14.8066 9.963 14.7362 9.90397C14.6659 9.84495 14.577 9.8126 14.4851 9.81262H12.9226C12.819 9.81262 12.7197 9.85378 12.6464 9.92703C12.5731 10.0003 12.532 10.0996 12.532 10.2032C12.532 10.3068 12.5731 10.4062 12.6464 10.4795C12.7197 10.5527 12.819 10.5939 12.9226 10.5939H14.1575L15.2722 16.9117C15.2882 17.0022 15.3355 17.0841 15.4059 17.1431C15.4762 17.2022 15.5651 17.2345 15.657 17.2345H21.907C22.0106 17.2345 22.1099 17.1933 22.1832 17.1201C22.2564 17.0468 22.2976 16.9475 22.2976 16.8439C22.2976 16.7403 22.2564 16.6409 22.1832 16.5677C22.1099 16.4944 22.0106 16.4532 21.907 16.4532H15.9846L15.8469 15.672H21.7468C21.8823 15.6718 22.0135 15.6249 22.1184 15.539C22.2232 15.4532 22.2951 15.3338 22.322 15.201L23.0251 11.6854C23.0421 11.6003 23.0399 11.5126 23.0188 11.4284C22.9977 11.3443 22.9582 11.2659 22.9031 11.1989Z" fill="white"/>
            <defs>
            <filter id="filter0_d_341_1920" x="-4.76837e-07" y="-2.38419e-07" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="3.5"/>
            <feGaussianBlur stdDeviation="2.75"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_341_1920"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_341_1920" result="shape"/>
            </filter>
            </defs>
            </svg>

          </span>
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
          <Link to="/add-event" state={{}}> <button className="quickactionbutton">Create Event </button>
          </Link>
        </div>

        <div className="card black">
          <div>
            <p>Verify Ticket </p>

          </div>
          <Link to="/verify-ticket" state={{}}> <button className="quickactionbutton">Verify Ticket </button>
          </Link>
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
      <footer className="footer">
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://WhatApp.com" target="_blank" rel="noopener noreferrer">WhatApp</a>
        </div>
        <p>&copy; 2024 TheOwl_Initiators. All Rights Reserved.</p>
      </footer>
      </div>
    </div>

    </div>

  );
}

export default MainDashboard;
