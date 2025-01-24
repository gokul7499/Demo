import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Create.css";
import Toast from "./Toast"; // Import the Toast component
import { toast } from "react-toastify";
const CreateTaskForm = ({ onSave, onClose = () => {} }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    startDate: "",
    endDate: "",
    category: "",
    priority: "High",
  });
  const [isFormVisible, setIsFormVisible] = useState(true); 
  const [categories, setCategories] = useState(["Work", "Personal", "Others"]);
  const [showToast, setShowToast] = useState(false); // State for showing the toast

  useEffect(() => {
    if (state?.task) {
      setFormData(state.task);
    }
  }, [state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddCategory = () => {
    const newCategory = prompt("Enter new category:")?.trim();
    if (
      newCategory &&
      !categories.some((cat) => cat.toLowerCase() === newCategory.toLowerCase())
    ) {
      setCategories([...categories, newCategory]);
      setFormData({ ...formData, category: newCategory });
    } else {
      alert("Category already exists or invalid.");
    }
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
        toast.error("Please fill in the required fields.");
        return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
        toast.error("End date must be after the start date.");
        return;
    }

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTasks = storedTasks.some(
        (task) => task.title === formData.title
    )
        ? storedTasks.map((task) =>
              task.title === formData.title ? formData : task
          )
        : [...storedTasks, formData];

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    // Show success toast notification
    toast.success("Task saved successfully!");

    // Dynamically update card page by passing state
    navigate("/card", { replace: true, state: { tasks: updatedTasks } });
    setShowForm(false);
    setIsFormVisible(false);

    // Refresh the page
    setTimeout(() => {
        window.location.reload(); // Reload the page after closing the form
    }, 500);
};

if (!showForm) {
  return null; // Don't render the form if showForm is false
}
  
  return (
    <div className="create-task-container">
     
      <form className="create-task-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>{state?.task ? "Edit Task" : "Create Task"}</h2>

          {/* Close Button */}
          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="Close"
            style={{
              fontSize: "30px",
              color: "#ff3b30",
              border: "none",
              background: "none",
              cursor: "pointer",
              position: "absolute",
              marginTop: "-160px",
              marginLeft: "420px",
            }}
          >
            &times;
          </button>
        </div>

        {/* Form Fields */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter task title"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Description *</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter task description"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Status *</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label>Start Date *</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>End Date *</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="form-group">
              <label>Category *</label>
              <div className="category-wrapper">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <button type="button" onClick={handleAddCategory}>
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Priority *</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8">
            <button type="submit" className="save-button">
              {state?.task ? "Update Task" : "Save Task"}
            </button>
          </div>
          <div className="col-md-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskForm;
