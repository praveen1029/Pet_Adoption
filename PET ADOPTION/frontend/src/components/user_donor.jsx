import '../components/user_donor.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import BaseURL from "./base_url";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const ProfileCard = ({user}) => {
    const [expanded, setExpanded] = useState(false);

    const toggleCard = () => {
        setExpanded(!expanded);
    };
    return (
        <div className="profile-card">
            <div className="profile-img-container">
                <img src="http://localhost:8000/media/images.jpeg" alt="Profile" className="profile-img" />
            </div>
            <div className={`profile-overlay ${expanded ? 'expanded' : ''}`}>
                <div className="profile-info">
                    <h2>{user.first_name}</h2>
                    <p>{user.email}</p>
                </div>
                <button className="toggle-btn" onClick={toggleCard}>
                    {expanded ? '▲' : '▼'}
                </button>
                {expanded && (
                    <div className="profile-details">
                        <div className="actions">
                            <button className="message-btn">Details</button>
                            <button className="hire-btn">Delete</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const UserDonor = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const { baseurl } = BaseURL();

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                let endpoint = 'users/';
                if (location.pathname === '/donors') {
                    endpoint = 'donors/';
                }
                const response = await axios.get(baseurl + endpoint, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [location.pathname, baseurl]);
    return (
        <div className="container-fluid">
            {users.map(user => (
                <ProfileCard user={user} />
            ))}
        </div>
    );
};

export default UserDonor;
