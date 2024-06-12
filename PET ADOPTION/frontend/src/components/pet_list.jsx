import axios from "axios";
import React, { useEffect, useState } from "react";
import BaseURL from "./base_url";
import { MyNavbar } from './landing';
import '../components/pet_list.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

export const PetCards = () => {
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
            <div className="pet-card-div mt-4">
                {pets.map(pet => (
                    <div className="pet-card" key={pet.id}>
                        <div className="pet-img mt-2">
                            <img src={`${pet.image}`} alt={pet.category} width="285" />
                        </div>
                        <div className="pet-content-div mt-4 ms-2 me-2 mb-4">
                            <h5>{pet.category}</h5> 
                            <Link to="/user_page"><button className="btn btn-danger view-btn"><i className="fa fa-eye"></i>&nbsp;View</button></Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export const PetList = () => {
    return (
        <>
            <MyNavbar hideHome={true} hideLogin={true} hideAdoptions={true} hideProfile={true} />
            <div className='container-fluid pet-list-div'>
                <div className="row">
                    <div className='pet-div'>
                        <PetCards />
                    </div>
                </div>
            </div>
        </>
    );

};

export default PetList;