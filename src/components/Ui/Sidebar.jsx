import React from "react";
import "./Sidebar.css";


function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">PURITY UI DASHBOARD</div>
      <nav className="item">
        <a href="#" className="menu-item">Dashboard</a>
        <a href="#" className="menu-item">Tables</a>
        <a href="#" className="menu-item">Billing</a>
        <a href="#" className="menu-item">RTL</a>
        <div className="navSection">ACCOUNT PAGES</div>
        <a href="#" className="menu-item">Profile</a>
        <a href="#" className="menu-item">Sign In</a>
        <a href="#" className="menu-item">Sign Up</a>
      </nav>
    </div>
  );
}

export default Sidebar;
