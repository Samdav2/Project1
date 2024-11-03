import React from 'react';
//import "./OrdersOverview.css"

const styles = {
    card: {
      width: '32%',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#2d3748',
      marginBottom: '10px',
    },
    orderItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px',
      padding: '5px 0',
      borderBottom: '1px solid #e2e8f0',
    },
}

function OrdersOverview() {
  const orders = [
    { id: '#4219423', date: '21 DEC 11:21 PM', status: 'New order' },
    { id: '#3210145', date: '20 DEC 3:52 PM', status: 'Card Added' },
    // Add other orders as needed...
  ];

  return (
    <div style={styles.card}>
      <h3 style={styles.cardTitle}>Orders Overview</h3>
      <div>
        {orders.map((order, index) => (
          <div key={index} style={styles.orderItem}>
            <span>{order.status}</span>
            <span>{order.id}</span>
            <span>{order.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
/*const styles = {
    card: {
      width: '32%',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    },
    cardTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#2d3748',
      marginBottom: '10px',
    },
    orderItem: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '5px',
      padding: '5px 0',
      borderBottom: '1px solid #e2e8f0',
    },
}*/


export default OrdersOverview;
