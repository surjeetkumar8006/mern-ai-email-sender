// Importing the mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Loading environment variables from a .env file
require('dotenv').config();

// Async function to connect to the MongoDB database
const ConDB = async () => {
    try {
        // Connecting to the MongoDB using the URI from .env
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ Connected to MongoDB successfully");
    } catch (error) {
        // Catching and logging any connection errors
        console.error("❌ Error connecting to MongoDB:", error.message);
    }
};

// Exporting the database connection function for use in other files
module.exports = ConDB;
