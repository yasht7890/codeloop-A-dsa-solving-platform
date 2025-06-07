import express from "express";
import { createProblem, deleteProblem, getAllProblemsSolvedByUser, getProblem, getProblemById, updateProblem } from "../controllers/problem.controllers.js";
import { authMiddleware, checkAdmin } from "../../middleware/auth.middleware.js";

const problemRoutes = express.Router();

problemRoutes.post("/create-problem",authMiddleware,checkAdmin,createProblem);
problemRoutes.get("/get-all-problem",authMiddleware,getProblem);
problemRoutes.get("/get-problem/:id",authMiddleware,getProblemById);
problemRoutes.put("/update-problem/:id",authMiddleware,checkAdmin,updateProblem);
problemRoutes.delete("/delete-problem/:id",authMiddleware,checkAdmin,deleteProblem);
problemRoutes.get("/get-solved-problem",authMiddleware,getAllProblemsSolvedByUser);



export default problemRoutes