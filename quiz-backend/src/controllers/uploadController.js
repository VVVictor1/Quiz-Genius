import { extractedContent } from '../services/extractionService.js';
import ExtractContent from '../models/Extract_Content.js';
import fs from 'fs/promises';
import { Op } from 'sequelize';
import path from 'path';
export const uploadFile = async (req, res) => {
    try {
        const { userId } = req.user;
        const { file } = req;
        console.log('User ID:', userId);
        console.log('File:', {
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            path: file.path
        });
        
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const duplicate = await ExtractContent.findOne({
            where: {
                userId,
                fileName: file.originalname,
            }
        });

        if (duplicate) {
            // Delete the file from the server
            await fs.unlink(file.path);
            return res.status(400).json({ message: 'File already exists' });
        }
 
        const extension = path.extname(file.originalname).toLowerCase().replace('.', '');
        const extractContent = await extractedContent(file.path,extension )
        console.log('Extracted content:', extractContent);
        //when user upload a file,it will create a record in database specifically for the extracted content and file information
        const createdContent = await ExtractContent.create({
            userId,
            fileName: file.originalname,
            fileType: path.extname(file.originalname).toLowerCase().replace('.', ''),
            filePath: file.path,
            size: file.size,
            extractedContent: extractContent,
        });

        res.status(201).json({
            message: 'File uploaded successfully',
            success: true,
            file: {
                id: createdContent.extractId,
                filename: file.originalname,
                fileType: path.extname(file.originalname).toLowerCase().replace('.', ''),
                uploadedAt: createdContent.uploadedAt,
                size: file.size,
                status: 'completed',                                
            }
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Error uploading file' });
    }
};

//display all files uploaded by the user
export const getUserFiles = async (req, res) => {
    try {
        const { userId } = req.user;
        
        const userFiles = await ExtractContent.findAll({
            where: {
                userId,           
            },
            order: [['uploadedAt', 'DESC']]
        });

        const files = userFiles.map(file => ({
            id: file.extractId,
            filename: file.fileName,
            fileType: file.fileType,
            uploadedAt: file.uploadedAt,
            size: file.size,
            expiresAt: file.expiresAt
        }));

        res.json(files);
    } catch (error) {
        console.error('Error fetching user files:', error);
        res.status(500).json({ message: 'Error fetching files' });
    }
};

//delete a file from the database and the disk
export const deleteFile = async (req, res) => {

    try{
        const { userId } = req.user;
        const { id } = req.params;

        const file = await ExtractContent.findOne({
            where: {
                extractId: id,
                userId
            }
        });

        if(!file){
            return res.status(404).json({ message: 'File not found' });
        }

        await fs.unlink(file.filePath);
        await ExtractContent.destroy({
            where: {
                extractId: id,
                userId
            }
        });

        res.json({ message: 'File deleted successfully', success: true });
    }catch(error){
        console.error('Error deleting file:', error);
        res.status(500).json({ message: 'Error deleting file', success: false });
    }
}
