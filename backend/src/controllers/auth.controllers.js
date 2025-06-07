import bcrypt from "bcryptjs"
import {db} from "../libs/db.js"
import { UserRole } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const register = async (req,res)=>{
    const {email,password,name} = req.body;

    try {
        const existingUser = await db.user.findUnique({
            where:{
                email
            }
        })
        if(existingUser){
            return res.status(400).json({
                error:"User already exists"
            })
        }
        
        const hashedPassword = await bcrypt.hash(password,10);
        // console.log(hashedPassword);
        
        const newUser = await db.user.create({
            data:{
                email,
                password:hashedPassword,
                name,
                role:UserRole.USER
            }
        }) 
        // console.log(newUser);
        
        const token = jwt.sign({
            id:newUser.id
        },
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
        )
        
        res.cookie("jwt",token,{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "development",
            maxAge: 7*24*60*60*1000 //7 days

        })
        res.status(201).json({
            success:true,
            message:"User created successfully",
            user:{
                id:newUser.id,
                email:newUser.email,
                name:newUser.name,
                role:newUser.role,
                image:newUser.image
            }
        })


    } catch (error) {
        console.error("error creating user :",error);
        res.status(500).json({
            error: "Error creating user",
        })
    }

}

export const login = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await db.user.findUnique({
            where:{
                email,
            }

        })
        if(!user){
            return res.status(401).json({
                error:"User not found"
            })
        }
        console.log("user",user);
        
        const isMatched = await bcrypt.compare(password,user.password);
      
        
        if(!isMatched){
            return res.status(401).json({
                error:"Invalid Credentials"
            })
        }

        const token = jwt.sign({
            id:user.id
        },
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
        )

        res.cookie("jwt",token,{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "development",
            maxAge:1000*60*60*24*7 //7 days
        })

        res.status(201).json({
            success:true,
            message:"User logged in succesfully  successfully",
            user:{
                id:user.id,
                email:user.email,
                name:user.name,
                role:user.role,
                image:user.image
            }
        })

    } catch (error) {
        console.error("error logging in user :",error);
        res.status(500).json({
            error: "Error logging in user",
        })
    }
}

export const logout = async (req,res)=>{
    try {
        res.clearCookie("jwt",{
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "development",
        })
        res.status(200).json({
            success:true,
            message:"User logged out succesfully",
        })

    } catch (error) {
        console.error("error logging out user :",error);
        res.status(500).json({
            error: "Error logging out user",
        })
    }

 }

export const check = async (req,res)=>{
    try {
        res.status(200).json({
            success:true,
            message:"User authenticated succesfully",
            user:req.user,
        })
    } catch (error) {
        console.error("error checking user :",error);
        res.status(500).json({
            error: "Error logging out user",
        })
    }
}