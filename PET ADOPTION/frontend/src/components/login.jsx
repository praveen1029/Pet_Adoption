import React, { useEffect, useState } from 'react';
import '../components/login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BaseURL from './base_url';
import { MyNavbar } from './landing';
import logo from "../images/pet_logo.png";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        contact: '',
        is_donor: false
    });

    const [visible, setVisible] = useState(true);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const navigate = useNavigate();
    const baseurl = BaseURL();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(baseurl + 'login/', formData)
            .then(response => {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                if (response.data.is_donor) {
                    navigate('/pet_form');
                } else {
                    navigate('/pet_list');
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    const slideDivRef1 = React.useRef(null);
    const slideDivRef2 = React.useRef(null);

    useEffect(() => {
        if (visible) {
            slideIn();
        } else {
            slideOut();
        }
    }, [visible]);

    const handleClick = () => {
        setVisible(!visible);
    };

    const slideIn = () => {
        const element1 = slideDivRef1.current;
        const element2 = slideDivRef2.current;
        if (element1) {
            element1.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
            element1.style.transform = 'translateX(0)';
            element1.style.opacity = '1';
        }
        if (element2) {
            element2.style.transition = 'transform 1s ease-in-out, opacity 1s ease-in-out';
            element2.style.transform = 'translateX(0)';
            element2.style.opacity = '1';
        }
    };

    const slideOut = () => {
        const element1 = slideDivRef1.current;
        const element2 = slideDivRef2.current;
        if (element1) {
            element1.style.transition = 'transform 1s ease, opacity 1s ease';
            element1.style.transform = 'translateX(-100%)';
            element1.style.opacity = '1';
        }
        if (element2) {
            element2.style.transition = 'transform 1s ease, opacity 1s ease';
            element2.style.transform = 'translateX(100%)';
            element2.style.opacity = '1';
        }
    };

    return (
        <>
            <MyNavbar hideLink={true} />
            <div className='container-fluid d-flex justify-content-center align-items-center login-div'>
                <div className="slide-in-div">
                    <div className='row'>
                        <div className='form-div d-flex flex-column justify-content-center align-items-center' ref={slideDivRef2}>
                            <div style={{ display: visible ? 'block' : 'none' }}>
                                <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>
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
                                        />
                                    </div>
                                    <div className='mt-3'>
                                        <button type="submit">Login</button>
                                    </div>
                                    <div className='mt-3'>
                                        <div className='move-link' onClick={handleClick}>Don't have an account?</div>
                                    </div>
                                </form>
                            </div>
                            <div style={{ display: visible ? 'none' : 'block' }}>
                                <form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>
                                <div className='logo-div mb-3 d-flex flex-column align-items-center'>
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
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            placeholder='First Name'
                                            style={{ width: '300px' }}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type="text"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            placeholder='Last Name'
                                            style={{ width: '300px' }}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type="text"
                                            name="contact"
                                            value={formData.contact}
                                            onChange={handleChange}
                                            placeholder='Contact'
                                            style={{ width: '300px' }}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label>Are you a donor?</label>&nbsp;&nbsp;&nbsp;
                                        <input
                                            type="checkbox"
                                            name="is_donor"
                                            checked={formData.is_donor}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className='mt-3'>
                                    <button type="submit">Register</button>
                                    </div>                                    
                                    <div className='mt-3'>
                                        <div className='move-link' onClick={handleClick}>Already have an account?</div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className={`form-div-img ${visible ? '' : 'cat-img'}`} ref={slideDivRef1}></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
