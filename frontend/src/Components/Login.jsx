import React, { useState } from 'react';
import './Login.css';
import {useNavigate} from "react-router-dom"

export default function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: formData.name, password: formData.password })
    });

    const data = await response.json();
    console.log("Server Data: ", data);

    if (data.message === "Login Successful") {
      alert("Successfully Logged In");
      localStorage.setItem("token", data.token);
      navigate("/tasks");
    }

    else {
      alert("Login Failed: " + data.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="heading">Login</h2>
      <form onSubmit={handleSubmit}>
        <p>
          Name: <input type="text" name='name' placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
        </p>

        <p>
          Password: <input type="password" name='password' placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
        </p>

        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
