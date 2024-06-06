import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import BaseURL from "./base_url";

const UserDetails = () =>{

    const location = useLocation()
    const userId = location.state.id;

    const [pet, setPet] = useState(null);

    
    useEffect(() => {
        const baseurl = BaseURL()
        const fetchPetDetails = async () => {
            // Use await to wait for the Axios GET request to complete
            const response = await axios.get(baseurl + `list_users/${userId}/`);
            setPet(response.data);
        };
    
        fetchPetDetails();
      }, [userId]);

    return(
        <>
        <div>{{pet}}</div>
        </>
    );

};

export default UserDetails;