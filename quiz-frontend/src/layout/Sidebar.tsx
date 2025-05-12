import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const SidebarContainer = styled.div`
  position: sticky;
  top: 60px;
  width: 160px;
  height: calc(100vh - 60px);
  background-color: #f8f9fa;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  color: #495057;
  font-size: 1rem;
  font-weight: 500;
  &:hover {
    color: #007bff;
  }
`;

const Icon = styled.i`
  margin-right: 10px;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    color: inherit;
  }
`;

const Sidebar = () => {
  const {logout} = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <SidebarContainer>
      <NavItem>
        <Icon className="fas fa-home"></Icon>
        <LinkStyled to="/dashboard">Dashboard</LinkStyled>
      </NavItem>
      <NavItem>
        <Icon className="fas fa-upload"></Icon>
        <LinkStyled to="/uploads">Uploads</LinkStyled>
      </NavItem>
      <NavItem>
        <Icon className="fas fa-question-circle"></Icon>
        <LinkStyled to="/quiz">Quizzes</LinkStyled>
      </NavItem>
      <NavItem>
        <Icon className="fas fa-calendar-alt"></Icon>
        <LinkStyled to="/study-plan">Study Plan</LinkStyled>
      </NavItem>
      <NavItem>
        <Icon className="fas fa-cog"></Icon>
        <LinkStyled to="/settings">Settings</LinkStyled>
      </NavItem>
      
      <NavItem>
        <Icon className="fas fa-sign-out-alt"></Icon>
        <LinkStyled to="/" onClick={handleLogout}>Logout</LinkStyled>
      </NavItem>
    </SidebarContainer>
  );
};

export default Sidebar; 