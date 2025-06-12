import {db} from "../libs/db.js"

export const getAllSubmission = async(req , res)=>{
    try {
        const userId = req.user.id;
        if(!userId) return res.status(401).json({error:"Unauthorized"});
        const submissions = await db.submission.findMany({
            where:{
                userId:userId
            }
        })

        res.status(200).json({
            success:true,
            message:"Submissions fetched successfully",
            submissions
        })
        
    } catch (error) {
        console.error("Fetch Submissions Error:", error);
        res.status(500).json({ error: "Failed to fetch submissions" });
    }
}


export const getSubmissionsForProblem = async (req , res)=>{
    try {
        const userId = req.user.id;
        if(!userId) return res.status(401).json({error:"Unauthorized"});
        const problemId = req.params.problemId;
        if(!problemId) return res.status(400).json({error:"Problem ID not provided"});
        const submissions = await db.submission.findMany({
            where:{
                userId:userId,
                problemId:problemId
            }
        })

        res.status(200).json({
            success:true,
            message:"Submission fetched successfully",
            submissions
        })
    } catch (error) {
        console.error("Fetch Submissions Error:", error);
        res.status(500).json({ error: "Failed to fetch submissions" });
    }
}


export const getAllTheSubmissionsForProblem = async (req , res)=>{
    try {
        const problemId = req.params.problemId;
        if(!problemId) return res.status(400).json({error:"Problem ID not provided"});
        const submission = await db.submission.count({
            where:{
                problemId:problemId
            }
        })

        res.status(200).json({
            success:true,
            message:"Submissions Fetched successfully",
            count:submission
        })
    } catch (error) {
        console.error("Fetch Submissions Error:", error);
        res.status(500).json({ error: "Failed to fetch submissions" });
    }
}