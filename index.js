// index.js

const express = require('express');
const app = express();
const cors = require('cors'); // Import the CORS middleware

// Import your post and category routes
const postRoutes = require('./routes/postRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); // Import category routes

// Middleware to parse JSON bodies
app.use(express.json());

// Use CORS middleware to allow requests from all origins
app.use(cors());

// Use post and category routes
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes); // Use category routes

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
