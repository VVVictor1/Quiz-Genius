import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Navbar from '../layout/Navbar';
import Sidebar from '../layout/Sidebar';
import Footer from '../layout/Footer';
import { useNavigate } from 'react-router-dom';
const Section = styled.div`
  margin: 20px 0;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Card = styled.div`
  background-color: #f0f4f8;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  flex: 1;
  margin: 10px;
`;

const CardTitle = styled.h5`
  color: #007bff;
  margin-bottom: 10px;
`;

const CardText = styled.p`
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  flex: 1;
  margin: 50px;
  padding: 15px 0;

  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`;

const BlueButton = styled(Button)`
  background-color: #007bff;
`;

const GreenButton = styled(Button)`
  background-color: #28a745;
`;

const PurpleButton = styled(Button)`
  background-color: #6f42c1;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  
`;

export const NavbarWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
`;


const Content = styled.div`
  padding: 5px;
  background-color: #f8f9fa;
`;

const IconStyled = styled.i`
  margin-right: 10px;
  color: #007bff;
`;

const NextStepCard = styled.div`
  background-color: #e9f7ff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const NextStepIcon = styled(IconStyled)`
  color: #007bff;
  font-size: 1.5rem;
  margin-right: 10px;
`;

const NextStepText = styled.p`
  color: #333;
  font-size: 1rem;
  margin: 0;
`;

const GettingStarted = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
      <div style={{ display: 'flex' }}>        
          <Sidebar />       
        <Content>
          <div className="container-fluid">
            <Section>
              <h3><IconStyled className="fas fa-rocket"></IconStyled>Getting Started Guide</h3>
              <div className="d-flex justify-content-between">
                <Card>
                  <CardTitle>Step 1</CardTitle>
                  <CardText>Upload your study materials and let AI create personalized quizzes.</CardText>
                </Card>
                <Card>
                  <CardTitle>Step 2</CardTitle>
                  <CardText>Take practice quizzes to assess your knowledge.</CardText>
                </Card>
                <Card>
                  <CardTitle>Step 3</CardTitle>
                  <CardText>Review AI-powered insights and improve your learning.</CardText>
                </Card>
              </div>
            </Section>

            <Section className="d-flex justify-content-between">
              <Card>
                <CardTitle><IconStyled className="fas fa-chart-line"></IconStyled>Learning Progress</CardTitle>
                <CardText><IconStyled className="fas fa-chart-bar"></IconStyled>Start your first quiz to track progress!</CardText>
              </Card>
              <Card>
                <CardTitle><IconStyled className="fas fa-trophy"></IconStyled>Completed Quizzes</CardTitle>
                <CardText><IconStyled className="fas fa-medal"></IconStyled>Complete your first quiz to see results!</CardText>
              </Card>
            </Section>

            <ButtonContainer>
              <BlueButton onClick={() => navigate('/uploads')}><IconStyled className="fas fa-upload" style={{ color: 'white' }}></IconStyled> Upload Study Material</BlueButton>
              <GreenButton onClick={() => navigate('/quiz')}><IconStyled className="fas fa-play" style={{ color: 'white' }}></IconStyled> Take a Practice Quiz</GreenButton>
              <PurpleButton><IconStyled className="fas fa-book" style={{ color: 'white' }}></IconStyled> Explore Study Plan</PurpleButton>
            </ButtonContainer>

            <Section>
              <h4><IconStyled className="fas fa-robot"></IconStyled>AI Study Assistant</h4>
              <div className="d-flex justify-content-between">
                <Card>
                  <CardText>Your AI study assistant is ready to help! Upload a file or take a quiz to unlock personalized recommendations.</CardText>
                </Card>
                <Card>
                  <CardText>New here? Try a sample quiz and see AI-generated insights!</CardText>
                </Card>
                <Card>
                  <CardText>As you take quizzes, AI will suggest topics to improve!</CardText>
                </Card>
              </div>
            </Section>

            <Section>
              <h4><IconStyled className="fas fa-bell"></IconStyled>Next Steps</h4>
              <NextStepCard>
                <NextStepIcon className="fas fa-file-alt"></NextStepIcon>
                <NextStepText>Start your journey! Upload your first document and get an AI quiz instantly!</NextStepText>
              </NextStepCard>
              <NextStepCard>
                <NextStepIcon className="fas fa-vial"></NextStepIcon>
                <NextStepText>Try a quick test! Take a sample quiz and see AI-powered learning in action!</NextStepText>
              </NextStepCard>
              <NextStepCard>
                <NextStepIcon className="fas fa-lightbulb"></NextStepIcon>
                <NextStepText>AI is ready to help! Check out how study plans improve learning!</NextStepText>
              </NextStepCard>
            </Section>
          </div>
          <Footer />
        </Content>
      </div>
    </Layout>
  );
};

export default GettingStarted;