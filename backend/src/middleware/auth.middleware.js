import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../libs/db.js";
dotenv.config({
    path:"./.env"
});

export const authMiddleware = async (req,res,next) =>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        let decoded;
        try {
            decoded = jwt.verify(token,process.env.JWT_SECRET)
        } catch (error) {
            return res.status(401).json({
                message:"Unauthorized - Invalid token"
            })
        }
        const user = await db.user.findUnique({
            where:{
                id:decoded.id
            },
            select:{
                id:true,
                image:true,
                name:true,
                email:true,
                role:true
            }

        })
        console.log(user);
        
        if(!user) return res.status(404).json({message:"user not found"})

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({message:"Internal server error"});

        
    }
}

export const checkAdmin = async (req,res,next) =>{
    try {
        const userId = req.user.id;
        const user = await db.user.findUnique({
            where:{
                id:userId
            },
            select:{
                role:true,
            }

        })
        if(!user || user.role != "ADMIN"){
            return res.status(403).json({
                message : "Access denied - Admins Only"
            })
        }

        next();


    } catch (error) {
        console.log("Error cecking admin",error);
        res.status(500).json({message:"Internal server error"});    
    }
}

