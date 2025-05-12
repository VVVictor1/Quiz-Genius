import React from "react";
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../assets/LogoQuiz.png";
import { Link } from 'react-router-dom';


const StyledHeader = styled.header`
    background-color: #f8f9fa;
    padding: 16px;
`;

const Logo = styled.img`
    width: 40px;
    height: 40px;
    margin-right: 8px;
`;

const Header = () => {
    return (
        <StyledHeader className="container">
            <div className="row align-items-center">
                <div className="col-12 col-md-4 d-flex align-items-center mb-3 mb-md-0">
                    <Logo src={logo} alt="Quiz App Logo" />
                    <h1 className="h4 mb-0">QuizGenius</h1>
                </div>
                <nav className="col-12 col-md-4 mb-3 mb-md-0">
                    <div className="d-flex justify-content-center justify-content-md-start gap-4">
                        <a href="/" className="text-dark text-decoration-none fw-semibold">Features</a>
                        <a href="/" className="text-dark text-decoration-none fw-semibold">How it Works</a>
                        <a href="/" className="text-dark text-decoration-none fw-semibold">Pricing</a>
                    </div>
                </nav>
                <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end">
                    <Link to="/login" className="btn btn-outline-primary me-2">Login</ Link>
                    <Link to="/register" className="btn btn-primary">Sign Up</Link>
                </div>
            </div>
        </StyledHeader>
    );
}

export default Header;