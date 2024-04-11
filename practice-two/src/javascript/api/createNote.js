const axios = require('axios');

async function createNote(note) {
    try {
        const response = await axios.post('https://66149e8d2fc47b4cf27c99bc.mockapi.io/notes', note);
        return response.data;
    } catch (error) {
        console.error('Error creating note:', error);
        throw error;
    }
}

module.exports = createNote;
