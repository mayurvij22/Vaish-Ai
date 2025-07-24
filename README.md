🌿 EcoSnap Backend
The backend server for EcoSnap — an AI-powered waste classifier and eco tracker app. Built with Express, MongoDB, and integrates Google's Generative AI, Cloudinary for image uploads, and JWT for authentication.

🚀 Features
🌱 Waste classification using Google Generative AI

🛡️ JWT-based authentication

☁️ Image upload and storage with Cloudinary

📦 MongoDB-based data storage via Mongoose

🔐 Password hashing with Bcrypt

📤 File uploads via Multer

🔁 Dev server auto-reload using Nodemon

📁 Project Structure
bash
Copy
Edit
ecosnap-backend/
├── index.js             # Entry point
├── .env                 # Environment variables
├── routes/              # Express route handlers
├── controllers/         # Logic for handling requests
├── models/              # Mongoose schemas/models
├── middleware/          # Auth & error-handling middleware
└── utils/               # Utility functions (e.g., AI integration)
🧰 Tech Stack
Node.js + Express

MongoDB + Mongoose

Google Generative AI API

JWT for auth

Cloudinary + Multer for image storage

dotenv, axios, etc.

⚙️ Installation
Clone the repo

bash
Copy
Edit
git clone https://github.com/your-username/ecosnap-backend.git
cd ecosnap-backend
Install dependencies

bash
Copy
Edit
npm install
Create a .env file

env
Copy
Edit
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GOOGLE_API_KEY=your_google_api_key
💻 Scripts
Script	Command	Description
Start	npm start	Run app with Node
Dev	npm run dev	Run app with Nodemon
Test	npm test	Placeholder test command

📡 API Endpoints
Sample endpoints — replace with actual route docs.

POST /api/auth/register - Register new user

POST /api/auth/login - User login

POST /api/classify - Classify waste image

GET /api/history - Get classification history

🧪 Example Usage
Register a User
http
Copy
Edit
POST /api/auth/register
Content-Type: application/json

{
  "username": "john123",
  "password": "securepass"
}
🛠️ Development Notes
Make sure MongoDB is running locally or use a cloud DB (MongoDB Atlas).

Google API key must have access to the Gemini Pro model.

Ensure your Cloudinary account is set up and API credentials are correct.
