import React from 'react';
import styled from 'styled-components';
import logo from '../assets/LogoQuiz.png';

const StyledFooter = styled.footer`
    background-color: #f7f7f7;
    padding: 40px 0 0 0;
    text-align: center;
    font-size: 0.9rem;
`;

const Footer = () => {
    return (
        <StyledFooter>
            <div className="container">
            <div className="row">
                <div className="col-12 col-md-3 text-md-start mb-4 mb-md-0">
                    <img src={logo} alt="QuizGenius Logo" style={{ width: '40px', height: '40px' }} />
                    <h5 className="mt-2">QuizGenius</h5>
                    <p>Transform your learning journey with AI-powered quizzes and personalized study plans.</p>
                </div>
                <div className="col-12 col-md-3 mb-3">
                    <h6 className='mb-3'>Product</h6>
                    <div className="d-flex flex-column gap-1">
                        <a href="#" className="text-secondary text-decoration-none fw-semibold">Features</a>
                        <a href="#" className="text-secondary text-decoration-none fw-semibold">Pricing</a>
                        <a href="#" className="text-secondary text-decoration-none fw-semibold">Use Cases</a>
                    </div>
                </div>
                <div className="col-12 col-md-3 mb-3">
                    <h6 className='mb-3'>Company</h6>
                    <div className="d-flex flex-column gap-1">
                        <a href="#" className="text-secondary text-decoration-none fw-semibold">About</a>
                        <a href="#" className="text-secondary text-decoration-none fw-semibold">Blog</a>
                        <a href="#" className="text-secondary text-decoration-none fw-semibold">Contact</a>
                    </div>
                </div>
                <div className="col-12 col-md-3 mb-3">
                    <h6 className='mb-3'>Legal</h6>
                    <div className="d-flex flex-column gap-1">
                        <a href="#" className="text-secondary text-decoration-none fw-semibold">Privacy</a>
                        <a href="#" className="text-secondary text-decoration-none fw-semibold">Terms</a>
                        <a href="#" className="text-secondary text-decoration-none fw-semibold">Security</a>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                <p>© 2025 QuizGenius. All rights reserved.</p>
            </div>
            </div>
        </StyledFooter>
    );
};

export default Footer;