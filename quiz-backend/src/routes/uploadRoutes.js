import { Router } from 'express';
import fileUploads from '../middleware/fileUploads.js';
import { validateFile } from '../middleware/fileValidation.js';
import { uploadFile, getUserFiles, deleteFile } from '../controllers/uploadController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
import path from 'path';

const router = Router();

// Upload a new file
router.post('/upload', authenticateUser, fileUploads.single('file'), validateFile, uploadFile);

// Get user's files
router.get('/upload/user/files', authenticateUser, getUserFiles);

// Delete a file
router.delete('/upload/user/files/:id', authenticateUser, deleteFile);



export default router; 