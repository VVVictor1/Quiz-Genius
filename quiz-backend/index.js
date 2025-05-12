import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes.js';
import passport from 'passport';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import uploadRoutes from './src/routes/uploadRoutes.js';
import quizRoutes from './src/routes/quizRoutes.js';
import { setupSocket } from './src/services/socketService.js';
import http from 'http';
import { Server } from 'socket.io';
import './src/models/Associations.js';
dotenv.config();

const app = express();


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

setupSocket(io);


app.use('/api/auth', authRoutes);
app.use('/api', uploadRoutes);
app.use('/api/quiz', quizRoutes);
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
