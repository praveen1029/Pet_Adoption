import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BaseURL from './base_url';
import { useNavigate } from 'react-router-dom';
import { MyNavbar } from './landing';
import '../components/pet_form.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const PetForm = () => {
    const token = localStorage.getItem('access_token');

    const baseurl = BaseURL();

    const navigate = useNavigate();

    const initalPet = {
        category: '',
        description: '',
        remark: '',
        image: null
    }

    const [formData, setFormData] = useState(initalPet);

    useEffect(() => {
        const validateToken = async () => {
            try {
                await axios.get(baseurl + `validate_token/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                
            } catch (error) {
                localStorage.setItem('InvalidToken', 'Session Expired, Please login again.');
                navigate('/login-register');
            }
        }
        validateToken();
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
        if (formData.category === ''){
            NotificationManager.error('Please select a category.', 'Error');
        }else{
            axios.post(baseurl + 'register_pet/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                NotificationManager.success(`Registeration Successful.` , 'Success')
                setFormData(initalPet)
            })
            .catch(error => {
                const msgs = [];
            if (error.response.data.description) {
                msgs.push(error.response.data.description);
            }
            if (error.response.data.image) {
                msgs.push(error.response.data.image);
            }
            msgs.forEach(msg => (
                NotificationManager.error(`Registeration Failed. ${msg}` , 'Error')
            ));
            });
        }
    };

    return (
        <>
            <MyNavbar hideHome={true} hideLogin={true} hidepets={false} hideAdoptions={false} hidedonateform={true} hidedonations={true} hideProfile={true} />

            <div className='container-fluid pet-form-div d-flex justify-content-center align-items-center'>
                <div className="user-details mt-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">

                            <select name="category" 
                                value={formData.category}
                                onChange={handleChange}
                                style={{ width: '300px' }}>
                                    <option hidden>Category</option>
                                    <option value="Dog">Dog</option>
                                    <option value="Cat">Cat</option>
                                    <option value="Fish">Fish</option>
                                    <option value="Snake">Snake</option>
                                    <option value="Hamster">Hamster</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <textarea
                                name="description"
                                placeholder="Description"
                                value={formData.address}
                                onChange={handleChange}
                                style={{ width: '300px' }}>
                            </textarea>
                        </div>
                        <div className="mb-3">
                            <textarea
                                name="remark"
                                placeholder="Remark"
                                value={formData.address}
                                onChange={handleChange}
                                style={{ width: '300px' }}>
                            </textarea>
                        </div>
                        <div className="mb-3">
                            <input
                                type="file"
                                name="image"
                                onChange={handleChange}
                                style={{ width: '300px' }}
                            />
                        </div>
                        <div className="mt-2"> 
                            <button className="btn1 btn-dark" type="submit">Register</button> 
                        </div>                                 

                </form>
                </div>
            </div>
            <NotificationContainer />
        </>
    );
};

export default PetForm;
