import { db } from "../libs/db.js";
import {
  getJudge0LanguageId,
  pollBatchResults,
  submitBatch,
  submitSingle,
} from "../libs/judge0.libs.js";

export const createProblem = async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    examples,
    constraints,
    testcases,
    codeSnippets,
    referenceSolutions,
  } = req.body;

  try {
    // Validation checks
    if (!title || !description || !difficulty || !testcases || !referenceSolutions) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["title", "description", "difficulty", "testcases", "referenceSolutions"]
      });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        error: "User authentication required"
      });
    }

    console.log("=== STARTING PROBLEM CREATION ===");
    console.log("Title:", title);
    console.log("Languages to test:", Object.keys(referenceSolutions));
    console.log("Number of test cases:", testcases.length);

    // Method 1: Single submission approach (more reliable)
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      console.log(`\n=== TESTING ${language.toUpperCase()} ===`);
      
      const languageId = getJudge0LanguageId(language);
      if (!languageId) {
        console.log(`❌ Language ${language} not supported`);
        return res.status(400).json({ 
          error: `Language ${language} is not supported`,
          supportedLanguages: Object.keys(getJudge0LanguageId("")).filter(Boolean)
        });
      }
      
      console.log(`Language ID: ${languageId}`);

      // Test each test case individually
      for (let i = 0; i < testcases.length; i++) {
        const testcase = testcases[i];
        console.log(`\nTesting ${language} - Testcase ${i + 1}/${testcases.length}`);
        console.log("Input:", testcase.input);
        console.log("Expected output:", JSON.stringify(testcase.output));

        const submission = {
          source_code: solutionCode,
          language_id: languageId,
          stdin: testcase.input,
          expected_output: testcase.output,
        };

        try {
          const result = await submitSingle(submission);
          
          console.log(`Testcase ${i + 1} result:`, {
            status: result.status?.description,
            statusId: result.status?.id,
            stdout: JSON.stringify(result.stdout),
            stderr: result.stderr,
            time: result.time,
            memory: result.memory
          });

          // Check if submission was successful (status 3 = Accepted)
          if (result.status.id !== 3) {
            console.log(`❌ Testcase ${i + 1} failed for ${language}`);
            
            return res.status(400).json({
              error: `Testcase ${i + 1} failed for language ${language}`,
              details: {
                testcase: i + 1,
                language: language,
                expected: testcase.output,
                actual: result.stdout,
                status: result.status?.description,
                stderr: result.stderr,
                compile_output: result.compile_output,
                input: testcase.input
              }
            });
          }
          
          console.log(`✅ Testcase ${i + 1} passed for ${language}`);
          
          // Add small delay to avoid rate limiting
          await sleep(200);
          
        } catch (testError) {
          console.error(`❌ Error testing ${language} testcase ${i + 1}:`, testError.message);
          
          return res.status(500).json({
            error: `Failed to test ${language} solution on testcase ${i + 1}`,
            details: {
              testcase: i + 1,
              language: language,
              error: testError.message,
              input: testcase.input
            }
          });
        }
      }
      
      console.log(`✅ All test cases passed for ${language}`);
    }

    console.log("\n=== ALL VALIDATIONS PASSED ===");
    console.log("Creating problem in database...");
    
    // Create problem in database
    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tags,
        examples,
        constraints,
        testcases,
        codeSnippets,
        referenceSolutions,
        userId: req.user.id,
      },
    });

    console.log("✅ Problem created successfully with ID:", newProblem.id);

    return res.status(201).json({
      success: true,
      message: "Problem Created Successfully",
      problem: newProblem,
    });
    
  } catch (error) {
    console.error("\n❌ PROBLEM CREATION FAILED ❌");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    // Database connection errors
    if (error.code === 'P2002') {
      return res.status(400).json({
        error: "Problem with this title already exists",
        details: "Duplicate entry"
      });
    }
    
    // Database validation errors
    if (error.code && error.code.startsWith('P')) {
      return res.status(400).json({
        error: "Database validation error",
        details: error.message
      });
    }
    
    return res.status(500).json({
      error: "Error While Creating Problem",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};








export const getAllProblems = async (req, res) => {
  try {
    const problems = await db.problem.findMany(
      {
        include:{
          solvedBy:{
            where:{
              userId:req.user.id
            }
          }
        }
      }
    );

    if (!problems) {
      return res.status(404).json({
        error: "No problems Found",
      });
    }

    res.status(200).json({
      sucess: true,
      message: "Message Fetched Successfully",
      problems,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error While Fetching Problems",
    });
  }
};

export const getProblemById = async (req, res) => {
  const { id } = req.params;

  try {
    const problem = await db.problem.findUnique({
      where: {
        id,
      },
    });

    if (!problem) {
      return res.status(404).json({ error: "Problem not found." });
    }

    return res.status(200).json({
      sucess: true,
      message: "Message Created Successfully",
      problem,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error While Fetching Problem by id",
    });
  }
};

// TODO: IMPLEMENT BY YOUR SELF🔥
export const updateProblem = async (req, res) => {
  // id
  // id--->problem ( condition)
  // baaki kaam same as create
};

export const deleteProblem = async (req, res) => {
  const { id } = req.params;

  try {
    const problem = await db.problem.findUnique({ where: { id } });

    if (!problem) {
      return res.status(404).json({ error: "Problem Not found" });
    }

    await db.problem.delete({ where: { id } });

    res.status(200).json({
      success: true,
      message: "Problem deleted Successfully",
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: "Error While deleting the problem",
    });
  }
};

export const getAllProblemsSolvedByUser = async (req, res) => {
  try {
    const problems = await db.problem.findMany({
      where:{
        solvedBy:{
          some:{
            userId:req.user.id
          }
        }
      },
      include:{
        solvedBy:{
          where:{
            userId:req.user.id
          }
        }
      }
    })

    res.status(200).json({
      success:true,
      message:"Problems fetched successfully",
      problems
    })
  } catch (error) {
    console.error("Error fetching problems :" , error);
    res.status(500).json({error:"Failed to fetch problems"})
  }
};