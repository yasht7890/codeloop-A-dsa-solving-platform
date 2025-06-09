import axios from "axios";

// Enhanced language mapping with more languages
export const getJudge0LanguageId = (language) => {
  const languageMap = {
    "PYTHON": 71,
    "JAVA": 62,
    "JAVASCRIPT": 63,
    "TYPESCRIPT": 74,
    "CPP": 54,
    "C": 50,
    "CSHARP": 51,
    "GO": 60,
    "RUBY": 72,
    "PHP": 68,
    "KOTLIN": 78,
    "SWIFT": 83,
    "RUST": 73
  };

  return languageMap[language.toUpperCase()];
};

// Helper function for delays
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Test Judge0 connectivity for Docker setup
export const testJudge0 = async (req, res) => {
  try {
    console.log("Testing Docker Judge0 connection...");
    console.log("Judge0 URL:", process.env.JUDGE0_API_URL);
    
    if (!process.env.JUDGE0_API_URL) {
      return res.status(500).json({ 
        error: "JUDGE0_API_URL environment variable is not set" 
      });
    }

    // Docker Judge0 doesn't need authentication headers
    const headers = {
      'Content-Type': 'application/json'
    };

    const { data } = await axios.get(`${process.env.JUDGE0_API_URL}/languages`, {
      headers,
      timeout: 10000
    });
    
    console.log("✅ Docker Judge0 connection successful");
    console.log("Available languages:", data.length);
    
    // Show Python, Java, JavaScript language info
    const importantLanguages = data.filter(lang => 
      [71, 62, 63, 74].includes(lang.id)
    );
    
    return res.json({ 
      success: true, 
      url: process.env.JUDGE0_API_URL,
      totalLanguages: data.length,
      importantLanguages: importantLanguages,
      dockerSetup: true
    });
  } catch (error) {
    console.error("❌ Docker Judge0 connection test failed:", error.message);
    
    return res.status(500).json({ 
      error: "Docker Judge0 connection failed",
      details: error.response?.data || error.message,
      url: process.env.JUDGE0_API_URL
    });
  }
};

