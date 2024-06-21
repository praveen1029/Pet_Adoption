import axios from "axios";
import React, { useEffect, useState } from "react";
import BaseURL from "./base_url";
import { MyNavbar } from './landing';
import '../components/my_donations.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";

const PetList = () => {
    const token = localStorage.getItem('access_token');

    const { baseurl } = BaseURL();

    const [pets, setPets] = useState([]);

    const [emptypets, setEmptypets] = useState(false)

    useEffect(() => {
        axios.get(baseurl + 'my_donations/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setPets(response.data);
            if (pets.length !== 0){
                setEmptypets(true)
            }else{
                setEmptypets(false)
            }
        })

    });

    return (
        <>
            <MyNavbar hideHome={true} hideLogin={true} hidepets={false} hideAdoptions={false}  hidedonateform={true} hidedonations={true} hideProfile={true} />
            <div className='container-fluid pet-list-div'>
                <div className="row">
                    <div className='pet-div'>
                    <div className="pet-card-div mt-4">
                        {!emptypets && 
                        <div className="text-danger d-flex flex-column justify-content-center align-items-center" style={{width:'100%', fontSize:'xx-large'}}>
                            Sorry, you have not given any pets for adoptions!
                        </div>
                        }
                        {pets.map(pet => (
                            <div className="pet-card" key={pet.id}>
                                <div className="pet-img mt-2">
                                    <img src={`${pet.image}`} alt={pet.category} width="285" />
                                </div>
                                <div className="pet-content-div mt-4 ms-2 me-2 mb-4">
                                    <h5>{pet.category}</h5> 
                                    <Link to= "/pet_details" state={{ petId: pet.id }}>
                                        <button className="btn btn-danger view-btn">&nbsp;&nbsp;<i className="fa fa-eye"></i>&nbsp;View&nbsp;&nbsp;</button>
                                    </Link>
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

export default PetList