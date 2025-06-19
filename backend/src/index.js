import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import cookieParser from "cookie-parser"


import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problems.routes.js";
import executionRoutes from "./routes/executionRoutes.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import playlistRoutes from "./routes/playlist.routes.js";

const app = express();

const port = process.env.PORT ?? 8000

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("Hello guys welcome to leetlab❤️")
})

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/problems",problemRoutes)
app.use("/api/v1/execute-code",executionRoutes)
app.use("/api/v1/submissions",submissionRoutes)
app.use("/api/v1/playlist",playlistRoutes)

app.listen(port,()=>{
    console.log(`App is listening port ${port}`);
    
})