// Enhanced single submission function for Docker Judge0
export const submitSingle = async (submission) => {
  try {
    if (!process.env.JUDGE0_API_URL) {
      throw new Error("JUDGE0_API_URL environment variable is not set");
    }

    // Docker Judge0 only needs basic headers (no authentication)
    const headers = {
      'Content-Type': 'application/json'
    };

    console.log("Submitting single submission to Docker Judge0...");
    console.log("Submission details:", {
      language_id: submission.language_id,
      stdin: JSON.stringify(submission.stdin),
      expected_output: JSON.stringify(submission.expected_output),
      source_code_preview: submission.source_code?.substring(0, 100) + "..."
    });

    const { data } = await axios.post(
      `${process.env.JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
      submission,
      { 
        headers, 
        timeout: 30000 
      }
    );

    console.log("Docker Judge0 response:", {
      token: data.token,
      status: data.status?.description,
      status_id: data.status?.id,
      stdout: JSON.stringify(data.stdout),
      stderr: data.stderr ? JSON.stringify(data.stderr) : null,
      compile_output: data.compile_output ? JSON.stringify(data.compile_output) : null,
      time: data.time,
      memory: data.memory
    });

    return data;
  } catch (error) {
    console.error("❌ Docker Judge0 submission error:");
    console.error("Message:", error.message);
    console.error("URL:", `${process.env.JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`);
    
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Response data:", JSON.stringify(error.response.data, null, 2));
    } else if (error.code === 'ECONNREFUSED') {
      console.error("❌ Connection refused - Is Docker Judge0 running?");
      console.error("Check: docker ps | grep judge0");
    } else if (error.code === 'ETIMEDOUT') {
      console.error("❌ Request timeout - Judge0 might be overloaded");
    }
    
    throw error;
  }
};

// Enhanced batch submission function for Docker Judge0
export const submitBatch = async (submissions) => {
  try {
    if (!process.env.JUDGE0_API_URL) {
      throw new Error("JUDGE0_API_URL environment variable is not set");
    }

    console.log("=== SUBMITTING BATCH TO DOCKER JUDGE0 ===");
    console.log("URL:", `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`);
    console.log("Submissions count:", submissions.length);
    console.log("First submission sample:", JSON.stringify(submissions[0], null, 2));

    // Docker Judge0 only needs basic headers
    const headers = {
      'Content-Type': 'application/json'
    };

    const { data } = await axios.post(
      `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`,
      { submissions },
      {
        headers,
        timeout: 30000
      }
    );

    console.log("✅ Docker Judge0 batch submission successful");
    console.log("Response:", JSON.stringify(data, null, 2));
    
    return data;
  } catch (error) {
    console.error("❌ Docker Judge0 batch submission error:");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("URL:", `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false`);
    
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
      console.error("Data:", JSON.stringify(error.response.data, null, 2));
    } else if (error.request) {
      console.error("No response received from Docker Judge0");
      if (error.code === 'ECONNREFUSED') {
        console.error("❌ Connection refused - Is Docker Judge0 container running?");
        console.error("Check with: docker ps | grep judge0");
        console.error("Start with: docker-compose up -d (in your judge0 directory)");
      }
    }

    throw error;
  }
};

// Enhanced polling function for Docker Judge0
export const pollBatchResults = async (tokens) => {
  if (!process.env.JUDGE0_API_URL) {
    throw new Error("JUDGE0_API_URL environment variable is not set");
  }

  // Docker Judge0 only needs basic headers
  const headers = {
    'Content-Type': 'application/json'
  };

  let attempts = 0;
  const maxAttempts = 30; // Maximum 30 attempts (30 seconds)

  while (attempts < maxAttempts) {
    try {
      console.log(`Polling Docker Judge0 - attempt ${attempts + 1}/${maxAttempts} for ${tokens.length} tokens...`);
      
      const { data } = await axios.get(
        `${process.env.JUDGE0_API_URL}/submissions/batch`,
        {
          params: {
            tokens: tokens.join(","),
            base64_encoded: false,
          },
          headers,
          timeout: 10000
        }
      );

      const results = data.submissions;
      
      if (!results || !Array.isArray(results)) {
        throw new Error("Invalid response format from Docker Judge0");
      }

      // Check if all submissions are done (not in queue or processing)
      // Status 1 = In Queue, Status 2 = Processing
      const isAllDone = results.every(
        (r) => r.status && r.status.id !== 1 && r.status.id !== 2
      );

      if (isAllDone) {
        console.log("✅ All submissions completed on Docker Judge0");
        return results;
      }

      const stillProcessing = results.filter(r => r.status && (r.status.id === 1 || r.status.id === 2));
      console.log(`${stillProcessing.length} submissions still processing, waiting...`);
      
      await sleep(1000);
      attempts++;
      
    } catch (error) {
      console.error(`Docker Judge0 polling attempt ${attempts + 1} failed:`, error.message);
      
      if (error.code === 'ECONNREFUSED') {
        throw new Error("Docker Judge0 connection refused - container might be down");
      }
      
      attempts++;
      
      if (attempts >= maxAttempts) {
        throw new Error(`Docker Judge0 polling failed after ${maxAttempts} attempts: ${error.message}`);
      }
      
      await sleep(1000);
    }
  }

  throw new Error("Docker Judge0 polling timeout: submissions took too long to complete");
};

// Main problem creation function with enhanced error handling
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

// Alternative batch approach (if single submissions don't work)
export const createProblemBatch = async (req, res) => {
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
    console.log("=== USING BATCH APPROACH ===");
    console.log("Starting problem creation for:", title);
    console.log("Reference solutions:", Object.keys(referenceSolutions));
    
    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      console.log(`\n=== Testing ${language} ===`);
      
      const languageId = getJudge0LanguageId(language);
      if (!languageId) {
        return res.status(400).json({ error: `Language ${language} is not supported` });
      }

      const submissions = testcases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      try {
        const submissionResults = await submitBatch(submissions);
        
        if (!submissionResults || !Array.isArray(submissionResults)) {
          throw new Error(`Invalid submission response for ${language}`);
        }

        const tokens = submissionResults.map((res) => {
          if (!res.token) {
            throw new Error(`Missing token in submission response for ${language}`);
          }
          return res.token;
        });

        const results = await pollBatchResults(tokens);

        for (let i = 0; i < results.length; i++) {
          const result = results[i];
          
          if (result.status.id !== 3) {
            return res.status(400).json({
              error: `Testcase ${i + 1} failed for language ${language}`,
              details: {
                expected: testcases[i].output,
                actual: result.stdout,
                status: result.status?.description,
                stderr: result.stderr
              }
            });
          }
        }
        
      } catch (judgeError) {
        return res.status(500).json({
          error: `Failed to validate ${language} solution`,
          details: judgeError.message
        });
      }
    }

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

    return res.status(201).json({
      success: true,
      message: "Problem Created Successfully",
      problem: newProblem,
    });
    
  } catch (error) {
    console.error("❌ Batch creation error:", error);
    return res.status(500).json({
      error: "Error While Creating Problem",
      details: error.message
    });
  }
};

// Language name helper function
export function getLanguageName(languageId) {
  const LANGUAGE_NAMES = {
    74: "TypeScript",
    63: "JavaScript", 
    71: "Python",
    62: "Java",
    54: "C++",
    50: "C",
    51: "C#",
    60: "Go",
    72: "Ruby",
    68: "PHP",
    78: "Kotlin",
    83: "Swift",
    73: "Rust"
  };

  return LANGUAGE_NAMES[languageId] || "Unknown";
}