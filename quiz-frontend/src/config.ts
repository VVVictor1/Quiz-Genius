export const config = {
    API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
    GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
};

// Validate required environment variables
const requiredEnvVars = ['REACT_APP_API_URL'] as const;
requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
        console.warn(`Warning: ${envVar} is not set in environment variables`);
    }
}); 