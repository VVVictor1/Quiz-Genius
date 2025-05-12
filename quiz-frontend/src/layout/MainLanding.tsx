import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import styled from 'styled-components';
import AIlogo from '../assets/AI-Quiz-Generators.jpg';
import { useNavigate } from 'react-router-dom';



const Container = styled.div`
  padding: 60px 0;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Subheading = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

const Button = styled.button`
  margin: 0 10px;  
`;

const FeatureCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const Icon = styled.div`
  font-size: 2rem;
  color: #6c63ff;
  margin-bottom: 10px;
`;

const TestimonialCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const CallToAction = styled.div`
  background-color: #6c63ff;
  color: #fff;
  padding: 40px 0;
  text-align: center;
`;

const MainLanding = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');        
    }
    
    

  return (
    <div>
      <Container className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <Heading>Transform Any Content Into Interactive Quizzes</Heading>
            <Subheading>
              Upload your content and let our AI create personalized quizzes and study plans to accelerate your learning journey.
            </Subheading>
            <Button className="btn btn-primary" onClick={handleLoginClick}>Get Started Free</Button>
            <Button className="btn btn-outline-secondary" >Watch Demo</Button>
          </div>
          <div className="col-md-6">
            <img src={AIlogo} alt="Interactive Quizzes" className="img-fluid" />
          </div>
        </div>
      </Container>

      <Container className="container-fluid" style={{ backgroundColor: '#f7f7f7' }}>
        <h2 className="mb-5">Powerful Features for Enhanced Learning</h2>
        <div className="row">
          <div className="col-md-4">
            <FeatureCard>
              <Icon><i className="fas fa-magic"></i></Icon>
              <h5>AI-Powered Quiz Generation</h5>
              <p>Automatically generate relevant quizzes from your uploaded content using advanced AI.</p>
            </FeatureCard>
          </div>
          <div className="col-md-4">
            <FeatureCard>
              <Icon><i className="fas fa-chart-line"></i></Icon>
              <h5>Progress Tracking</h5>
              <p>Monitor your learning progress with detailed analytics and performance insights.</p>
            </FeatureCard>
          </div>
          <div className="col-md-4">
            <FeatureCard>
              <Icon><i className="fas fa-user-graduate"></i></Icon>
              <h5>Personalized Study Plans</h5>
              <p>Get customized learning paths based on your quiz performance and goals.</p>
            </FeatureCard>
          </div>
        </div>
      </Container>

      <Container className="container">
        <h2 className="mb-5">How QuizGenius Works</h2>
        <div className="row">
          <div className="col-md-3">
            <Icon><i className="fas fa-upload"></i></Icon>
            <h5>Upload Content</h5>
            <p>Upload PDFs, documents, or videos.</p>
          </div>
          <div className="col-md-3">
            <Icon><i className="fas fa-brain"></i></Icon>
            <h5>AI Processing</h5>
            <p>Our AI analyzes and generates quizzes.</p>
          </div>
          <div className="col-md-3">
            <Icon><i className="fas fa-pencil-alt"></i></Icon>
            <h5>Take Quizzes</h5>
            <p>Complete interactive assessments.</p>
          </div>
          <div className="col-md-3">
            <Icon><i className="fas fa-chart-bar"></i></Icon>
            <h5>Track Progress</h5>
            <p>Monitor your improvement.</p>
          </div>
        </div>
      </Container>

      <Container className="container-fluid" style={{ backgroundColor: '#f7f7f7' }}>
        <h2 className="mb-5">What Our Users Say</h2>
        <div className="row">
          <div className="col-md-4">
            <TestimonialCard>
              <h5><strong>Sarah Johnson</strong></h5>
              <p>Medical Student</p>
              <p>"QuizGenius has revolutionized how I prepare for my medical exams. The AI-generated quizzes are incredibly relevant."</p>
            </TestimonialCard>
          </div>
          <div className="col-md-4">
            <TestimonialCard>
              <h5><strong>Mark Thompson</strong></h5>
              <p>Software Engineer</p>
              <p>"The personalized study plans have helped me stay focused and track my progress effectively."</p>
            </TestimonialCard>
          </div>
          <div className="col-md-4">
            <TestimonialCard>
              <h5><strong>Emily Chen</strong></h5>
              <p>Language Learner</p>
              <p>"I love how easy it is to create quizzes from my study materials. The AI suggestions are spot-on!"</p>
            </TestimonialCard>
          </div>
        </div>
      </Container>

      <CallToAction>
        <h2>Ready to Transform Your Learning Experience?</h2>
        <p>Join thousands of students who are already learning smarter with QuizGenius.</p>
        <Button className="btn btn-light" onClick={handleLoginClick}>Get Started Free</Button>
      </CallToAction>
    </div>
  );
};

export default MainLanding;