import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getAllSubmission, getAllTheSubmissionsForProblem, getSubmissionForProblem } from "../controllers/submission.controllers.js";

submissionRoutes = express.Router();


submissionRoutes.get("/get-all-submission",authMiddleware,getAllSubmission);
submissionRoutes.get("/get-submission/:problemId",authMiddleware,getSubmissionForProblem);
submissionRoutes.get("/get-submissions-count",authMiddleware,getAllTheSubmissionsForProblem);


export default submissionRoutes