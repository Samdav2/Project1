import React from 'react';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    
  },
  breadcrumb: {
    fontSize: '20px',
    color: '#2d3748',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
  search: {
    padding: '10px',
    border: '1px solid #e2e8f0',
    borderRadius: '15px',
  },
  button: {
    marginLeft: '10px',
    backgroundColor: '#2d3748',
    color: '#ffffff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    cursor: 'pointer'
  }
};

function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.breadcrumb}>Pages/Dashboard</div>
      <div style={styles.actions}>
        <input type="text" placeholder="Type here..." style={styles.search} />
        <button style={styles.button}>Sign In</button>
      </div>
    </header>
  );
}

export default Header;
