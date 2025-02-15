import {User} from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const register = async(req, res) =>{
    try {
        const {name, email, password} = req.body;
        if (!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required to be filled.",
            })
        }
        const user= await User.findOne({email});
        if (user){
            return res.status(400).json({
                success:false,
                message: "User Already Exists with this Email ID, Try a different Email ID."
            })
        }
        const hashedPassword= await bcrypt.hash(password,10);
        await User.create({name:name, email:email, password:hashedPassword});
        return res.status(200).json({
            success:true,
            message: "Account Created Successfully",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Failed to Register.",
        })
    }
}

export const login = async(req, res) =>{
    try {
        const {email, password} = req.body;
        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required to be filled.",
            })
        }
        const user= await User.findOne({email});
        if (!user){
            return res.status(400).json({
                success:false,
                message: "Incorrect Email."
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(400).json({
                success:false,
                message: "Incorrect Email or Password.",
            })
        }
        generateToken(res, user, `Welcome Back ${user.name}`);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Failed to Login.",
        })
    }
}

export const logout = async(req, res)=>{
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully.",
            sucess:true,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"failed to logout",
        })
    }
}

export const getUserProfile = async(req, res)=>{
    try {
        const userId= req.id;
        const user = await User.findById(userId).select("-password")
        if (!user){
            return res.status(404).json({
                message:"Profile not found",
                success:false,
            })
        }
        return res.status(200).json({
            success: true,
            user,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"failed to load user",
        })
    }
}