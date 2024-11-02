import React from 'react';

const styles = {
  container: {
    display: 'flex',
    gap: '20px',
    padding: '20px',
  },
  card: {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: '10px',
  },
  cardContent: {
    fontSize: '14px',
    color: '#4a5568',
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    color: '#fff',
    backgroundColor: '#5e72e4',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};

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
          Wealth creation is an evolutionarily recent positive-sum game. It is all about who takes the opportunity first.
        </p>
        <button style={{ ...styles.button, color: '#ffffff', backgroundColor: '#2d3748' }}>Read more</button>
      </div>
    </div>
  );
}

export default BigCards;
