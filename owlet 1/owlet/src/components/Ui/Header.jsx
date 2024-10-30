import React from 'react';
import "./Header.css";

function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.breadcrumb}>Pages / Dashboard</div>
      <div style={styles.actions}>
        <input type="text" placeholder="Type here..." style={styles.search} />
        <button style={styles.button}>Sign In</button>
      </div>
    </header>
  );
}

export default Header;
