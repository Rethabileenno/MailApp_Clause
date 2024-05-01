import axios from 'axios';
import { useState } from 'react';
import './Login.css';

function Login() {
    const [message, setMessage] = useState('');

    const login = async (username, password) => {

         try {
        const response = await axios.post('http://localhost:3001/login', { username, password });

        if (response.status === 200) {
            setMessage('Login successful');
        } else if (response.status === 401) {
            setMessage('Invalid username or password');
        } else {
            setMessage('Login failed');
        }
    } catch (error) {
        console.error(error);
        setMessage('An error occurred');
    }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const username = event.target.elements.username.value;
        const password = event.target.elements.password.value;

        await login(username, password);
    };

    const getUsers = async () => {
        const response = await axios.get('http://localhost:3001/users');
        console.log(response.data);
    };
    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default Login;