import axios from "axios";
import React, { useEffect, useState } from "react";
import BaseURL from "./base_url";
import '../components/approve_adoption_list.css';
import { useNavigate } from "react-router-dom";

const PendingApproval = () => {
    const token = localStorage.getItem('access_token');

    const { baseurl } = BaseURL();
    const navigate = useNavigate();
    const [adoptions, setadoptions] = useState([]);

    useEffect(() => {
        const validateToken = async () => {
            try {
                await axios.get(baseurl + `adoptions_details/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                
            } catch (error) {
                localStorage.setItem('InvalidToken', 'Session Expired, Please login again.');
                navigate('/login-register');
            }
        }
        validateToken();

        fetchAdoptList();

    },[token, baseurl]);

    const fetchAdoptList = () => {
        axios.get(baseurl + 'adoptions_details/', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
          .then(response => {
            setadoptions(response.data)
          })
    }

    const handleApprove = (id) => {
        axios.put(baseurl + `approve_adoption/${id}/`, { is_approved: true })
        .then(response => {
          fetchAdoptList();
        })
        .catch(error => {
        console.error('There was an error approving the adoption!', error);
        });
    }

  return (
    <div className="list-container">
      {adoptions.map(data => (
        <div key={data.id} className="list-item">
          <img src={data.img} alt={data.title} className="list-data-img" />
          <div className="list-data-content">
            <h3>{data.pet.id}</h3>
            <div className="list-data-reviews">
              <span className="stars">★★★★★</span>
              <span className="review-count">{data.reviews ? `${data.reviews.toLocaleString()} reviews` : 'Be the first to review!'}</span>
            </div>
            <p className="list-data-type">{data.type}</p>
            <p className="list-data-address">{data.address}</p>
            <button onClick={() => handleApprove(data.id)}>Approve</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PendingApproval;
