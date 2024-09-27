import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import './Login.css'; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);

      // Get the role from the response
      const role = res.data.user.role;

      console.log('User logged in successfully');
      
      // Redirect based on user role
      if (role === 'owner') {
        navigate('/admin');
      } else if (role === 'client') {
        navigate('/client');
      }
    }  catch (error) {

      if (error.response) {
    
        // Axios error, handle response data
    
        console.error(error.response.data.msg);
    
      } else {
    
        // Generic JavaScript error, handle error message
    
        console.error(error.message);
    
      }
    
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form onSubmit={onSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            className="form-input"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            className="form-input"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
      <p className="register-link">
        Si vous n'avez pas de compte, <Link to="/register">inscrivez-vous ici</Link>.
      </p>
    </div>
  );
};

export default Login;
