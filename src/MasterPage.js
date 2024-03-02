import React from 'react';
import { Link } from 'react-router-dom';

const MasterPage = ({ handleLogout }) => {
    return (
        <div>
            <h1>Master Page</h1>
            <nav>
                <ul>
                    <li><Link to="/students">Students</Link></li>
                    <li><Link to="/classes">Classes</Link></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
            </nav>
        </div>
    );
};

export default MasterPage;
