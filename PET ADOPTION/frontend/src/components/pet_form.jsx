import React, { useState } from 'react';
import axios from 'axios';
import BaseURL from './base_url';
import { Link } from 'react-router-dom';

const PetForm = () => {
    const [formData, setFormData] = useState({
        category: '',
        desc: '',
        remark: '',
        img: null
    });

    const token = localStorage.getItem('access_token');

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const baseurl = BaseURL()

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('category', formData.category);
        data.append('description', formData.desc);
        data.append('remark', formData.remark);
        if (formData.img) {
            data.append('image', formData.img);
        }

        axios.post(baseurl + 'register_pet/', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };

    return (
        <>
            <h1>PET FORM</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Pet Category:</label>
                    <input type="text" name="category" value={formData.category} onChange={handleChange} />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="desc" value={formData.desc} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label>Remark:</label>
                    <textarea name="remark" value={formData.remark} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" name="img" onChange={handleChange} />
                </div>
                <button type="submit">Register</button>
                <Link to="/user_page">User Details</Link>
            </form>
        </>
    );
};

export default PetForm;
