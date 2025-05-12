import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import { NavbarWrapper } from './Getting_Started';
import { uploadFile, getRecentUploads, generateQuiz, deleteFile } from '../services/fileService';
import { useNavigate } from 'react-router-dom';
import QuizSuccessModal from '../layout/QuizSuccessModal';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ProcessingFile {
  name: string;
  size: string;
  progress: number;
  status: 'processing' | 'completed' | 'error';
}

interface RecentUpload {
  id: number;
  filename: string;
  uploaded_at: Date;
  size: string;
}

export interface QuizDisplay {
  quizId: number;
  quizTitle: string;
  totalQuestions: number;
  createdAt?: Date;
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;


const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: #f8f9fa;
`;

const UploadContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const DropZone = styled.div`
  border: 2px dashed #6c63ff;
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  margin: 2rem 0;
  background-color: #f8f9fa;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
    border-color: #5046e4;
  }
`;

const UploadIcon = styled.div`
  color: #6c63ff;
  margin-bottom: 1rem;
  svg {
    width: 48px;
    height: 48px;
  }
`;

const UploadButton = styled.button`
  background-color: #6c63ff;
  color: white;
  border: none;
  padding: 0.5rem 1.5rem;
  border-radius: 6px;
  margin-top: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5046e4;
  }
`;

const ProcessingSection = styled.div`
  margin-top: 2rem;
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  margin: 0.5rem 0;
  overflow: hidden;
`;

const Progress = styled.div<{ width: number }>`
  height: 100%;
  width: ${props => props.width}%;
  background-color: #6c63ff;
  transition: width 0.3s ease;
`;

const FileItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #e9ecef;
  
  &:last-child {
    border-bottom: none;
  }
`;

const RecentUploadsContainer = styled.div`
  height: 300px;
  overflow-y: auto;
  margin-top: 2rem;
  border: 1px solid #e9ecef;
  border-radius: 8px;
`;

const FileItemStyled = styled(FileItem)<{ selected?: boolean }>`
  background-color: ${props => props.selected ? '#f0f0ff' : 'transparent'};
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.selected ? '#f0f0ff' : '#f8f9fa'};
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #6c63ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 15px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const LoadingText = styled.div`
  color: #2c3e50;
  font-size: 18px;
  font-weight: 500;
