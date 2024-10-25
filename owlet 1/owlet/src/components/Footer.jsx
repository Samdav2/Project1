import React from 'react';
import "../Footer.css"

function Footer() {
  return (
    <footer style={styles.footer}>
      <div>@ 2021, Made with ❤️ by Creative Tim & Simmmple for a better web</div>
      <div>
        <a href="#" style={styles.link}>Creative Tim</a>
        <a href="#" style={styles.link}>Simmmple</a>
        <a href="#" style={styles.link}>Blog</a>
        <a href="#" style={styles.link}>License</a>
      </div>
    </footer>
  );
}


export default Footer;
