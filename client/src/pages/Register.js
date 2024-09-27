import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Register.css'; 

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client'
  });

  const { name, email, password, role } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      console.log('User registered successfully');
    } catch (err) {
      console.error(err.response.data.msg);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <form onSubmit={onSubmit} className="register-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={onChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="role" className="form-label">Role</label>
          <select
            name="role"
            value={role}
            onChange={onChange}
            className="form-select"
          >
            <option value="client">Client</option>
            <option value="owner">Owner</option>
          </select>
        </div>
        <button type="submit" className="form-button">Register</button>
      </form>
      <p className="login-prompt">
        Vous avez déjà un compte ? <Link to="/login" className="login-link">Connectez-vous</Link>
      </p>
    </div>
  );
};

export default Register;
