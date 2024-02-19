const pool = require('../config/db'); // Import the connection pool

// Controller function to handle creating a new post
const createPost = async (req, res) => {
    try {
        // Extract data from request body
        const { header, description, tags, visibility, categoryId } = req.body; // Receive categoryId from the frontend
        const userId = "0001"; // Hardcoded for now
        const active = true;
        const createTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' '); // Current date and time
        const lastUpdateTimestamp = createTimestamp;
        const visibilityBoolean = (visibility === "University") ? false : true;

        // Validate required fields
        if (!header || !description || !tags || !visibility || !categoryId) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Split tags string into an array
        const tagsArray = tags.split(',').map(tag => tag.trim());

        // Start a transaction
        await pool.query('START TRANSACTION');

        // Insert post data into the database
        const postQuery = `
            INSERT INTO posts (userid, create_timestamp, last_update_timestamp, categoryid, header, description, visibility, active) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const postValues = [userId, createTimestamp, lastUpdateTimestamp, categoryId, header, description, visibilityBoolean, active];

        // Execute the post query
        pool.query(postQuery, postValues, async (error, results) => {
            if (error) {
                await pool.query('ROLLBACK');
                console.error('Error creating post:', error);
                return res.status(500).json({ message: 'Internal server error.' });
            }

            const postId = results.insertId;
            for (let i = 0; i < tagsArray.length; i++) {
                const tagsQuery = `
                    INSERT INTO tags (postid, post_userid, tag)
                    VALUES (?, ?, ?)
                `;
                const tagValues = [postId, userId, tagsArray[i]];
                console.log("Tags Query:", tagsQuery);
                console.log("Tag Values:", tagValues);
                await pool.query(tagsQuery, tagValues);
            }

            // Commit the transaction
            await pool.query('COMMIT');

            return res.status(201).json({ message: 'Post created successfully.' });
        });

    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { createPost };

