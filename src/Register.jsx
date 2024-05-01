import React from 'react';
import axios from 'axios';
import './Register.css';
import { useState } from 'react';

const Register = () => {
    const [message, setMessage] = useState('');
  
    const register = async (name, surname, username, password) => {
      const response = await axios.post('http://localhost:3001/register', { name, surname, username, password });
  
      if (response.status === 201) {
        setMessage('Registration successful');
      } else {
        setMessage('Registration failed');
      }
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const name = event.target.elements.name.value;
      const surname = event.target.elements.surname.value;
      const username = event.target.elements.username.value;
      const password = event.target.elements.password.value;
  
      await register(name, surname, username, password);
    };
    const getUsers = async () => {
        const response = await axios.get('http://localhost:3001/users');
        console.log(response.data);
    };
    return (
        <div className="register">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" required />
          <input type="text" name="surname" placeholder="Surname" required />
          <input type="text" name="username" placeholder="Username" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
        <p>{message}</p>
      </div>
    );
}

export default Register;