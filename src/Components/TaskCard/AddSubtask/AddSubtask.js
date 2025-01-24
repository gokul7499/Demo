import React, { useState, useEffect } from "react";
import "./subtask.css";

const SubTaskForm = ({ task, onClose }) => {
  const [subTasks, setSubTasks] = useState([]);
  const [currentSubTask, setCurrentSubTask] = useState({ title: "", description: "" });
  const [editIndex, setEditIndex] = useState(null);

  // Load saved subtasks for the specific task from localStorage
  useEffect(() => {
    const savedSubTasks = JSON.parse(localStorage.getItem(`subTasks-${task.id}`)) || [];
    setSubTasks(savedSubTasks);
  }, [task.id]);

  // Save subtasks for the specific task to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`subTasks-${task.id}`, JSON.stringify(subTasks));
  }, [subTasks, task.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSubTask({ ...currentSubTask, [name]: value });
  };

  const handleSave = () => {
    if (!currentSubTask.title || !currentSubTask.description) {
      alert("Please fill in all fields.");
      return;
    }

    if (editIndex !== null) {
      const updatedSubTasks = [...subTasks];
      updatedSubTasks[editIndex] = currentSubTask;
      setSubTasks(updatedSubTasks);
      setEditIndex(null);
    } else {
      setSubTasks([...subTasks, currentSubTask]);
    }

    setCurrentSubTask({ title: "", description: "" });
  };

  const handleEdit = (index) => {
    setCurrentSubTask(subTasks[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedSubTasks = subTasks.filter((_, i) => i !== index);
    setSubTasks(updatedSubTasks);
  };

  return (
    <div className="subtask">
      <div className="header">
        <button className="close-button" onClick={onClose} aria-label="Close">
          ✖
        </button>
        <h2 className="text-center">Add Subtask</h2>
      </div>
      <div className="form-group">
        <label>Title *</label>
        <input
          type="text"
          name="title"
          value={currentSubTask.title}
          onChange={handleInputChange}
          placeholder="Enter Title"
        />
      </div>
      <div className="form-group">
        <label>Description *</label>
        <textarea
          name="description"
          value={currentSubTask.description}
          onChange={handleInputChange}
          placeholder="Enter Description"
        />
      </div>
      <div className="form-actions">
        <button
          className="cancel-button"
          onClick={() => setCurrentSubTask({ title: "", description: "" })}
        >
          Cancel
        </button>
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>

      <h3>Saved Subtasks:</h3>
      <ul className="subtask-list">
        {subTasks.map((task, index) => (
          <li key={index} className="subtask-item">
            <button
              className="remove-button"
              onClick={() => handleDelete(index)}
              title="Remove"
            >
              🗑️
            </button>
            <div className="subtask-content">
              <strong>{task.title}:</strong> {task.description}
            </div>
            <div className="subtask-actions">
              <button onClick={() => handleEdit(index)}>✏️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubTaskForm;
