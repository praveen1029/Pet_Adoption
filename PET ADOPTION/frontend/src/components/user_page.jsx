import axios from "axios";
import React, { useEffect, useState } from "react";
import BaseURL from "./base_url";
import { MyNavbar } from "./landing";
import '../components/user_page.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useNavigate } from "react-router-dom";

const UserPage = () => {
    const token = localStorage.getItem('access_token');

    const baseurl = BaseURL();

    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(0);

    const [isprofile, setIsprofile] = useState(true);

    const [formData, setFormData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        contact: '',
        address:'',
        image: null,
    });

    const initialpass = {
        current: '',
        passw: '',
        cpassw: ''
    }

    const [passwordData, setPasswordData] = useState(initialpass)
    
    const toggleToDetails = (e) => {
        e.preventDefault();
        setIsVisible(0);
    };

    const toggleToEdit = (e) => {
        e.preventDefault();
        setIsVisible(1);
    };

    const toggleToPassword = (e) => {
        e.preventDefault();
        setIsVisible(2);
        setPasswordData(initialpass)
    };

    const fetchUserDetails = async () => {
        const response = await axios.get(baseurl + `get_user/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        setFormData(response.data);
    };

    const validateToken = async () => {
        try {
            await axios.get(baseurl + `validate_token/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchUserDetails();
        } catch (error) {
            localStorage.setItem('InvalidToken', 'Session Expired, Please login again.');
            navigate('/login-register');
        }
    }

    useEffect(() => {
        validateToken();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData({
                ...formData,
                [name]: files[0]
            });
            setIsprofile(false)
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isprofile){
            formData.image = null
        }
        axios.put(baseurl + 'update_user/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setIsVisible(0)
            NotificationManager.success('Updation Successful.', 'Success');
            fetchUserDetails(); 
        })
        .catch(error => {
            const msgs = [];
            if (error.response.data.email) {
                msgs.push(error.response.data.email[0].slice(7));
            }
            if (error.response.data.first_name) {
                msgs.push(error.response.data.first_name);
            }
            if (error.response.data.last_name) {
                msgs.push(error.response.data.last_name);
            }
            if (error.response.data.address) {
                msgs.push(error.response.data.address);
            }
            if (error.response.data.contact) {
                msgs.push(error.response.data.contact);
            }
            msgs.forEach(msg => (
                NotificationManager.error(`Updation Failed. ${msg}` , 'Error')
            ));
        });
    };

    const formatAddress = (address) => {
        return address.replace(/[\n,]/g, '<br />');
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value
        });
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(baseurl + 'change_password/', passwordData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setIsVisible(0)
            NotificationManager.success('Password Changed Successfully.', 'Success');
            setPasswordData(initialpass)
        } catch (error) {
            var msg = error.response.data.non_field_errors[0];
            NotificationManager.error(`Password Change Failed. ${msg}`, 'Error')
            setPasswordData(initialpass)
        }
    };

    return(
        <>
         <MyNavbar hideHome={true} hideLogin={true} hidepets={true} hideAdoptions={true} hideProfile={false} />

         <div className='container-fluid d-flex justify-content-center align-items-center user-details-div'>
            <div className='user-details'>
                <h2 style={{ display: isVisible == 0 ? 'block' : 'none' }}>My Details</h2>
                <h2 style={{ display: isVisible == 1 ? 'block' : 'none' }}>Edit Details</h2>
                <h2 style={{ display: isVisible == 2 ? 'block' : 'none' }}>Change Pasword</h2>

                <div className="container mt-4 mb-4 d-flex justify-content-center"> 
                    <div className="card" style={{ display: isVisible == 0 ? 'block' : 'none' }}> 
                        <div className="image d-flex flex-column justify-content-center align-items-center"> 
                            <button className="btn btn-secondary round-div"> 
                                <img src={formData.image} style={{objectFit:'cover'}} alt="profile"/>
                            </button> 
                            <span className="name mt-3">{formData.first_name}&nbsp;{formData.last_name}</span> 
                            <span className="idd">{formData.email}</span> 
                            <div className="text mt-3"> 
                                <span dangerouslySetInnerHTML={{ __html: formatAddress(formData.address) }} />
                            </div> 
                            <div className="px-2 rounded mt-4 date">
                                <span className="join">Contact: {formData.contact}</span> 
                            </div> <br />
                            <div className="d-flex gap-3 mt-2"> 
                                <button className="btn1 btn-dark" onClick={toggleToEdit}>Edit Profile</button> 
                                <button className="btn1 btn-dark" onClick={toggleToPassword}>Change Password</button>
                            </div> 
                        </div> 
                    </div>
                </div>

                <div style={{ display: isVisible == 1 ? 'block' : 'none' }}>
                    <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center" encType="multipart/form-data">
                        <div className="mb-3">
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                style={{ width: '300px' }}
                            />
                        </div>
                        <div className="d-flex mb-3 justify-content-between" style={{ width: '300px' }}>
                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="First Name"
                                style={{ width: '50%' }}
                            />&nbsp;
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Last Name"
                                style={{ width: '50%' }}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="text"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                placeholder="Contact"
                                pattern="[1-9]{1}[0-9]{9}"
                                title="Phone number must have 10 digits !!"
                                style={{ width: '300px' }}
                            />
                        </div>
                        <div className="mb-3">
                            <textarea
                                name="address"
                                placeholder="Address"
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
                                src={formData.image}
                            />
                        </div>
                        <div className="d-flex gap-3 mt-2"> 
                            <button className="btn1 btn-dark" type="submit">Update</button> 
                            <button className="btn1 btn-dark" onClick={toggleToDetails}>Back</button>
                        </div>                                 
                    </form>
                </div>

                <div style={{ display: isVisible == 2 ? 'block' : 'none' }}>
                    <form onSubmit={handlePasswordSubmit} className="d-flex flex-column align-items-center">
                            <div className="mb-3">
                                <input
                                    type="password"
                                    name="current"
                                    value={passwordData.current}
                                    onChange={handlePasswordChange}
                                    placeholder="Old Password"
                                    style={{ width: '300px' }}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    name="passw"
                                    value={passwordData.passw}
                                    onChange={handlePasswordChange}
                                    placeholder="New Password"
                                    style={{ width: '300px' }}
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="password"
                                    name="cpassw"
                                    value={passwordData.cpassw}
                                    onChange={handlePasswordChange}
                                    placeholder="Confirm Password"
                                    style={{ width: '300px' }}
                                />
                            </div>
                            <div className="d-flex gap-3 mt-2">
                                <button className="btn1 btn-dark" type="submit">Update</button> 
                                <button className="btn1 btn-dark" onClick={toggleToDetails}>Back</button>
                            </div>
                        </form>
                </div>
            </div>
            <NotificationContainer />
        </div>
        </>
    );
};

export default UserPage;
