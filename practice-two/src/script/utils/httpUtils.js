/* global fetch */

const BASE_URL = 'https://66149e8d2fc47b4cf27c99bc.mockapi.io/notes';

const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// GET request
const getNotes = () => fetchData(BASE_URL);

// POST request
const createNote = (note) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  };
  return fetchData(BASE_URL, requestOptions);
};

// DELETE request
const deleteNote = (noteId) => {
  const requestOptions = {
    method: 'DELETE',
  };
  return fetchData(`${BASE_URL}/${noteId}`, requestOptions);
};

// Update request
const updateNote = (noteId, updatedNote) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedNote),
  };
  return fetchData(`${BASE_URL}/${noteId}`, requestOptions);
};

export default {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
};
