import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Get user ID from authenticated request
        const userId = req.user.userId;
        console.log(userId);
        const fileType = path.extname(file.originalname).toLowerCase().replace('.', '');
        const uploadPath = `src/uploads/${fileType}/${userId}`;
        console.log(uploadPath);
        // Create directory if it doesn't exist
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

function fileFilter(req, file, cb) {
    const allowedTypes = ['.pdf', '.docx', '.mp4'];
    if(allowedTypes.includes(path.extname(file.originalname).toLocaleLowerCase()))  {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type or size'), false);
    }
    
}

export default multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 1024 * 1024, // 1MB
    }
})
