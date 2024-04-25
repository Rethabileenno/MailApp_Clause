import React from 'react';
import './Settings.css';

function Settings() {
    return (
        <div className="settings">
            <h2>SMTP Settings</h2>
            <form>
                <input type="text" placeholder="SMTP Server" />
                <input type="text" placeholder="SMTP Port" />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default Settings;