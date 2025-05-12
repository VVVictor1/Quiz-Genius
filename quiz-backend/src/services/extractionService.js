import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import fs from 'fs/promises';


export const extractedContent = async(filePath,fileType) => {
    
    try{
        switch(fileType){
            
            case 'pdf':
                const dataBuffer = await fs.readFile(filePath);
                const pdfData = await pdfParse(dataBuffer);
                return pdfData.text;
        
            case 'docx':
                const buffer = await fs.readFile(filePath);
                const docxData = await mammoth.extractRawText(buffer);
                return docxData.value;
            case 'txt':
                const txtData = await fs.readFile(filePath, 'utf8');
                return txtData;
            default:
                throw new Error('Unsupported file type');
                
        }
    }catch(error) {
        console.error('Error extracting content:', error);
        throw new Error('Error extracting content');
    }
}

