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
                // Handle successful registration
            })
            .catch(error => {
                console.error('There was an error!', error);
                // Handle error
            });
    };

    return(
        <>
         <MyNavbar hideHome={true} hideLogin={true} hidepets={true} hideAdoptions={true} hideProfile={false} />

         <div className='container-fluid d-flex justify-content-center align-items-center user-details-div'>
            <div className='user-details'>
                <h2>My Details</h2>
                <div className="user-data">
                    <div className="data-fields">
                        Full Name <br />
                        {formData.first_name}{formData.last_name}
                    </div>
                    <div className="data-fields">
                        Email
                        {formData.email}
                    </div>
                    <div className="data-fields">
                        contact
                        {formData.contact}
                    </div>
                    <div className="data-fields">
                        address
                        {formData.address}
                    </div>
                </div>
            </div>
        </div>

        <div style={{ display: isVisible ? 'block' : 'none' }}>
        {formData.id}
        {formData.first_name}{formData.last_name}
        </div>
        <button onClick={toggleVisibility}>Click</button>
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
        </>
    );

};

export default UserPage;