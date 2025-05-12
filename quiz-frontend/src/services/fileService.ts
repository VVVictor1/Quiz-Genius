import { config } from '../config';

const API_URL = `${config.API_URL}/api`;
const MAX_FILE_SIZE =  1024 * 1024; // 1MB

export interface UploadResponse {
    success: boolean;
    message: string;
    file: {
        id: number;
        filename: string;
        fileType: string;
        uploadedAt: string;
        size: number;
        status: 'processing' | 'completed' | 'error';
    };
}

export const uploadFile = async (file: File, token: string): Promise<UploadResponse> => {

    
    try {
        // Check file size
        if (file.size > MAX_FILE_SIZE) {
            throw new Error(`File size exceeds limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
        }

        console.log('Starting upload for file:', {
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(2)}MB`,
            type: file.type
        });

        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Upload failed');
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error uploading file:', error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Upload failed');
    }
};

export const getRecentUploads = async (token: string) => {
    try {
        const response = await fetch(`${API_URL}/upload/user/files`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok){
            throw new Error('Failed to fetch recent uploads');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching recent uploads:', error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('Failed to fetch recent uploads');
    }
};

export const deleteFile = async (fileId: number, token: string) => {
    try {
            const response = await fetch(`${API_URL}/upload/user/files/${fileId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to delete file');
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting file:', error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('Failed to delete file');
    }
};

export const generateQuiz = async (fileId: number, token: string) => {
    try {
        const response = await fetch(`${API_URL}/quiz/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({extractId: fileId })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to generate quiz');
        }

        return await response.json();
    } catch (error) {
        console.error('Error generating quiz:', error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error('Failed to generate quiz');
    }
};