# Quiz Genius Frontend

This is the frontend application for Quiz Genius, built with React, TypeScript, and modern web technologies.

## Features

- Modern, responsive UI with Bootstrap and Styled Components
- Real-time updates using Socket.IO
- Type-safe development with TypeScript
- Google OAuth integration
- Interactive quiz interface
- File upload and processing

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_API_URL=http://localhost:3001
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App

## Project Structure

```
src/
├── assets/ # Images and static assets
├── context/ # React context providers 
├── layout/ # Layout components 
├── pages/ # Page components 
├── services/ # API service modules
├── styles/ # Global and component styles
├── App.tsx # Root React component
├── config.ts # App configuration 
├── index.css # Global CSS
├── index.tsx # Entry point for React
└── react-app-env.d.ts # TypeScript environment definitions
```

## Development

- The project uses TypeScript for type safety
- Styled components for styling
- React Router for navigation
- Socket.IO for real-time features



## Building for Production

1. Create a production build:
   ```bash
   npm run build
   ```
2. The build files will be in the `build` directory

## Security

- Environment variables for sensitive data
- HTTPS in production
- Secure authentication flow
- Input sanitization

## License

MIT
