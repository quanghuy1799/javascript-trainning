const axios = require('axios');

async function deleteNote(noteId) {
    try {
        const response = await axios.delete(`https://66149e8d2fc47b4cf27c99bc.mockapi.io/notes/${noteId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting note with id ${noteId}:`, error);
        throw error;
    }
}

module.exports = deleteNote;
