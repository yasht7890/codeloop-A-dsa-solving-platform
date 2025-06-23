
# 🧠 Codeloop – DSA Solving Platform


Codeloop is a full-fledged **Data Structures and Algorithms (DSA)** practice platform inspired by platforms like **LeetCode** and **HackerRank**. It allows developers to solve coding challenges, test their code in real-time, and track their progress across multiple programming languages.

---

## 🌟 About the Project

Codeloop provides an interactive and user-friendly coding environment for solving DSA problems with:

- 🔥 **Real-Time Code Editor** (Monaco-based)
- 📝 **Detailed Problem Descriptions**
- 🧪 **Auto-Validated Test Cases**
- 🌐 **Multi-Language Support** (JavaScript, Python, Java)
- 👨‍🎓 **User Progress Tracking**
- 📊 **Submission Stats (Runtime, Memory)**
- 🧑‍💼 **Admin Dashboard** for managing problems

---

## 🚀 Features

### 1. Interactive Code Editor
- Monaco Editor with syntax highlighting and themes
- Supports JavaScript, Python, and Java
- Handles dynamic and static input/output

### 2. Problem Display & Structure
- Title, difficulty, tags
- Descriptions with input/output examples
- Constraints, hints, and editorial

### 3. Execution & Validation
- One-click code execution with Judge0 API
- See runtime, memory usage, and error messages
- Submission history with verdicts

### 4. User Management
- JWT-based login and registration
- Persistent session tracking
- Profile page with solved problem count

### 5. Admin Features
- Add/update/delete problems
- Manage test cases and tags
- View platform usage stats

---

## 🛠️ Tech Stack

| Layer      | Technology                                |
|------------|--------------------------------------------|
| Frontend   | React.js, Tailwind CSS, Monaco Editor      |
| Backend    | Node.js, Express.js                        |
| Database   | PostgreSQL + Prisma ORM                    |
| Auth       | JSON Web Tokens (JWT)                      |
| Code Exec  | Judge0 API                                 |
| State Mgmt | Zustand                                    |

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- PostgreSQL
- Judge0 API (self-hosted or external)

### 1. Clone the Repository

```bash
git clone https://github.com/yasht7890/codeloop-A-dsa-solving-platform.git
cd codeloop-A-dsa-solving-platform
```

### 2. Install Dependencies

```bash
cd frontend
npm install
cd ../backend
npm install
```

### 3. Set Up Environment Variables

Create `.env` files in both `frontend` and `backend` directories. Example `.env` for backend:

```env
PORT=8080
DATABASE_URL=postgresql://user:password@localhost:5432/codeloop
JWT_SECRET=your_secret
JUDGE0_API_URL=http://localhost:2358
```

### 4. Run Development Server

**Backend:**

```bash
cd backend
npm run dev
```

**Frontend:**

```bash
cd frontend
npm run dev
```

---

## ✅ Known Improvements (Backlog)

| Category      | Description |
|---------------|-------------|
| 🔧 Bug Fixes   | Fix editor load glitch, profile UI, empty state handling |
| 💡 Enhancements | Add light/dark mode, syntax highlighting in output, landing page redesign |
| 🌟 New Features | AI integrations (hints, explainers), revision tagging, contribution graph |

---


## 📬 Contact

Built with ❤️ by [Yash Tyagi](https://github.com/yasht7890)  
For questions or feedback, please open an issue or pull request.
