import React, { useState, useEffect } from 'react';
import './Settings.css';

function Settings() {
    const [smtpServer, setSmtpServer] = useState(localStorage.getItem('smtpServer') || '');
    const [smtpPort, setSmtpPort] = useState(localStorage.getItem('smtpPort') || '');

    useEffect(() => {
        localStorage.setItem('smtpServer', smtpServer);
        localStorage.setItem('smtpPort', smtpPort);
    }, [smtpServer, smtpPort]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setSmtpServer(event.target.elements[0].value);
        setSmtpPort(event.target.elements[1].value);
    };

    return (
        <div className="settings">
            <h2>SMTP Settings</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="SMTP Server" defaultValue={smtpServer} />
                <input type="text" placeholder="SMTP Port" defaultValue={smtpPort} />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default Settings;