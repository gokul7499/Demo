import React, { useState, useEffect } from "react";
import "./Navbar.css";
import CreateTaskForm from "../CreateTask/Create";
import { useNavigate } from "react-router-dom";

const Navbar = ({onTaskAdded}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [userName, setUserName] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const navigate = useNavigate();

  // Retrieve userName from localStorage on mount
  useEffect(() => {
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleFilter = (status) => {
    navigate("/card", { state: { filterStatus: status, searchQuery: "" } });
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    navigate("/card", { state: { filterStatus: "All", searchQuery: query } });
  };

  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const openCreateForm = () => {
    setShowCreateForm(true);
  };

  const closeCreateForm = () => {
    setShowCreateForm(false);
  };
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    navigate("/card", { state: { filterStatus: "All", searchQuery, category: selectedCategory, priority } });
  };

  const handlePriorityChange = (e) => {
    const selectedPriority = e.target.value;
    setPriority(selectedPriority);
    navigate("/card", { state: { filterStatus: "All", searchQuery, category, priority: selectedPriority } });
  };

  return (
    <>
      <nav className="navbar fixed-top">
        <div className="welcome-message">
          {userName
            ? `Welcome, ${userName} to Your Task Management Application`
            : "Welcome, Guest! Please sign in to continue."}
        </div>
        <p className="nav-links mb-3" >
          <li className="nav-item">
            <button className="nav-link text-light " onClick={() => handleFilter("All")}>
              All Tasks
            </button>
          </li>
          <li className="nav-item ">
            <button className="nav-link text-light " onClick={() => handleFilter("Pending")}>
              Pending Tasks
            </button>
          </li>
          <li className="nav-item">
            <button className="nav-link text-light" onClick={() => handleFilter("Completed")}>
              Completed Tasks
            </button>
          </li>
          <li className="nav-item">
            <span
              className="nav-link2 profile"
              onClick={togglePopup}
              style={{ cursor: "pointer" }}
            >
              {userName?.[0]?.toUpperCase() || "?"}
            </span>
          </li>
          <li className="nav-item">
            <h6 className="double  text-light">{userName}</h6>
          </li>
        </p>
      </nav>

      <div className="navbar2 fixed-top" style={{ top: "60px" }}>
        <div className="navbar-content">
          <h2 className="navbar-title">Daily Task Management</h2>
          <div className="navbar-form">
            <div className="input2">
              <input
                type="text"
                placeholder="Search Task by Name"
                value={searchQuery}
                onChange={handleInputChange}
              />
            </div>
            <div className="btnn category-dropdown">
  <select className="form-select"
   value={category}
   onChange={handleCategoryChange}>
    <option value="">Category</option>
    <option value="Personal">Personal</option>
    <option value="Work">Work</option>
    <option value="Agent">Agent</option>
  </select>
</div>

<div className="btnn category-dropdown">
  <select className="form-select font-weight-bold"
  value={priority} onChange={handlePriorityChange}>
    <option value="">Priority</option>
    <option value="High">High</option>
    <option value="Low">Low</option>

  </select>
</div>
            <button type="button" className="btnn" onClick={openCreateForm}>
              Create Task
            </button>
          </div>
        </div>
      </div>

      {/* Popup for Logout */}
      {showPopup && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <p>Are you sure you want to log out?</p>
            <button
              className="btn logout-btn"
              onClick={() => {
                localStorage.removeItem("userName"); // Clear username on logout
                navigate("/");
                closePopup();
              }}
            >
              Logout
            </button>
            <button className="btn cancel-btn" onClick={closePopup}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Create Task Form Modal */}
      {showCreateForm && (
        <div className="modal">
          <CreateTaskForm
            onSave={(newTask) => {
              onTaskAdded(newTask); // Pass new task to parent
              closeCreateForm();
            }}
            onClose={closeCreateForm}
          />
        </div>
      )}
    </>
  );
};

export default Navbar;
