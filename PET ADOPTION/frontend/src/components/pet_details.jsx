import React from 'react'
import { useLocation } from 'react-router-dom';
import { MyNavbar } from './landing';
import '../components/pet_details.css'

const PetDetails = () => {
    const location = useLocation();
    const { pet } = location.state || {}; // Provide a default empty object

    return (
        <>
            <MyNavbar hideHome={true} hideLogin={true} hidepets={true} hideAdoptions={true} hideProfile={true} />
            <div className='container-fluid flex-column d-flex justify-content-center align-items-center details-div'>

                <div className='pet-details-div'>
                    
                    <h1>PetDetails</h1>

                    {pet.category}
                    {pet ? (
                        <h2>Category:<img src={pet.image} alt={pet.image} width="285" /></h2>
                    ) : (
                        <p>No category information available.</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default PetDetails;