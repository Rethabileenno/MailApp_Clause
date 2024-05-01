import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Settings from './Settings';
import SentEmails from './SentEmails';

function App() {
  return (
    <Router>  
      <Routes>
        <Route path="/" element= {< Login/>} />
        <Route path="/register" element = {< Register/>} />
        <Route path="/dashboard" element = {< Dashboard/>} />
        <Route path="/settings" element = {< Settings/>} />
        <Route path="/sent-emails" element = {<SentEmails/>} />
      </Routes>
    </Router>
  );
}

export default App;