import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { MyNavbar } from './landing';
import '../components/pet_details.css'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useNavigate } from 'react-router-dom';
import BaseURL from './base_url';
import axios from 'axios';

const AdoptionDonation = () => {
    const location = useLocation();
    const [pet, setPet] = useState('');

    const token = localStorage.getItem('access_token');

    const { baseurl,backendurl } = BaseURL();

    const navigate = useNavigate();

    useEffect(() => {
        const validateToken = async () => {
            try {
                await axios.get(baseurl + 'validate_token/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
            } catch (error) {
                localStorage.setItem('InvalidToken', 'Session Expired, Please login again.');
                navigate('/login-register');
            }
        };  
        validateToken();

        const fetchPet = async () => {
              const response = await axios.get(baseurl + `adoptions/`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }});
              setPet(response.data);
          };
      
          fetchPet();
    }, [baseurl, navigate, token]);

    const handleAdoptClick = () => {
        
    };



    return (
        <>
            <MyNavbar hideHome={true} hideLogin={true} hidepets={true} hideAdoptions={true} hideProfile={true} />
            <div className='container-fluid details-div'>
                <div className='pet-details-div'>
                    <div className='pets-img'>
                        <img src={`${backendurl + pet.image}`} alt={pet.category} />
                    </div>
                    <div className='pet-details'>
                        <div style={{ height:'100%' }}>
                            <h2>{ pet.category }</h2>
                            <div className='description-div'>
                                <p>{ pet.description }</p>
                            </div>
                            <p>{ pet.remark }</p>
                        </div>
                        { pet.is_adopted ? <div>Adopted</div> : <>
                            <div className="adopt-btn">
                            <button onClick={handleAdoptClick}> Adopt</button>
                        </div>
                        </>
                        }
                        
                    </div>
                </div>
            </div>
            <NotificationContainer />
        </>
    )
}

export default AdoptionDonation;