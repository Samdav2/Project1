import React from 'react';
import "../BigCards.css";

function BigCards() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Purity UI Dashboard</h3>
        <p style={styles.cardContent}>
          Built by developers. From colors, cards, typography to complex elements, you will find the full documentation.
        </p>
        <button style={styles.button}>Read more</button>
      </div>
      <div style={styles.card}>
        <h3 style={{ ...styles.cardTitle, color: '#ffffff' }}>Work with the Rockets</h3>
        <p style={{ ...styles.cardContent, color: '#ffffff' }}>
          Wealth creation is an evolutionarily recent positive-sum game. It is all about who take the opportunity first.
        </p>
        <button style={{ ...styles.button, color: '#ffffff', backgroundColor: '#2d3748' }}>Read more</button>
      </div>
    </div>
  );
}


export default BigCards;
