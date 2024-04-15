const axios = require('axios');

const BASE_URL = 'https://66149e8d2fc47b4cf27c99bc.mockapi.io/notes';

// GET request
async function getNotes() {
    try {
        const response = await axios.get(BASE_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
}

// POST request
async function createNote(note) {
    try {
        const response = await axios.post(BASE_URL, note);
        return response.data;
    } catch (error) {
        console.error('Error creating note:', error);
        throw error;
    }
}

// DELETE request
async function deleteNote(noteId) {
    try {
        const response = await axios.delete(`${BASE_URL}/${noteId}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting note with id ${noteId}:`, error);
        throw error;
    }
}
