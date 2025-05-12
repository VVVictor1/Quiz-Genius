import jwt from 'jsonwebtoken';

//backend middleware to check if the user is authenticated to access the protected routes(API endpoints)

export const authenticateUser = (req,res,next) => {
    console.log('⭐ Middleware checking token...');
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
        console.log('❌ No token provided');
        return res.status(401).json({message: 'No token provided'});
    }

    try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log('✅ Token verified:', decoded); 
            req.user = {
                userId: decoded.userId
            };    
            console.log('User ID from token:', req.user.userId);

            next();

    
    }catch(error){
        console.log('❌ Invalid token:', error);
        res.status(401).json({message: 'Invalid token'});
    }

}