// index.js

const express = require('express');
const app = express();
const cors = require('cors'); // Import the CORS middleware

// Import your post route
const postRoutes = require('./routes/postRoutes');

// Middleware to parse JSON bodies
app.use(express.json());

// Use CORS middleware to allow requests from all origins
app.use(cors());

// Use post route
app.use('/api/posts', postRoutes);

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});