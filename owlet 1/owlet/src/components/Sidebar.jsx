  //components/sidebar
import React from "react";
import "../Sidebar.css";

function sidebar() {
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

export default sidebar;
