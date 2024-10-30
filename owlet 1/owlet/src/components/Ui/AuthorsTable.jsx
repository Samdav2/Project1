import React from "react";

const AuthorsTable = () => {
    return (
      <div style={styles.card}>
        <h3 style={styles.cardHeader}>Authors Table</h3>
        {/* Table headers */}
        <div style={styles.tableRow}>
          <div style={styles.tableHeaderItem}>AUTHOR</div>
          <div style={styles.tableHeaderItem}>FUNCTION</div>
          <div style={styles.tableHeaderItem}>STATUS</div>
          <div style={styles.tableHeaderItem}>EMPLOYED</div>
        </div>
        {/* Example Table Row */}
        <div style={styles.tableRow}>
          <div style={styles.tableItem}>Esthera Jackson</div>
          <div style={styles.tableItem}>Manager</div>
          <div style={styles.statusOnline}>Online</div>
          <div style={styles.tableItem}>14/06/21</div>
        </div>
      </div>
    );
  };

  export default AuthorsTable
