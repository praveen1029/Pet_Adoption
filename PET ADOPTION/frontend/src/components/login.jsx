import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BaseURL from './base_url';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();

    const baseurl = BaseURL()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(baseurl + 'login/', formData)
            .then(response => {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                if (response.data.is_donor){
                    navigate('/pet_form');
                } else{
                    navigate('/pet_list');
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                // Handle error
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit">Login</button>
            <Link to="/register" >Register</Link>
        </form>
    );
};

export default Login;
