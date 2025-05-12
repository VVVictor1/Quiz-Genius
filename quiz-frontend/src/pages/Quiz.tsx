import React, {useState, useEffect} from 'react';
import {getAllQuiz, getQuizHistory} from '../services/quizService';
import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import {NavbarWrapper} from './Getting_Started';
import styled from 'styled-components';
import QuizCards from './QuizCard';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


// Styled Components
const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
`;

const MainContent = styled.div`
  display: flex;
`;

const PageTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 30px;
`;

const QuizGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const QuizCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;



const QuizInfo = styled.div`
  padding: 10px;
  margin: 15px 0;
  color: #666;
  font-size: 14px;
  div{
    margin-bottom: 15px;
  }
`;

const QuizButton = styled.button`
  background-color: #1a73e8;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1557b0;
  }
`;

const NewQuizButton = styled.button`
  background-color: #1a73e8;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #1557b0;
  }
`;

const QuizHistorySection = styled.div`
  margin-top: 40px;
`;

const HistoryTable = styled.table`
  width: 100%;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;

  th, td {
    padding: 15px;
    text-align: left;
  }

  th {
    background-color: #f8f9fa;
    color: #2c3e50;
  }

  tr:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;

const ScoreBadge = styled.span<{ score: number }>`
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  background-color: ${props => 
    props.score >= 80 ? '#4CAF50' :
    props.score >= 60 ? '#FF9800' : '#f44336'};
  color: white;
`;

const ActionLink = styled.a`
  color: #1a73e8;
  margin-right: 15px;
  text-decoration: none;
  cursor: pointer;
  font-weight: bold;
  transition: color 0.3s ease, transform 0.3s ease;

  &:hover {
    text-decoration: underline;
    color: #0c47a1;
    transform: scale(1.05);
  }
`;

const QuizIcon = styled.i`
  font-size: 1.2rem;
  margin-right: 8px;
  &.fa-question-circle {
    color: #2196F3;  // blue
  }
  &.fa-clock {
    color: #FF9800;  // orange
  }
  &.fa-tasks {
    color: #4CAF50;  // green
  }
`;

interface QuizItems{
    quizId: string;
    quizTitle: string;
    totalQuestions: number;
    createdAt: string;
}
interface QuizHistory{
    quizId: string;
    quizTitle: string;
    highestScore: number;
    lastAttempted: Date;
    attemptCount: number;
}

const QuizComponent: React.FC = () => {
    const [quizzes, setQuizzes] = useState<QuizItems[]>([]);
   
    const [quizHistory, setQuizHistory] = useState<QuizHistory[]>([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    useEffect(() => {
       
       const fetchQuizItems = async () => {
        try{
            if(token){
            const response = await getAllQuiz(token);
            console.log("quiz response",response);
            setQuizzes(response.map((quiz: any) => ({
                quizId: quiz.quizId,
                quizTitle: quiz.quizTitle,
                totalQuestions: quiz.totalQuestions,
                createdAt: quiz.createdAt
            })));
            }
        }catch(error){
            console.error('Error fetching quizzes:', error);
        }
       }

       const fetchQuizHistory = async () => {
        try{
            if(token){
            const response = await getQuizHistory(token);
            console.log("quiz history response",response);
            setQuizHistory(response.map((attempt: any) => ({
                quizId: attempt.quizId,
                quizTitle: attempt.quizTitle,
                highestScore: attempt.highestScore,
                lastAttempted: attempt.lastAttempted,
                attemptCount: attempt.attemptCount
            })));
            }
        }catch(error){
            console.error('Error fetching quiz history:', error);
        }
       }

       fetchQuizItems();
       fetchQuizHistory();
    }, [token]);

    return (
        <Layout>
             <NavbarWrapper><Navbar /></NavbarWrapper>
            <MainContent>                     
                <Sidebar />
                <Content className='container'>
                    <div style={{ position: 'relative' }}>
                        <PageTitle>My Quizzes</PageTitle>
                        <NewQuizButton onClick={() => navigate('/uploads')}>
                            <i className="fas fa-plus"></i>
                            Start New Quiz
                        </NewQuizButton>
                    </div>

                    <QuizGrid>
                        {quizzes.map((quiz,indexQuiz) =>(
                        <QuizCard key={indexQuiz}>                            
                            <h4>{quiz.quizTitle}</h4>
                            <QuizInfo>
                                <div>
                                    <QuizIcon className="fas fa-question-circle" />
                                    {quiz.totalQuestions} Questions
                                </div>
                                <div>
                                    <QuizIcon className="fas fa-clock" />
                                    {new Date(quiz.createdAt).toLocaleDateString()}
                                </div>
                                <div>
                                    <QuizIcon className="fas fa-tasks" />
                                    Multiple Choice, True/False
                                </div>
                            </QuizInfo>
                            <QuizButton onClick={() => navigate(`/start-quiz/${quiz.quizId}`)}>Take Quiz</QuizButton>
                        </QuizCard>                     
                        ))}
                    </QuizGrid>

                    <QuizHistorySection>
                        {quizHistory.length > 0 ? (                           
                            <>                            
                            <h3>Quiz History</h3>
                            <HistoryTable>
                                <thead>
                                <tr>
                                    <th>Quiz Name</th>
                                    <th>Highest Score</th>
                                    <th>Last Attempted</th>
                                    <th>Attempts</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {quizHistory.map((attempt,indexAttempt) =>(
                                <tr key={indexAttempt}>
                                    <td>{attempt.quizTitle}</td>
                                    <td><ScoreBadge score={attempt.highestScore}>{attempt.highestScore}%</ScoreBadge></td>
                                    <td>{new Date(attempt.lastAttempted).toLocaleString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                    })}</td>
                                    <td>{attempt.attemptCount}</td>
                                    <td>                                        
                                        <ActionLink onClick={() => navigate(`/start-quiz/${attempt.quizId}`)}>Retake</ActionLink>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </HistoryTable>
                        </>
                    ) : (
                        <h3>No Quiz history found</h3>
                         )
                    }

                    </QuizHistorySection>

                    <Footer />
                    </Content>
                
            </MainContent>
            
        </Layout>
    );
}

export default QuizComponent;


