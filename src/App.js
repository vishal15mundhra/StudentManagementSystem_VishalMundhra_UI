import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import LoginPage from './LoginPage';
import MasterPage from './MasterPage';
import StudentPage from './StudentPage';
import ClassPage from './ClassPage';

function App() {
  const [token, setToken] = useState('');

    const handleLogout = () => {
        setToken('');
    };

  return (
    <Router>
            <Routes>
                <Route path="/" exact element={token ? <Navigate  to="/master" /> : <LoginPage setToken={setToken} />}>
                    
                </Route>
                <Route path="/master" element = {token ? <MasterPage handleLogout={handleLogout} /> : <Navigate  to="/" />}>
                    
                </Route>
                <Route path="/students" element = {token ? <StudentPage /> : <Navigate  to="/" />}>
                    
                </Route>
                <Route path="/classes" element = {token ? <ClassPage /> : <Navigate  to="/" />}>
                    
                </Route>
            </Routes>
        </Router>
  );
}

export default App;
