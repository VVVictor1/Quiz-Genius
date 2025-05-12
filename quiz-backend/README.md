# Quiz Genius Backend

This is the backend server for the Quiz Genius application, built with Node.js, Express, and PostgreSQL.

## Features

- User authentication and authorization
- Quiz generation and management
- Real-time updates using Socket.IO
- File processing (PDF, DOCX)
- Google OAuth integration
- OpenAI integration for quiz generation

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_PORT=5432
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
OPENAI_API_KEY=your_openai_api_key
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   ```bash
   npx sequelize-cli db:migrate
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Authentication Endpoints
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/google - Google OAuth login



## Development

- `npm run dev` - Start development server
- `npm run test` - Run tests
- `npm run lint` - Run linting

## Security

This application implements several security measures:
- JWT authentication
- Password hashing with bcrypt
- CORS protection
- Helmet for HTTP headers
- Input validation

## License

ISC 