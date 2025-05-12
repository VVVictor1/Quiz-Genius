import React from 'react';
import styled from 'styled-components';
import { QuizCardsProps } from '../pages/QuizCard';
interface FeedbackQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry?: () => void;
  quizResult: QuizCardsProps | null;
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

const ScoreSection = styled.div`
  margin: 30px 0;
  text-align: center;
`;

const Score = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: #2c3e50;
  margin: 10px 0;
`;

const ScoreLabel = styled.div`
  color: #666;
  font-size: 16px;
  margin-bottom: 20px;
`;

const ResultStatus = styled.h2`
  font-size: 24px;
  color: ${props => props.color || '#2c3e50'};
  margin-bottom: 10px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 30px 0;
`;

const StatItem = styled.div`
  background:rgb(203, 220, 235);
  padding: 20px;
  border-radius: 12px;
  text-align: center;

  .value {
    font-size: 24px;
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 5px;
  }

  .label {
    color: #666;
    font-size: 14px;
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

const FeedbackQuizModal: React.FC<FeedbackQuizModalProps> = ({ isOpen, onClose, onRetry, quizResult }) => {
  if (!isOpen) return null;

  
  const score = quizResult?.percentage || 0;
  const isPassed = score >= 70;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ResultStatus color={isPassed ? '#4CAF50' : '#f44336'}>
          {isPassed ? 'Congratulations!' : 'Better Luck Next Time!'}
        </ResultStatus>
        
        <ScoreSection>
          <ScoreLabel>Your Score</ScoreLabel>
          <Score>{score}%</Score>
          <ScoreLabel>{isPassed ? 'You have passed the quiz!' : 'You did not meet the passing score of 70%'}</ScoreLabel>
        </ScoreSection>
        {quizResult && (
        <StatsGrid>
          <StatItem>
            <div className="value">{quizResult.correctAnswers}</div>
            <div className="label">Correct Answers</div>
          </StatItem>
          <StatItem>
            <div className="value">{quizResult.incorrectAnswers}</div>
            <div className="label">Wrong Answers</div>
          </StatItem>
          <StatItem>
            <div className="value">{quizResult.totalQuestions}</div>
            <div className="label">Total Questions</div>
          </StatItem>
          <StatItem>
          <div className="value">
             {new Date(quizResult.timeTaken).toLocaleTimeString('en-US', {
                 hour: '2-digit',
                 minute: '2-digit',
                 second: '2-digit',
              })}
          </div>

            <div className="label">Time Taken</div>
          </StatItem>
        </StatsGrid>
        )}

        <ButtonContainer>
          <Button primary onClick={onRetry}>
            <i className="fas fa-redo" /> Try Again
          </Button>
          <Button onClick={onClose}>
            <i className="fas fa-home" /> Back to Home
          </Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default FeedbackQuizModal;
