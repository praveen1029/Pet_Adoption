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
            <div className='container-fluid d-flex justify-content-center align-items-center details-div'>
                <div className='pet-details-div'>
                    <div className='pets-img'>
                        <img src={pet.image} alt={pet.category} />
                    </div>
                    <div className='pet-details'>
                        <div style={{ height:'100%' }}>
                            <h2>{ pet.category }</h2>
                            <div className='description-div'>
                                <p>{ pet.description }</p>
                            </div>
                            <p>{ pet.remark }</p>
                        </div>
                        <div className="adopt-btn">
                            <button>Adopt</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PetDetails;