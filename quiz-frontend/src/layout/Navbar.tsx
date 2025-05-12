import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  justify-content: flex-start;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #495057;
  margin-right: 20px;
`;

const Icon = styled.i`
  color: #007bff;
  margin-right: 10px;
`;

const NavItem = styled.li`
  list-style: none;
  margin: 0 15px;
  font-size: 1rem;
  font-weight: 500;
  color: #495057;
  &:hover {
    color: #007bff;
  }
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    color: inherit;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <Logo>
        <Icon className="fas fa-graduation-cap"></Icon>
        QuizGenius
      </Logo>
      <ul className="d-flex">
        <NavItem><LinkStyled to="/getting-started">Home</LinkStyled></NavItem>
        <NavItem><LinkStyled to="/">About</LinkStyled></NavItem>
        <NavItem><LinkStyled to="/">Services</LinkStyled></NavItem>
        <NavItem><LinkStyled to="/">Contact</LinkStyled></NavItem>
      </ul>
    </NavbarContainer>
  );
};

export default Navbar; 