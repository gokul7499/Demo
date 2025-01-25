import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Importing react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importing the default styles for react-toastify

const SignUp = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(formData));

      // Show success message with toast
      toast.success('Account Sign Up successfully!');

      setFormData({ name: '', email: '', password: '' });
      navigate('/'); // Redirect to the card page after successful signup
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src="data:image/png;base64,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"
            alt="Signup illustration"
            className="img-fluid"
          />
        </div>
        <div className="col-md-6 mt-5">
          <h2 className="text-center">Create Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                placeholder="Enter Name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? '😊' : '🫰'}
                </button>
              </div>
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Sign Up
            </button>
          </form>

          <p className="mt-3 text-center">
            Already registered?{' '}
            <span
              style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
              onClick={() => navigate('/login')}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>

      {/* Add ToastContainer for the toast notifications */}
      
    </div>
  );
};

export default SignUp;
