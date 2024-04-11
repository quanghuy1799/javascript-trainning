const axios = require('axios');

const apiClient = axios.create({
    baseURL: 'https://66149e8d2fc47b4cf27c99bc.mockapi.io'})

// GET request
async function getNotes() {
    try {
        const response = await apiClient.get('/notes');
        return response.data;
    } catch (error) {
        console.error('Error fetching notes:', error);
        throw error;
    }
}

// POST request
async function createNote(note) {
    try {
        const response = await apiClient.get('/notes');
        return response.data;
    } catch (error) {
        console.error('Error creating note:', error);
        throw error;
    }
}


