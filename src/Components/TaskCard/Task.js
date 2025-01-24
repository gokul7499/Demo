import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SubTaskForm from "./AddSubtask/AddSubtask";
import EditTaskForm from "./EditTaskForm";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import "./Task.css";

const TaskCard = () => {
  const { state } = useLocation();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showSubTaskModal, setShowSubTaskModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);

    let filtered = savedTasks;

    if (state?.filterStatus) {
      filtered = filtered.filter((task) => {
        if (state.filterStatus === "All") return true;
        if (state.filterStatus === "Pending")
          return task.status === "In Progress";
        return task.status === state.filterStatus;
      });
    }

    if (state?.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(query)
      );
    }

    if (state?.category) {
      filtered = filtered.filter((task) => task.category === state.category);
    }

    if (state?.priority) {
      filtered = filtered.filter((task) => task.priority === state.priority);
    }

    setFilteredTasks(filtered);
  }, [state]);

  const handleEditSubmit = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    setShowEditForm(false);
  };

  const handleSubtask = (task) => {
    setSelectedTask(task);
    setShowSubTaskModal(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowEditForm(true);
  };

  const handleDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const calculateProgress = (status) => {
    if (status === "Completed") return 100;
    if (status === "In Progress") return 50;
    return 0;
  };

  const getStatusColor = (status) => {
    if (status === "Completed") return "text-success";
    if (status === "In Progress") return "text-danger";
    return "";
  };

  const getPriorityColor = (priority) => {
    if (priority === "High") return "text-success";
    if (priority === "Low") return "text-danger";
    return "";
  };

  const handleStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="task-card-container">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <div className="task-card" key={task.id}>
            <div className="task-header">
              <h5 className="task-title">{task.title}</h5>
              <div className="task-icons">
                <input
                  type="checkbox"
                  className="icon-button"
                  checked={task.status === "Completed"}
                  readOnly
                />
                <button
                  className="icon-button"
                  onClick={() => handleEdit(task)}
                  aria-label="Edit"
                >
                  <FaEdit color="blue" />
                </button>
                <button
                  className="icon-button"
                  onClick={() => handleDelete(task.id)}
                  aria-label="Delete"
                >
                  <FaTrashAlt color="red" />
                </button>
              </div>
            </div>
            <p className="task-description">{task.description}</p>
            <div className="task-details">
              <span className={`status-text ${getStatusColor(task.status)}`}>
                <b>{task.status}</b>
              </span>
              <p>{task.category}</p>
              <p className={`status-text ${getPriorityColor(task.priority)}`}>
                <b>{task.priority}</b>
              </p>
            </div>
            <p className="date">
              {task.startDate} - {task.endDate}
            </p>
            <div className="task-footer">
              <select
                className="status-dropdown"
                value={task.status}
                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                aria-label="Change task status"
              >
                <option value="Status" disabled>
                  Status
                </option>
                <option value="onGoing">onGoing</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
              </select>
              <button
                onClick={() => handleSubtask(task)}
                className="subtask-button btn btn-primary"
                aria-label="Add subtask"
              >
                +
              </button>
            </div>
            <div className="task-progress">
              <p>{calculateProgress(task.status)}%</p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${calculateProgress(task.status)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-data-container">
          <img src="/error.png" alt="No Data Found" className="no-data-image" />
          <p className="no-data-text">No tasks match your search criteria.</p>
        </div>
      )}

      {showSubTaskModal && (
        <div className="modal">
          <div className="modal-content">
            <SubTaskForm
              task={selectedTask}
              onClose={() => setShowSubTaskModal(false)}
            />
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="modal">
          <div className="modal-content">
            <EditTaskForm
              task={selectedTask}
              onClose={() => setShowEditForm(false)}
              onSubmit={handleEditSubmit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
