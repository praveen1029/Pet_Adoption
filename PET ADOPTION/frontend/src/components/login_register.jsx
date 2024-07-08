import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MyNavbar } from './landing';
import BaseURL from './base_url';
import '../components/login_register.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import logo from "../images/pet_logo.png";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ClipLoader from "react-spinners/ClipLoader";

const LoginRegister = () => {

    const InvalidToken = localStorage.getItem('InvalidToken');

    // UseNavigate Hook For Navigation To Another Page
    const navigate = useNavigate();
    
    // Calling Baseurl
    const { baseurl } = BaseURL();

    // Initial Values For Form Fields
    const initialform = {
        email: '',
        first_name: '',
        last_name: '',
        contact: '',
        address: '',
        password: '',
        image: null,
        is_donor: false
    }

    useEffect(() => {
        if(InvalidToken !== ''){
            NotificationManager.error(InvalidToken, 'Error');
            localStorage.setItem('InvalidToken', '');
        }
    }, [InvalidToken]);

    // UseState Hook For Login And Register Form
    const [formData, setFormData] = useState(initialform);

    // UseState Hook To Change Value Of Visible Variable To Hide Or Show Register Or Login Form
    const [visible, setVisible] = useState(true);

    // UseState Hook To Show Loading GIF
    const [loading, setLoading] = useState(false);

    // Function For Change In Form Fields
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: checked
            });
        } else if (type === 'file') {
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

    // UseRef Hook To Slide Between Login And Register Page
    const slideImg = React.useRef(null);
    const slideForm = React.useRef(null);

    // UseEffect To Trigger On Initial Page Load
    useEffect(() => {
        if (visible) {
            // Function To Change To Login To Register And Image Div
            const slideIn = () => {
                const img = slideImg.current;
                const form = slideForm.current;
                if (img) {
                    img.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
                    img.style.transform = 'translateX(0%)'; // Use 0% instead of 0
                    img.style.opacity = '1';
                }
                if (form) {
                    form.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
                    form.style.transform = 'translateX(0%)'; // Use 0% instead of 0
                    form.style.opacity = '1';
                }
            };
            slideIn();
        } else {
            // Function To Change To Register To Login and Image Div
            const slideOut = () => {
                const img = slideImg.current;
                const form = slideForm.current;
                if (img) {
                    img.style.transition = 'transform 1s ease, opacity 1s ease';
                    img.style.transform = 'translateX(-100%)'; // Use -100% instead of -100px
                    img.style.opacity = '1'; // Set opacity to 0 for animation
                }
                if (form) {
                    form.style.transition = 'transform 1s ease, opacity 1s ease';
                    form.style.transform = 'translateX(100%)'; // Use 100% instead of 100px
                    form.style.opacity = '1'; // Set opacity to 0 for animation
                }
            };
            slideOut();
        }
    }, [visible]);

    // Function To Change Visible Variable Value
    const handleClick = () => {
        setFormData(initialform)
        setVisible(!visible);
    };

    // Function To Handle Login
    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(baseurl + 'login/', formData)
        .then(response => {
            localStorage.setItem('access_token', response.data.access_token);
            localStorage.setItem('refresh_token', response.data.refresh_token);
            setLoading(false);
            if ( response.data.is_superuser ){
                navigate('/admin_details');
            }else{
                if ( response.data.is_donor ) {
                    navigate('/pet_form');
                } else {
                    navigate('/pet_list');
                }
            }
        })
        .catch(error => {
            setLoading(false);
            setFormData(initialform)
            NotificationManager.error('Login failed. Please check your credentials and try again.', 'Error');
        });
    };

    // Function To Handle Register
    const handleRegister = (e) => {
        e.preventDefault();
        setLoading(true);
        var msgs = []
        axios.post( baseurl + 'register/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setFormData(initialform)
            setLoading(false);
            NotificationManager.success(`Registration Successfull, A password has been sent to your mail.` , 'Success')
            handleClick()
        })
        .catch(error => {
            if (error.response.data.email){
                msgs.push(error.response.data.email[0].slice(7))
            }
            if(error.response.data.first_name){
                msgs.push(error.response.data.first_name)
            }
            if(error.response.data.last_name){
                msgs.push(error.response.data.last_name)
            }
            if(error.response.data.address){
                msgs.push(error.response.data.address)
            }
            if(error.response.data.contact){
                msgs.push(error.response.data.contact)
            }
            setLoading(false);
            msgs.map(msg=> (
                NotificationManager.error(`Registration Failed. ${msg}` , 'Error')
            ))
        });
    };

    return (
        <>
            <MyNavbar hideHome={false} hideLogin={true} hidepets={false} hideAdoptions={false} hidedonateform={false} hidedonations={false} hideProfile={false} />
            <div className='container-fluid d-flex justify-content-center align-items-center login-register-div'>
                {loading && (
                    <div className='spinner-overlay'>
                        <ClipLoader size={50} />
                    </div>
                )}
                <div className='row'>
                    <div className='form-div' ref={slideForm}>
                        <div style={{ display: visible ? 'block' : 'none' }}>
                            <form onSubmit={handleLogin} className='d-flex flex-column align-items-center'>
                                <div className='logo-div mb-4 d-flex flex-column align-items-center'>
                                    <img className='logo' src={logo} alt='logo' />
                                    <span className='name'>AdoptAPet</span>
                                </div>
                                <div className='mb-3'>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder='Enter Your Email'
                                        style={{ width: '300px' }}
                                        className='login-register-inputs'
                                    />
                                </div>
                                <div className='mb-3'>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder='Enter Your Password'
                                        style={{ width: '300px' }}
                                        className='login-register-inputs'
                                    />
                                </div>
                                <div className='mt-3'>
                                    <button type="submit" className='login-register-btn'>Login</button>
                                </div>
                                <div className='mt-3'>
                                    <div className='move-link' onClick={handleClick}>Don't have an account?</div>
                                </div>
                            </form>
                        </div>
                        <div style={{ display: visible ? 'none' : 'block' }}>
                            <form onSubmit={handleRegister} className='d-flex flex-column align-items-center'>
                                <div className='logo-div mt-2 mb-3 d-flex flex-column align-items-center'>
                                    <img className='logo' src={logo} alt='logo' />
                                    <span className='name'>AdoptAPet</span>
                                </div>
                                <div className='mb-3'>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder='Email'
                                        style={{ width: '300px' }}
                                        className='login-register-inputs'
                                    />
                                </div>
                                <div className='d-flex mb-3 justify-content-between login-register-inputs' style={{ width: '300px' }}>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        placeholder='First Name'
                                        style={{ width: '50%'}}
                                    />&nbsp;
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        placeholder='Last Name'
                                        style={{ width: '50%' }}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <input
                                        type="text"
                                        name="contact"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        placeholder='Contact'
                                        pattern='[1-9]{1}[0-9]{9}'
                                        title='Phone number must have 10 digits !!'
                                        style={{ width: '300px' }}
                                        className='login-register-inputs'
                                    />
                                </div>
                                <div className='mb-3'>
                                    <textarea 
                                        name="address" 
                                        placeholder='Address' 
                                        value={formData.address}
                                        onChange={handleChange}
                                        style={{ width: '300px' }}
                                        className='login-register-inputs'>
                                    </textarea>
                                </div>
                                <div className='mb-3'>
                                    <input 
                                        type='file' 
                                        name='image' 
                                        onChange={handleChange}
                                        style={{ width: '300px' }}
                                        className='login-register-inputs'/>
                                </div>
                                <div className='mb-3'>
                                    <label className='login-register-checkbox-label'>Are you a donor?</label>&nbsp;&nbsp;&nbsp;
                                    <input
                                        type="checkbox"
                                        name="is_donor"
                                        checked={formData.is_donor}
                                        onChange={handleChange}
                                        className='login-register-checkbox'
                                    />
                                </div>
                                <div className='mt-3'>
                                    <button type="submit" className='login-register-btn'>Register</button>
                                </div>                                    
                                <div className='mt-3'>
                                    <div className='move-link' onClick={handleClick}>Already have an account?</div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={`form-div-img ${visible ? '' : 'cat-img'}`} ref={slideImg}></div>
                </div>
            </div>
            <NotificationContainer />
        </>
    );
};

export default LoginRegister;
