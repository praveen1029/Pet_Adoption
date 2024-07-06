import axios from "axios";
import React, { useEffect, useState } from "react";
import BaseURL from "./base_url";
import { MyNavbar } from './landing';
import '../components/pet_list.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";

const PetList = () => {
    const token = localStorage.getItem('access_token');
    const { baseurl } = BaseURL();
    const navigate = useNavigate();
    const [pets, setPets] = useState([]);
    const [emptypets, setEmptypets] = useState(false);

    useEffect(() => {
        const fetchPets = async () => {
            try {
                const response = await axios.get(baseurl + 'list_pet/', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setPets(response.data);
                setEmptypets(response.data.length === 0);
            } catch (error) {
                console.error('Error fetching pets:', error);
            }
        };

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
        };

        fetchPets();
        validateToken();
    }, [baseurl, token, navigate]);

    return (
        <>
            <MyNavbar hideHome={true} hideLogin={true} hidepets={true} hideAdoptions={true} hidedonateform={false} hidedonations={false} hideProfile={true} />
            <div className='container-fluid pet-list-div'>
                <div className="row">
                    <div className="pet-card-div mt-4">
                        {emptypets && 
                        <div className="text-danger d-flex flex-column justify-content-center align-items-center" style={{width:'100%'}}>
                            Sorry, there are currently no pets to adopt!
                        </div>
                        }
                        <div className="row">
                            {pets.map(pet => (
                                <div className="col-md-3" style={{padding:'1.5%'}} key={pet.id}>
                                    <div className="pet-card">
                                        <div className="pet-img mt-2 p-1">
                                            <img src={`${pet.image}`} alt={pet.category}  />
                                        </div> 
                                        <div className="pet-content-div ps-2 pe-2 pt-3 pb-3">
                                            <h5>{pet.category}</h5> 
                                            <Link to="/pet_details" state={{ petId: pet.id }}>
                                                <button className="btn btn-danger view-btn"><i className="fa fa-eye"></i> View</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PetList;
