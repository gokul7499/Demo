import React from "react";
import "./Footer.css";

const Footer = ({ darkMode, toggleDarkMode }) => {
  return (
    <footer className={`footer ${darkMode ? "dark" : ""}`}>
      <div className="footer-content">
        <h4 className="footer-title">Efficient Task Management for You ...</h4>
        <div className="footer-icons">
          <button
            className="icon-button float-left"
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
