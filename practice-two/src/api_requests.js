const axios = require('axios');

// GET request
async function getNotes() {
    try {
        const response = await axios.get('https://66149e8d2fc47b4cf27c99bc.mockapi.io/notes');
        return response.data;
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
}

// POST request
async function createNote(note) {
    try {
        const response = await axios.post('https://66149e8d2fc47b4cf27c99bc.mockapi.io/notes', note);
        return response.data;
    } catch (error) {
        console.error('Error creating note:', error);
        throw error;
    }
}

// DELETE request
async function deleteNote(noteId) {
    try {
        const response = await axios.delete(`https://66149e8d2fc47b4cf27c99bc.mockapi.io/notes/${noteId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting note with id ${noteId}:`, error);
        throw error;
    }
}

