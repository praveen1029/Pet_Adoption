import React, { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const PetForm = () => {
    const location = useLocation();
    const userId = location.state.userId;
    const [formData, setFormData] = useState({
        category: '',
        desc: '',
        remark: '',
        img: null
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('category', formData.category);
        data.append('description', formData.desc);
        data.append('remark', formData.remark);
        if (formData.img) {
            data.append('image', formData.img);
        }
        data.append('user', userId);

        console.log(data)

        axios.post('http://localhost:8000/api/register_pet/', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
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
            </form>
        </>
    );
};

export default PetForm;
