// src/components/Sidebar.js
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import BaseURL from "./base_url";
import axios from 'axios';

// CSS keyframes for slower vibration
const vibrate = keyframes`
  0% { transform: translate(0, 0); }
  20% { transform: translate(-2px, 2px); }
  40% { transform: translate(2px, -2px); }
  60% { transform: translate(-2px, 2px); }
  80% { transform: translate(2px, -2px); }
  100% { transform: translate(0, 0); }
`;

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: ${props => (props.isOpen ? '250px' : '0')};
  height: 100%;
  background-color: #111;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
  z-index: 1;

  @media (max-width: 768px) {
    width: ${props => (props.isOpen ? '200px' : '0')};
  }
`;

const SidebarLink = styled.a`
  padding: 10px 15px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;

  &:hover {
    color: #f1f1f1;
  }
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 15px;
  left: ${props => (props.isOpen ? '260px' : '15px')};
  font-size: 20px;
  padding: 10px 15px;
  background-color: #111;
  color: white;
  border: none;
  cursor: pointer;
  z-index: 2;
  transition: 0.3s;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    left: ${props => (props.isOpen ? '210px' : '15px')};
  }
`;

const NotificationBadge = styled.span`
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 5px 10px;
  margin-left: 10px;
  font-size: 14px;
  animation: ${vibrate} 1s infinite;
`;

const AdminNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const token = localStorage.getItem('access_token');

  const { baseurl } = BaseURL();

  useEffect(() =>{
    axios.get(baseurl + 'adoptions_details/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setNotificationCount(response.data.length)
    })
  }, [baseurl, token]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <SidebarLink href="admin_details">My Details</SidebarLink>
        <SidebarLink href="#">Category</SidebarLink>
        <SidebarLink href="donors">Donors</SidebarLink>
        <SidebarLink href="users">Users</SidebarLink>
        <SidebarLink href="donation">Donations</SidebarLink>
        <SidebarLink href="adoption">Adoption</SidebarLink>
        <SidebarLink href="pending_approval">
          Approve Adoption 
          {isOpen && notificationCount > 0 && (
            <NotificationBadge>{notificationCount}</NotificationBadge>
          )}
        </SidebarLink>
      </SidebarContainer>
      <ToggleButton isOpen={isOpen} onClick={toggleSidebar}>
        ☰
        {!isOpen && notificationCount > 0 && (
          <NotificationBadge>{notificationCount}</NotificationBadge>
        )}
      </ToggleButton>
    </>
  );
};

export default AdminNav;
