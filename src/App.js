import React, { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUp from "./Components/Pages/Navbar/SignUp";
import Login from "./Components/Pages/SignIn/SignIn";
import Navbar from "./Components/Pages/Navbar/Navbar";
import CreateTaskForm from "./Components/Pages/CreateTask/Create";
import TaskCard from "./Components/TaskCard/Task";
import SubTaskForm from "./Components/TaskCard/AddSubtask/AddSubtask";
import Footer from "./Components/Footer/Footer";

function App() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  const location = useLocation();
  const pathsToHideNavbar = ["/signup", "/"];
  const showNavbar = !pathsToHideNavbar.includes(location.pathname);
  const showFooter = showNavbar;

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  const handleTaskAdded = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleUpdateTasks = (updatedTasks) => {
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };
  const handleClose = () => {
    navigate("/card");
  };

  const handleSave = (task) => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    localStorage.setItem("tasks", JSON.stringify([...savedTasks, task]));
    console.log("Task saved:", task);
  };

  return (
    <div>
      {showNavbar && <Navbar userName={userName} darkMode={darkMode} />}
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Login setUserName={setUserName} />} />
        <Route
          path="/create"
          element={<CreateTaskForm onSave={handleSave} onClose={handleClose} />}
        />
        <Route path="/card" element={<TaskCard />} />
        <Route path="/subtask" element={<SubTaskForm />} />
      </Routes>
      {showFooter && <Footer darkMode={darkMode} toggleDarkMode={toggleDarkMode} />}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
