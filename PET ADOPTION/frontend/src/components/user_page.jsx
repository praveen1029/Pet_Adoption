import axios from "axios";
import React, { useEffect, useState } from "react";
import BaseURL from "./base_url";
import { MyNavbar } from "./landing";
import '../components/user_page.css'

const UserPage = () =>{

    const token = localStorage.getItem('access_token');

    const [isVisible, setIsVisible] = useState(true);

    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        contact: '',
        address:'',
        is_donor: false,
    });

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    
    useEffect(() => {
        const baseurl = BaseURL()
        const fetchUserDetails = async () => {
            // Use await to wait for the Axios GET request to complete
            const response = await axios.get(baseurl + `get_user/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setFormData(response.data)
        };
    
        fetchUserDetails();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const baseurl = BaseURL()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put( baseurl + 'update_user/', formData, {
            headers: {
                'Content-Type': 'application/json',
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

    return(
        <>
         <MyNavbar hideHome={true} hideLogin={true} hidepets={true} hideAdoptions={true} hideProfile={false} />

         <div className='container-fluid d-flex justify-content-center align-items-center user-details-div'>
            <div className='user-details'>
                <h2 style={{ display: isVisible ? 'block' : 'none' }}>My Details</h2>
                <h2 style={{ display: isVisible ? 'none' : 'block' }}>Edit Details</h2>

                <div class="container mt-4 mb-4 d-flex justify-content-center"> 
                    <div class="card" style={{ display: isVisible ? 'block' : 'none' }}> 
                        <div class="image d-flex flex-column justify-content-center align-items-center"> 
                            <button class="btn btn-secondary round-div" > <img src={formData.image} style={{objectFit:'cover'}} /></button> 
                            <span class="name mt-3">{formData.first_name}&nbsp;{formData.last_name}</span> 
                            <span class="idd">{formData.email}</span> 
                            <div class="text mt-3"> 
                                <span>
                                    {formData.address}kjsj
                                </span> 
                            </div> 
                            <div class=" d-flex mt-2"> <button class="btn1 btn-dark" onClick={toggleVisibility}>Edit Profile</button> </div> 
                            <div class=" px-2 rounded mt-4 date ">
                                <span class="join">Contact: {formData.contact}</span> 
                            </div> 
                        </div> 
                    </div>
                </div>
                <div style={{ display: isVisible ? 'none' : 'block' }}>
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
                        <div></div>
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );

};

export default UserPage;