export const validateFile = (req, res, next) => {
    const {file} = req;
    if(!file) {
        return res.status(400).json({message: 'No file uploaded'});
    }
    next();
}
