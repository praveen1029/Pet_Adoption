import React, { useState } from 'react';
import axios from 'axios';
import { MyNavbar } from './landing';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        contact: '',
        password: '',
        password2: '',
        is_donor: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register/', formData)
            .then(response => {
                console.log(response.data);
                // Handle successful registration
            })
            .catch(error => {
                console.error('There was an error!', error);
                // Handle error
            });
    };

    return (
        <>
        <MyNavbar />
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
                <label>First Name:</label>
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
            </div>
            <div>
                <label>Last Name:</label>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
            </div>
            <div>
                <label>Contact:</label>
                <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input type="password" name="password2" value={formData.password2} onChange={handleChange} />
            </div>
            <div>
                <label>Are you a donor?</label>
                <input type="checkbox" name="is_donor" checked={formData.is_donor} onChange={handleChange} />
            </div>
            <button type="submit">Register</button>
            <Link to="/login" >Login</Link>
        </form>
        </>
    );
};

export default Register;
