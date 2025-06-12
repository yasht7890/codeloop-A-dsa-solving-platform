import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getAllSubmission, getAllTheSubmissionsForProblem, getSubmissionsForProblem } from "../controllers/submission.controllers.js";

const submissionRoutes = express.Router();


submissionRoutes.get("/get-all-submission",authMiddleware,getAllSubmission);
submissionRoutes.get("/get-submission/:problemId",authMiddleware,getSubmissionsForProblem);
submissionRoutes.get("/get-submissions-count",authMiddleware,getAllTheSubmissionsForProblem);


export default submissionRoutes