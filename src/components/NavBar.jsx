import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Event Organizer Dashboard</h2>
      <ul className="nav-links">
        <li>Overview</li>
        <li>Events</li>
        <li>Analytics</li>
        <li>Profile</li>
      </ul>
    </nav>
  );
};

export default Navbar;
