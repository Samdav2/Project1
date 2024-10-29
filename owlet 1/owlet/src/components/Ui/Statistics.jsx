import React from 'react'

import "../statistics.css";

const Statistics = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Active Users</h3>
        <p style={styles.cardContent}>(+23) than last week</p>
        <div style={styles.graphPlaceholder}>Graph Here</div>
      </div>
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Sales Overview</h3>
        <p style={styles.cardContent}>(+5) more in 2021</p>
        <div style={styles.graphPlaceholder}>Graph Here</div>
      </div>
    </div>
  )
}

export default Statistics