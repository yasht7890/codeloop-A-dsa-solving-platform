import {db} from "../libs/db.js";
import { getJudge0LanguageId, submitBatch } from "../libs/judge0.libs.js";


export const createProblem = async (req, res) => {
    // going to get all the data from the request body
    const { title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolutions } = req.body;
    // going to check user role once again
    if (req.user.role !== "ADMIN") {
        return res.status(403).json({ error: "Access denied - Admins Only" })
    }
    // loop through each reference solution for different languages
    try {
        for (const [language, solutionCode] of object.entries(referenceSolutions)) {
            const languageId = getJudge0LanguageId(language);
            if (!languageId) {
                return res.status(400).json({ error: `Invalid language ${language}` })
            }

            const submissions = testcases.map(({ input, output }) => ({
                source_code: solutionCode,
                language_id: languageId,
                stdin: input,
                expected_output: output,
            })
            )
            const submissionResult = await submitBatch(submissions);

            const tokens = submissionResult.map((res) => res.token);

            const results = await poolBatchResults(tokens);

            for (let i = 0; i < results.length; i++) {
                const result = results[i];
                if (result.status.id !== 3) {
                    return res.status(400).json({ error: `Testcase ${i + 1} failed` })
                }

            }
            // save problems to the database;
            const newProblem = await db.problem.create({
                data: {
                    title, description, difficulty, tags, examples, constraints, testcases, codeSnippets, referenceSolutions, userId: req.user.id
                }
            });

            return res.status(201).json(newProblem);
        }

    } catch (error) {
        return res.status(500).json({ error: "Internal error while creating problem" })
    }

}

export const getProblem = async (req, res) => { }

export const getProblemById = async (req, res) => { }

export const updateProblem = async (req, res) => { }

export const deleteProblem = async (req, res) => { }

export const getAllProblemsSolvedByUser = async (req, res) => { }
