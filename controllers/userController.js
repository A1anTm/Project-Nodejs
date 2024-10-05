import mongoose from "mongoose";
import User from "../models/UserModel.js";
import {generatetoken} from "../middlewares/auth.js"
import bcrypt from "bcrypt";

//Register
export const registerUser = async (req, res) => {
    const { name, lastName, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); 

        const newUser = new User({ name, lastName, email, password: hashedPassword }); 

        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


//Login
export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        let user = await User.findOne({email: email});
        if(user){
            const match = await bcrypt.compare(password, user.password);
        if(match){
            const Token = generatetoken(user)
            return res.status(200).json({user, Token})
        }
        else{
            return res.status(404).json({password: "Contraseña incorrecta"});
        } 
        }
        else{
            return res.status(404).json({email: "Email incorrecto"});
        }
    }catch(error){
        return res.status(500).json({name : error.name, error: error.message});
    }
}