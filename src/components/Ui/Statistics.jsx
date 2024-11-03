import React from 'react';
import './Statistics.css';

const Statistics = () => {
  return (
    <div className="container">
      <div className="card">
        <h3 className="cardTitle">Active Users</h3>
        <p className="cardContent">(+23) than last week</p>
        <div className="graphPlaceholder">Graph Here</div>
      </div>
      <div className="card">
        <h3 className="cardTitle">Sales Overview</h3>
        <p className="cardContent">(+5) more in 2021</p>
        <div className="graphPlaceholder">Graph Here</div>
      </div>
    </div>
  );
}

export default Statistics;
