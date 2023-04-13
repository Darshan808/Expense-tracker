import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const saltRounds = 8;

const catagories = [
    { label: 'Investment', icon: 'I'},
    { label: 'Bills', icon:'B' },
    { label: 'Fun', icon: 'F' },
]
export const register = async (req,res)=>{
    const {email, password} = req.body;
    const userExists = await User.findOne({email:email});
    if(userExists!==null){
        res.status(409).json({message: 'User already exists.'});
        return;
    }
    const hash=bcrypt.hashSync(password, saltRounds)
    const newUser =await User({...req.body,password:hash,catagories:catagories});
    await newUser.save();
    res.status(201).json({message: 'New user created.'});
}

export const login = async (req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email:email});
    if(user===null){
        res.status(404).json({message: 'No credentials found.'});
        return;
    }
    const matched = bcrypt.compareSync(password, user.password);
    if(matched){
        const payload = {
            // userName: user.email,
            id: user._id
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET);
        res.json({message: 'Logged in', token, user});
    } else{
        res.status(404).json({message: 'No credentials found.'});
    }
}