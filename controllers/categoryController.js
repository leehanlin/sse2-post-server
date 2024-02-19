const pool = require('../config/db');

const getAllCategories = async (req, res) => {
    try {
        pool.query('SELECT categoryId, category FROM category', (error, results) => {
            if (error) {
                console.error('Error fetching categories:', error);
                res.status(500).json({ message: 'Internal server error.' });
            } else {
                if (results.length === 0) {
                    console.error('No categories found in the database');
                    res.status(404).json({ message: 'No categories found in the database' });
                } else {
                    const categories = results.map(result => ({ categoryId: result.categoryId, category: result.category }));
                    res.status(200).json(categories);
                }
            }
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { getAllCategories };
