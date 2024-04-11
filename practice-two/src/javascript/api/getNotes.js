const axios = require('axios');

async function getNotes() {
    try {
        const response = await axios.get('https://66149e8d2fc47b4cf27c99bc.mockapi.io/notes');
        return response.data;
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
}

module.exports = getNotes;
