import React, { useState } from 'react';
import axios from 'axios';
import './SentEmails.css';

function SentEmails() {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');

    const sendEmail = async () => {
        try {
            const response = await axios.post('http://localhost:3001/send-email', { to, subject, text });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendEmail();
    };

    return (
        <div className="sent-emails">
            <h2>Send Email</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="To" value={to} onChange={e => setTo(e.target.value)} required />
                <input type="text" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} required />
                <textarea placeholder="Text" value={text} onChange={e => setText(e.target.value)} required />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default SentEmails;