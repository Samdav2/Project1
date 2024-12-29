import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} TheOwl_initiators. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="https://www.facebook.com/profile.php?id=61567055525143&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="social-link">
            Facebook
          </a>
          <a href="https://x.com/TheOWL_life?t=Nla3mQ2usqUWhBPaSyteUQ&s=09" target="_blank" rel="noopener noreferrer" className="social-link">
            Twitter
          </a>
          <a href="https://www.instagram.com/owl_initiator/profilecard/?igsh=MXcycmRzdXQ5cnNwcg==" target="_blank" rel="noopener noreferrer" className="social-link">
            Instagram
          </a>
         {/* <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
            LinkedIn
          </a>  */}
        </div>
        <div className="contact-link">
          <a href="/contact-us">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
