import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../assets/LogoQuiz.png';
import {
    startQuiz,
    onQuizData,
    sendAnswer,
    onResult,
    submitFinalQuiz
  } from '../services/quizService';
import FeedbackQuizModal from '../layout/FeedbackQuizModal';
import { useNavigate, useParams } from 'react-router-dom';

const QuizContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
`;

const Sidebar = styled.div`
  width: 250px;
  background: white;
  padding: 20px;
  border-left: 1px solid #eee;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;


const QuizTitle = styled.h1`
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 10px;
  text-align: center;
`;

const ProgressText = styled.div`
  text-align: center;
  color: #666;
  margin-bottom: 20px;
  font-size: 14px;
`;

const ProgressBar = styled.div`
  height: 4px;
  background: #e0e0e0;
  border-radius: 4px;
  margin-bottom: 40px;
  
  &::after {
    content: '';
    display: block;
    width: 30%; /* Adjust based on progress */
    height: 100%;
    background: #1a73e8;
    border-radius: 4px;
  }
`;

const QuestionCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const Question = styled.h2`
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 25px;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #1a73e8;
    background: #f8f9ff;
  }
`;

const RadioInput = styled.input`
  margin-right: 12px;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const NavButton = styled.button<{ primary?: boolean }>`
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  background: ${props => props.primary ? '#1a73e8' : '#f1f3f4'};
  color: ${props => props.primary ? 'white' : '#5f6368'};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.primary ? '#1557b0' : '#e8eaed'};
  }

  &:disabled {
    background: ${props => props.primary ? '#90caf9' : '#e0e0e0'};
    color: #9e9e9e;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
const SidebarInfo = styled.div`
  margin-top: 80px;
  
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    
    h1 {
      font-size: 20px;
      margin: 0;
      color: #2c3e50;
    }
  }
  
  .info-content {
    display: flex;
    flex-direction: column;
    gap: 20px;  // Adds space between info items
    
    div {
      display: flex;
      align-items: center;
      color: #666;
      
      i {
        margin-right: 10px;
        width: 20px;
      }
    }
  }
`;
const ActionButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;  // Adds space between buttons
`;


const ActionButton = styled.button<{ quit?: boolean }>`

  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  background: ${props => props.quit ? '#ff4444' : '#f1f3f4'};
  color: ${props => props.quit ? 'white' : '#5f6368'};

  &:hover {
    background: ${props => props.quit ? '#cc0000' : '#e8eaed'};
  }
`;

const Logo = styled.img`
    width: 40px;
    height: 40px;
    margin-right: 12px;
`;

const FeedbackContainer = styled.div<{ isCorrect: boolean }>`
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: ${props => props.isCorrect ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'};
  border: 1px solid ${props => props.isCorrect ? '#4CAF50' : '#f44336'};
`;

const FeedbackIcon = styled.span`
  font-size: 24px;
`;

const FeedbackText = styled.div`
  flex: 1;
  
  .result {
    font-weight: 600;
    color: ${props => props.color};
    margin-bottom: 4px;
  }
  
  .correct-answer {
    color: #666;
    font-size: 14px;
  }
`;

 export interface QuizCardsProps {
    correctAnswers: number;
    incorrectAnswers: number;
    totalQuestions: number;
    percentage: number;
    timeTaken: Date;
}


const QuizCards: React.FC = () => {
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: number]: string }>({});
    const [quizFinished, setQuizFinished] = useState(false);
    const [feedback, setFeedback] = useState<{ [questionId: number]: { isCorrect: boolean, correctAnswer: string } } | null>(null);
    const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);  
    const [quizResult, setQuizResult] = useState<QuizCardsProps | null>(null);

    const navigate = useNavigate();
    const { quizId } = useParams();

    useEffect(() => {
        if (!quizId) {
            alert('Quiz ID is required');
            return;
        }
        startQuiz(Number(quizId));
        onQuizData((data) => {
            setQuestions(data.Questions);
        });
        onResult((result) => {
            setFeedback((prev) => ({
                ...prev,
                [result.questionId]: {
                    isCorrect: result.isCorrect,
                    correctAnswer: result.correctAnswer
                }
            }));
            setIsAnswerSubmitted(true);  
        });
    }, [quizId]);

    
    useEffect(() => {
        setIsAnswerSubmitted(false);
    }, [currentIndex]);

    const currentQuestion = questions[currentIndex];

    const handleSelectAnswer = (questionId: number, answer: string) => {
        if (!isAnswerSubmitted) {  // Only allow selection if answer hasn't been submitted
            setSelectedAnswers((prev) => ({
                ...prev,
                [questionId]: answer,
            }));
        }
    };

    const handleAnswerSubmit = () => {
        const selected = selectedAnswers[currentQuestion.questionId];
        if (!selected) {
            alert('Please select an answer before submitting.');
            return;
        }
        sendAnswer(selected, currentQuestion.questionId);
    };

    const handleNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } 
        
    };

    const handleFinalSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please login to submit the quiz');
            return;
        }

        const answers = questions.map((q) => ({
            questionId: q.questionId,
            userAnswer: selectedAnswers[q.questionId],
            isCorrect: feedback?.[q.questionId]?.isCorrect
        }));
        console.log(answers);

        try {
            const result = await submitFinalQuiz(token, Number(quizId), answers);
            setQuizResult(result.resultScore);
            if (allAnswered) {
                setQuizFinished(true);
            }
            console.log(result.resultScore);
           
           
        } catch (error) {
            alert('Failed to submit quiz. Please try again.');
        }
    };

    const isLastQuestion = currentIndex === questions.length - 1;
    const allAnswered = questions.every((q) => selectedAnswers[q.questionId]);

    if (!currentQuestion && !quizFinished) return <p>Loading quiz...</p>;

    return (
        <QuizContainer>
            <MainContent>
                <QuizTitle>QuizGenius Quiz</QuizTitle>
                <ProgressText>
                    Question {currentIndex + 1} of {questions.length}
                </ProgressText>
                <ProgressBar />

                {quizFinished ? (
                    <div>
                        <h2>You're done!</h2>
                        <NavButton primary onClick={handleFinalSubmit} disabled={!allAnswered}>
                            Submit Quiz
                        </NavButton>
                    </div>
                ) : (
                    <QuestionCard>
                        <Question>{currentQuestion.questionText}</Question>
                        <OptionsContainer>
                            {currentQuestion.options ? (
                                currentQuestion.options.map((option: string, idx: number) => (
                                    <OptionLabel key={idx}>
                                        <RadioInput
                                            type="radio"
                                            name={`question-${currentQuestion.questionId}`}
                                            value={option}
                                            checked={selectedAnswers[currentQuestion.questionId] === option}
                                            onChange={() => handleSelectAnswer(currentQuestion.questionId, option)}
                                            disabled={isAnswerSubmitted}
                                        />
                                        {option}
                                    </OptionLabel>
                                ))
                            ) : (
                                ['True', 'False'].map((option) => (
                                    <OptionLabel key={option}>
                                        <RadioInput
                                            type="radio"
                                            name={`question-${currentQuestion.questionId}`}
                                            value={option}
                                            checked={selectedAnswers[currentQuestion.questionId] === option}
                                            onChange={() => handleSelectAnswer(currentQuestion.questionId, option)}
                                            disabled={isAnswerSubmitted}
                                        />
                                        {option}
                                    </OptionLabel>
                                ))
                            )}
                        </OptionsContainer>

                        {feedback?.[currentQuestion.questionId] && (
                            <FeedbackContainer isCorrect={feedback[currentQuestion.questionId].isCorrect}>
                                <FeedbackIcon>
                                    {feedback[currentQuestion.questionId].isCorrect ? '✅' : '❌'}
                                </FeedbackIcon>
                                <FeedbackText color={feedback[currentQuestion.questionId].isCorrect ? '#4CAF50' : '#f44336'}>
                                    <div className="result">
                                        {feedback[currentQuestion.questionId].isCorrect ? 'Correct!' : 'Incorrect'}
                                    </div>
                                    {!feedback[currentQuestion.questionId].isCorrect && (
                                        <div className="correct-answer">
                                            Correct answer: {feedback[currentQuestion.questionId].correctAnswer}
                                        </div>
                                    )}
                                </FeedbackText>
                            </FeedbackContainer>
                        )}

                        <NavigationButtons>
                            <NavButton 
                                primary 
                                onClick={handleAnswerSubmit}
                                disabled={!selectedAnswers[currentQuestion.questionId] || isAnswerSubmitted}>
                                Submit Answer
                            </NavButton>
                            {isLastQuestion ? (
                                <NavButton 
                                    onClick={handleFinalSubmit}
                                    disabled={!isAnswerSubmitted}>
                                    Finish Quiz
                                </NavButton>
                            ) : (
                                <NavButton 
                                    onClick={handleNextQuestion}
                                    disabled={!isAnswerSubmitted}>
                                    Next <i className="fas fa-arrow-right" />
                                </NavButton>
                            )}
                        </NavigationButtons>
                    </QuestionCard>
                )}
            </MainContent>

            <Sidebar>
                <SidebarInfo>
                    <div className="header">
                        <Logo src={logo} alt="Quiz App Logo" />
                        <h1>QuizGenius</h1>
                    </div>
                    <div className="info-content">
                        <div><i className="fas fa-list" /> Total Questions: {questions.length}</div>
                        <div><i className="fas fa-percentage" /> Minimum to Pass: 70%</div>
                    </div>
                </SidebarInfo>

                <ActionButtonContainer>
                    <ActionButton 
                        quit 
                        onClick={() => window.confirm('Are you sure you want to quit?') && (window.location.href = '/')}>
                        <i className="fas fa-times" /> Quit Quiz
                    </ActionButton>                  
                </ActionButtonContainer>
            </Sidebar>
            <FeedbackQuizModal 
                isOpen={quizFinished} 
                onClose={() => navigate('/')} 
                onRetry={() => window.location.reload()} 
                quizResult={quizResult}
            />
        </QuizContainer>
    );
};

export default QuizCards;