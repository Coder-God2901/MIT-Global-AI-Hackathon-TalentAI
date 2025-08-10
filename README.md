# 🚀 TalentAI

A modern, AI-powered talent marketplace designed to connect top AI/ML professionals with innovative companies. The platform streamlines hiring with intelligent matching, skill verification, and a seamless user experience for both candidates and recruiters.

---

## 🌟 Features

### 🧩 Core Functionalities
- **User Authentication:** Secure login and signup for candidates and recruiters via Supabase.
- **Role-Based Dashboards:** Personalized dashboards for candidates and recruiters.
- **Profile Management:** Candidates can create and manage their professional profiles.
- **Responsive Design:** A fully responsive UI built with Next.js and Tailwind CSS for a seamless experience on any device.

### 🧠 AI & Backend Services
- **Resume Parsing:** A Python-based service extracts key data (skills, experience, contact info) from uploaded resumes.
- **Skill Assessment:** An integrated Python "fun test" challenges users to solve coding problems, validating their skills and generating a score.
- **AI Matching:** *(Future)* An AI model will match candidates to jobs based on parsed skills and assessment scores.

---

## 🛠️ Tech Stack

| Layer       | Tools                                          |
|-------------|------------------------------------------------|
| **Frontend**| Next.js (Pages Router, TypeScript), Tailwind CSS, shadcn/ui, Lucide React |
| **Backend** | Python (Flask), pdfplumber, spaCy              |
| **Database**| Supabase (PostgreSQL, Auth, Storage)            |
| **Deployment** | Vercel (Frontend), Render/Railway (Python API) |

---

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Coder-God2901/MIT-Global-AI-Hackathon-TalentAI.git
cd MIT-Global-AI-Hackathon-TalentAI
```
### 2. Set up Environment Variables
Create a .env.local file in the project root with the following content:
```
# Supabase Credentials
NEXT_PUBLIC_SUPABASE_URL=https://<your_project_ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_public_anon_key>

# Python Backend API URL
NEXT_PUBLIC_FLASK_API_URL=http://localhost:5001
```
### 3. Install Frontend Dependencies
```
npm install
```
### 4. Install Backend Dependencies
Navigate to the Python backend folder and set up the virtual environment:
```
cd Fun_Test/Fun\ Test\ 2/hour4_skill_validation
python -m venv venv
source venv/bin/activate      # For Linux/macOS
# or
venv\Scripts\activate         # For Windows

pip install -r requirements.txt
```
# 🚀 Running the Application
### 1. Start the Python Backend
In a terminal inside the hour4_skill_validation directory, run:
```
flask run --port=5001
```
### 2. Start the Next.js Frontend
In another terminal at the project root (TalentAI), run:
```
npm run dev
```
Access the app at: http://localhost:3000

# 🤝 Contributing
We welcome contributions! Feel free to fork the repository, create a new branch, and submit a pull request.

# 📬 Contact
For any questions, please reach out at akjain2904@gmail.com
