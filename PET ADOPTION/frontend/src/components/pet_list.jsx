import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';
import BaseURL from "./base_url";
import logo from "../images/pet_logo.png";
import '../components/pet_list.css'
import { MyNavbar } from './landing';

const PetList = () =>{
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const baseurl = BaseURL()
        axios.get(baseurl + 'list_pet/')
            .then(response => {
                setPets(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the pets!', error);
            });
    }, []);

    return (
        <>
            <MyNavbar hideHome={true} hideLogin={true} hideAdoptions={true} hideProfile={true} />
            <div className='container-fluid pet-list-div'>
                <div className="row">
                <div className='pet-div'>
                <ul>
                        {pets.map(pet => (
                            <li key={pet.id}>
                                <h2>{pet.category}</h2>
                                <p>{pet.description}</p>
                                <p>{pet.remark}</p>
                                <img src={`${pet.image}`} alt={pet.category} width="200" />
                            </li>
                        ))}
                    </ul>
                    </div>


                </div>
            </div>
        </>
    );

};

export default PetList;