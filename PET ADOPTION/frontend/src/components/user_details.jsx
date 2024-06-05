import React from "react";
import { useLocation } from 'react-router-dom';

const UserDetails = () =>{

    const location = useLocation()
    const userId = location.state.id;

    useEffect(() => {
        const response = axios.get(`http://localhost:8000/api/pets/${petId}/`);

    });

    return(
        <>
        <div>{response.id}</div>
        </>
    );

};

export default UserDetails;