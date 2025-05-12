import React from 'react';
import styled from 'styled-components';
import { QuizDisplay } from '../pages/Upload';

interface QuizSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
  quizResults: QuizDisplay | null;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  width: 90%;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const SuccessIcon = styled.i`
  font-size: 48px;
  color: #4CAF50;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  color: #2c3e50;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 30px;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 30px 0;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatIcon = styled.i`
  font-size: 24px;
  color: #1a73e8;
  margin-bottom: 8px;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 4px;
`;

const StatValue = styled.div`
  color: #2c3e50;
  font-weight: 600;
`;

const InstructionsBox = styled.div`
  background: #f8f9ff;
  border-radius: 12px;
  padding: 20px;
  margin: 30px 0;
  text-align: left;
`;

const InstructionTitle = styled.h3`
  color: #2c3e50;
  font-size: 16px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InstructionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    color: #666;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  ${props => props.primary ? `
    background: #1a73e8;
    color: white;
    &:hover {
      background: #1557b0;
    }
  ` : `
    background: #f1f3f4;
    color: #5f6368;
    &:hover {
      background: #e8eaed;
    }
  `}
`;

const QuizSuccessModal: React.FC<QuizSuccessModalProps> = ({ isOpen, onClose, onStart, quizResults }) => {
    if (!isOpen) return null;
  
    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <SuccessIcon className="fas fa-check-circle" />
          <Title>Quiz Generated Successfully!</Title>
          <Subtitle>Your quiz is ready to be taken. Good luck!</Subtitle>
  
          <StatsContainer>
            {quizResults && (           
                <>     
               <StatItem>
              <StatIcon className="fas fa-file-alt" />
              <StatLabel>Title</StatLabel>
              <StatValue>{quizResults.quizTitle}</StatValue>
            </StatItem>
            <StatItem>
              <StatIcon className="fas fa-question-circle" />
              <StatLabel>Questions</StatLabel>
              <StatValue>{quizResults.totalQuestions} Questions</StatValue>
            </StatItem>
            </>
            )}

            <StatItem>
              <StatIcon className="fas fa-trophy" />
              <StatLabel>Passing Score</StatLabel>
              <StatValue>70%</StatValue>
            </StatItem>
          </StatsContainer>
  
          <InstructionsBox>
            <InstructionTitle>
              <i className="fas fa-info-circle" />
              Important Instructions
            </InstructionTitle>
            <InstructionList>
              <li><i className="fas fa-check" /> Make sure you have a stable internet connection</li>
              <li><i className="fas fa-check" /> You cannot pause once you start the quiz</li>
              <li><i className="fas fa-check" /> Ensure you have enough time to complete</li>
            </InstructionList>
          </InstructionsBox>
  
          <ButtonContainer>
            <Button primary onClick={onStart}>
              <i className="fas fa-play" /> Start Quiz Now
            </Button>
            <Button onClick={onClose}>
              <i className="fas fa-clock" /> Take Quiz Later
            </Button>
          </ButtonContainer>
        </ModalContent>
      </ModalOverlay>
    );
  };
  
  export default QuizSuccessModal;