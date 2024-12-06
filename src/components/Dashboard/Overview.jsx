import React, { useState, useEffect } from "react";
import "./Overview.css";

const Overview = () => {
  const [overview, setOverview] = useState({
    totalEvents: 0,
    upcomingEvents: 0,
    totalAttendees: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch overview data
    const fetchOverview = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/overview"); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch overview data");
        }
        const data = await response.json();
        setOverview(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  return (
    <div className="overview">
      <h3>Dashboard Overview</h3>
      {loading && <p>Loading overview...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div className="stats">
          <div className="stat-card">
            <h4>Total Events</h4>
            <p>{overview.totalEvents}</p>
          </div>
          <div className="stat-card">
            <h4>Upcoming Events</h4>
            <p>{overview.upcomingEvents}</p>
          </div>
          <div className="stat-card">
            <h4>Total Attendees</h4>
            <p>{overview.totalAttendees}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Overview;
