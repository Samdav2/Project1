import React from 'react';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
  },
  card: {
    padding: '20px',
    width: '23%',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
  },
  cardText: {
    display: 'flex',
    flexDirection: 'column'
  },
  cardTitle: {
    fontSize: '12px',
    color: '#a0aec0'
  },
  amount: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#2d3748'
  },
  change: {
    fontSize: '14px',
    fontWeight: 'bold'
  }
};

function AnalyticsCards() {
  const cards = [
    { title: "Today's Money", amount: '$53,000', change: '+55%', color: '#48bb78' },
    { title: "Today's Users", amount: '2,300', change: '+5%', color: '#48bb78' },
    { title: 'New Clients', amount: '+3,052', change: '-14%', color: '#e53e3e' },
    { title: 'Total Sales', amount: '$173,000', change: '+8%', color: '#48bb78' },
  ];

  return (
    <div style={styles.container}>
      {cards.map((card, index) => (
        <div key={index} style={styles.card}>
          <div style={styles.cardText}>
            <div style={styles.cardTitle}>{card.title}</div>
            <div style={styles.amount}>{card.amount}</div>
            <div style={{ ...styles.change, color: card.color }}>{card.change}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AnalyticsCards;