`;

const Upload: React.FC = () => {
  const token = localStorage.getItem('token');
  const [processingFiles, setProcessingFiles] = useState<ProcessingFile[]>([]);
  const [recentUploads, setRecentUploads] = useState<RecentUpload[]>([]);
  const [selectedFile, setSelectedFile] = useState<number>(0);
  const [quizSuccess, setQuizSuccess] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizDisplay | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
console.log('Token:', token);
  
  useEffect(() => {
    const fetchRecentUploads = async () => {
      try {
        if (token) {
          const uploads = await getRecentUploads(token);
          setRecentUploads(uploads.map((upload: any) => ({
            id: upload.id,
            filename: upload.filename,
            uploaded_at : new Date(upload.uploadedAt),
            size: `${(upload.size / (1024 * 1024)).toFixed(1)} MB`
          })));
        }
      } catch (error) {
        console.error('Error fetching recent uploads:', error);
      }
    };

    fetchRecentUploads();
  }, [token]);

const handleDelete = async(filedId: number) =>{
  try{
    if(!token || !filedId) throw new Error('No token or file ID provided');
    await deleteFile(filedId, token);
    setRecentUploads(prev => prev.filter(file => file.id !== filedId));
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}


  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    
    for (const file of droppedFiles) {
      const validTypes = ['.pdf','.txt','.docx','.mp4'];
      const fileExtension = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
      if(!validTypes.includes(fileExtension)){
        alert(`Unsupported file type: ${fileExtension}. Please upload a PDF, TXT, DOCX, or MP4 file.`);
        continue;
      }

      // Initialize processing file with 0% progress
      const processingFile: ProcessingFile = {
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        progress: 0,
        status: 'processing'
      };

      setProcessingFiles(prev => [processingFile, ...prev]);
      
      try {
        if (token) {
       
          setProcessingFiles(prev => 
            prev.map(f => 
              f.name === file.name 
                ? { ...f, progress: 25 }
                : f
            )
          );

          
          setTimeout(() => {
            setProcessingFiles(prev => 
              prev.map(f => 
                f.name === file.name 
                  ? { ...f, progress: 50 }
                  : f
              )
            );
          }, 500);

          const response = await uploadFile(file, token);

          if (response.success) {
            
            setProcessingFiles(prev => 
              prev.map(f => 
                f.name === file.name 
                  ? { ...f, progress: 75 }
                  : f
              )
            );

            
            setTimeout(() => {
              setProcessingFiles(prev => 
                prev.map(f => 
                  f.name === file.name 
                    ? { ...f, progress: 100, status: 'completed' }
                    : f
                )
              );
            }, 500);

            // Add to recent uploads
            const newFile: RecentUpload = {
              id: response.file.id,
              filename: response.file.filename,
              uploaded_at: new Date(),
              size: `${(response.file.size / (1024 * 1024)).toFixed(1)} MB`,

            };
            
            setRecentUploads(prev => [newFile, ...prev]);

            // Remove from processing list after showing completion
            setTimeout(() => {
              setProcessingFiles(prev => prev.filter(f => f.name !== file.name));
            }, 2000);
          }
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        // Update processing status to error
        setProcessingFiles(prev => 
          prev.map(f => 
            f.name === file.name 
              ? { ...f, status: 'error', progress: 0 }
              : f
          )
        );
      }
    }
  }, [token]);

  const handleGenerateQuiz = async () => {
    if (!selectedFile || !token) return;
    
    try {
      setIsGenerating(true);  // Start loading
      const fileToGenerate = recentUploads.find(file => file.id === selectedFile);
      if (fileToGenerate) {
        const result = await generateQuiz(fileToGenerate.id, token);
        setQuizResult(result.quiz);
        setQuizSuccess(true);
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
    } finally {
      setIsGenerating(false);  // Stop loading regardless of outcome
    }
  };
  const navigate = useNavigate();
  const handleStartQuiz = () => {
    navigate(`/start-quiz/${quizResult?.quizId}`);
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileSelect = (id: number) => {
    setSelectedFile(prev => prev === id ? 0 : id);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Simulate drop event
      const dummyEvent = {
        preventDefault: () => {},
        dataTransfer: { files }
      } as React.DragEvent<HTMLDivElement>;
      handleDrop(dummyEvent);
    }
  };

  return (
    <Layout >
      {isGenerating && (
        <LoadingOverlay>
          <LoadingContainer>
            <LoadingSpinner />
            <LoadingText>Generating Quiz...</LoadingText>
          </LoadingContainer>
        </LoadingOverlay>
      )}
      <MainContent >
      <NavbarWrapper><Navbar/></NavbarWrapper>  
      <div style={{ display: 'flex' }}>
      <Sidebar />    
        <Content className='container'>        
          <h2>Upload Content</h2>
          <UploadContainer>
            <DropZone
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <UploadIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </UploadIcon>
              <h4>Drag and drop your files here</h4>
              <p>Supported formats: PDF, TXT, DOCX, MP4</p>
              <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
                accept=".pdf,.txt,.docx,.mp4"
              />
              <UploadButton onClick={() => document.getElementById('fileInput')?.click()}>
                Upload File
              </UploadButton>
            </DropZone>

            {processingFiles.length > 0 && (
              <ProcessingSection>
                <h5>Currently Processing</h5>
                {processingFiles.map((file, index) => (
                  <div key={index} className="mb-3">
                    <div className="d-flex justify-content-between">
                      <span>{file.name} ({file.size})</span>
                      <span>
                        {file.status === 'completed' ? 'Complete' : 
                         file.status === 'error' ? 'Error' : 
                         `${file.progress}%`}
                      </span>
                    </div>
                    <ProgressBar>
                      <Progress width={file.progress} />
                    </ProgressBar>
                    <small className="text-muted">
                      {file.status === 'completed' ? 'Upload complete!' :
                       file.status === 'error' ? 'Upload failed' :
                       file.progress < 50 ? 'Starting upload...' :
                       file.progress === 50 ? 'Uploading file...' :
                       'Finalizing...'}
                    </small>
                  </div>
                ))}
              </ProcessingSection>
            )}
            <h2>Recent Uploads</h2>
            <RecentUploadsContainer>
             
              {recentUploads.map((file, index) => (
                <FileItemStyled 
                  key={index}
                  selected={selectedFile === file.id}
                  onClick={() => handleFileSelect(file.id)}
                >
                  <i className="far fa-file me-2"></i>
                  <div className="flex-grow-1">
                    <div>{file.filename}</div>
                    <small className="text-muted">
                      Uploaded {file.uploaded_at.toLocaleString()} • {file.size}
                    </small>
                  </div>
                  <div>
                    
                    <button className="btn btn-link text-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      if(file.id && window.confirm('Are you sure you want to delete this file?')){
                        handleDelete(file.id);
                      }
                    }}
                    >
                      <i className="far fa-trash-alt"></i>
                    </button>
                  </div>
                </FileItemStyled>
              ))}
            </RecentUploadsContainer>

            <div className="text-center mt-4">
              <button 
                className="btn btn-primary"
                disabled={!selectedFile}
                onClick={handleGenerateQuiz}
              >
                <i className="fas fa-magic me-2"></i>
                Generate Quiz
              </button>
              <p className="text-muted mt-2">
                {!selectedFile 
                  ? 'Select a file to generate quiz'
                  : `Quiz will be generated from the selected file`}
              </p>
            </div>
            <QuizSuccessModal 
            isOpen={quizSuccess}
            onClose={() => setQuizSuccess(false)}
            onStart={handleStartQuiz}
            quizResults={quizResult}
            
            />
          </UploadContainer>
          <Footer />
        </Content>
      </div>
      </MainContent>
    </Layout>
  );
};


export default Upload;