// src/components/Sidebar.js
import React, { useState } from 'react';
import styled from 'styled-components';

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

  @media (max-width: 768px) {
    left: ${props => (props.isOpen ? '210px' : '15px')};
  }
`;

const AdminNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <SidebarContainer isOpen={isOpen}>
        <SidebarLink href="user_page">User</SidebarLink>
        <SidebarLink href="#">About</SidebarLink>
        <SidebarLink href="#">Services</SidebarLink>
        <SidebarLink href="#">Contact</SidebarLink>
      </SidebarContainer>
      <ToggleButton isOpen={isOpen} onClick={toggleSidebar}>
        ☰
      </ToggleButton>
    </>
  );
};

export default AdminNav;
