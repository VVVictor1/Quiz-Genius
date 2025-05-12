import express from 'express';
import {signup, Login} from '../controllers/authController.js';
import passport from 'passport';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', Login);
router.get('/getting-started', authenticateUser, (req,res) => {
    res.json({message: 'Access granted', user: req.user});
    console.log('Access granted', req.user);
});



export default router;
