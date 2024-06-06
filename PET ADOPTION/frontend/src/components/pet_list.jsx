import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BaseURL from "./base_url";

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
        <div>
            <Link to="/user_details">User Details</Link>
            <h1>Pet List</h1>
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
    );

};

export default PetList;