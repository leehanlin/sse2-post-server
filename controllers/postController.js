const pool = require('../config/db');

const createPost = async (req, res) => {
    try {
        const { userId, header, description, visibility, interestid } = req.body;
        const active = true;
        const createTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const lastUpdateTimestamp = createTimestamp;
        const visibilityBoolean = visibility === "University" ? false : true;

        if (!header || !description || !visibility || interestid === null) {
            //return res.status(400).json(req.body);
            return res.status(400).json({ message: 'All fields are required.' });
        }

        await pool.query('START TRANSACTION');

        const postQuery = `
            INSERT INTO posts (userid, create_timestamp, last_update_timestamp, interestid, header, description, visibility, active) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const postValues = [userId, createTimestamp, lastUpdateTimestamp, interestid, header, description, visibilityBoolean, active];

        const results = await pool.query(postQuery, postValues);
        await pool.query('COMMIT');

        return res.status(201).json({ message: 'Post created successfully.' });
    } catch (error) {
        await pool.query('ROLLBACK');
        console.error('Error creating post:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { createPost };
