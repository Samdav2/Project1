import React from "react";

const Breadcrumb = () => {
    return (
      <div style={styles.breadcrumb}>
        <span style={styles.breadcrumbItem}>Pages / Tables</span>
        <span style={styles.currentPage}>Tables</span>
        <div style={styles.breadcrumbMenu}>
          <input type="text" placeholder="Type here..." style={styles.searchInput} />
          <img src="./assets/ion-icon-n-notifications-default.svg" alt="notifications" />
          <img src="./assets/ion-icon-s-settings-sharp.svg" alt="settings" />
          <span style={styles.signIn}>Sign In</span>
        </div>
      </div>
    );
  };

  export default Breadcrumb;
