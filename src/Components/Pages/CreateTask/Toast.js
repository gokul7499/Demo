import React from "react";
import "./Toast.css";

const Toast = ({ message, onClose }) => {
  return (
    <div className="toast" onClick={onClose}>
      <span>{message}</span>
      <button className="close-toast" onClick={onClose}>
        &times;
      </button>
    </div>
  );
};

export default Toast;
