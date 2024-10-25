import React from 'react';
import "../AnalyticsCards.css";

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
