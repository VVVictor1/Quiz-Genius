import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

//Register a new user

export const signup = async (req, res) => {
         const {firstName, lastName, email, password} = req.body;      
         try{
         
            //Check if the user already exists
            const existingUser = await User.findOne(
                {
                    where: {email}
                }
            );
               if(existingUser){
                return res.status(400).json({message: 'User already exists'});
               }

               //Hash the password

               const hashedPassword = await bcrypt.hash(password,10);
               
               //Create a new user
               const newUser = await User.create({firstName, lastName, email, password: hashedPassword})
               res.status(201).json({message: 'User created successfully', User: newUser});
         }catch (error){
            res.status(500).json({message: 'Error creating user', error: error.message});
         }

};

//Login a user

export const Login = async (req, res) => {
    const {email, password} = req.body;
    

    try{
        //Check if the user not found
        const user = await User.findOne({where: {email}});
        if(!user){
            return res.status(401).json({message: 'User not found'});
        }

        //Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: 'Invalid password'});
        }

        //Generate a JWT token
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        

        res.status(200).json({message: 'Login successful', token});
        
        

    }catch (error){
        res.status(500).json({message: 'Error logging in', error: error.message});
    }
};
