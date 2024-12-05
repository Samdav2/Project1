import React, { useState, useEffect } from "react";
import "./Analytics.css";

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/analytics"); // Replace with your actual endpoint
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setAnalyticsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="analytics">
      <h3>Event Performance</h3>
      {loading && <p>Loading analytics...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !error && analyticsData && (
        <div className="analytics-content">
          <div className="analytics-card">
            <h4>Total Events</h4>
            <p>{analyticsData.totalEvents}</p>
          </div>
          <div className="analytics-card">
            <h4>Total Attendees</h4>
            <p>{analyticsData.totalAttendees}</p>
          </div>
          <div className="analytics-card">
            <h4>Revenue</h4>
            <p>${analyticsData.totalRevenue}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
