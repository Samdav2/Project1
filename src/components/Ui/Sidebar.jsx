import React from "react";
import "./Sidebar.css";

const styles = {
  sidebar: {
    width: "250px",
    background: "#f8f9fa",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  nav: {
    width: "100%",
  },
  navLink: {
    display: "block",
    padding: "10px",
    color: "#333",
    textDecoration: "none",
  },
  navSection: {
    fontSize: "14px",
    fontWeight: "bold",
    marginTop: "20px",
  },
};

function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>PURITY UI DASHBOARD</div>
      <nav style={styles.nav}>
        <a href="#" style={styles.navLink}>Dashboard</a>
        <a href="#" style={styles.navLink}>Tables</a>
        <a href="#" style={styles.navLink}>Billing</a>
        <a href="#" style={styles.navLink}>RTL</a>
        <div style={styles.navSection}>ACCOUNT PAGES</div>
        <a href="#" style={styles.navLink}>Profile</a>
        <a href="#" style={styles.navLink}>Sign In</a>
        <a href="#" style={styles.navLink}>Sign Up</a>
      </nav>
    </aside>
  );
}

export default Sidebar;
