import { config } from '../config';

const API_URL = `${config.API_URL}/api/auth`;

export const signupUser = async (userData: { firstName: string, lastName: string, email: string, password: string }) => {
    try{
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(userData),
        });
         return await response.json();

    }catch(error) {
        console.error('Error signing up:', error);
    }
};

export const loginUser = async (credentials: { email: string, password: string }) => {
    console.log('🔄 Attempting login...');
    if(!credentials.email || !credentials.password){
        throw new Error("Please enter email and password");
    }
    try {
        const url = `${API_URL}/login`;
        console.log('Calling URL:', url);
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }
        
        console.log('✅ Login successful:', data);
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("Login failed");
    }
};


