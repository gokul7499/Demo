import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';
import { ToastContainer, toast } from 'react-toastify'; // Importing react-toastify
import 'react-toastify/dist/ReactToastify.css';
const Login = ({ setUserName }) => {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
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
      const storedUser = JSON.parse(localStorage.getItem("user"));
      toast.success('Account created successfully!');
      if (
        storedUser &&
        storedUser.name === formData.name &&
        storedUser.password === formData.password
      ) {
       
        setFormData({ name: "", password: "" });
        localStorage.setItem("userName", formData.name); // Save userName to localStorage
        setUserName(formData.name);
        navigate("/card");
      } else {
        // alert("Invalid name or password");
        toast.success('Invalid name or password');
      }
    }
  };
  

  return (
    <div className="container ">
      <div className="row">
        <div className="col-md-6 d-flex ">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqe24bLsD1cKNG1jcWKQpkswhPKEETBmn_iQ&s"
            alt="Sign-In illustration"
            className="img-fluid"
          />
        </div>
        <div className="col-md-6 mt-5">
          <h2 className="text-center">Welcome To Application</h2>
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
              Sign In
            </button>
          </form>

          
            
            
             
           
            <button  onClick={() => navigate('/signup')} className='btn3  '> Create an Account</button>  
         
        </div>
      </div>
    </div>
  );
};

export default Login;
