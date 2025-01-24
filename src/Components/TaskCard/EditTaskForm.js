import React, { useState } from "react";

const EditTaskForm = ({ task, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ ...task });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-task-form mt-2">
      <h2>Edit Task</h2>
      {/* Add your form fields here, similar to the code shared above */}
      {/* Example: */}
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Update</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default EditTaskForm;
