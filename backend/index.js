// Importing necessary libraries and env vars
const express = require('express');
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { sendEmailController, getUsers } = require("./controllers/emailController");
const generateEmailController = require("./controllers/generateController");
const { generateEmailFromPrompt } = require('./controllers/aiController');
const ConDB = require("./DB/ConDB.js");

dotenv.config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// MongoDB connection
ConDB();

// Existing routes
app.post("/", sendEmailController); // Sends the email
app.get("/", getUsers); // Gets number of users

// ✅ New route: Generates email using AI
app.post("/generate-email", generateEmailFromPrompt);
app.post("/api/generate", generateEmailController);

// Start the server
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
