/* global fetch */

const BASE_URL = 'https://66149e8d2fc47b4cf27c99bc.mockapi.io/notes';

async function fetchData(url, options) {
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      throw error;
    });
}

// GET request
function getNotes() {
  return fetchData(BASE_URL);
}

// POST request
function createNote(note) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  };
  return fetchData(BASE_URL, requestOptions);
}

// DELETE request
function deleteNote(noteId) {
  const requestOptions = {
    method: 'DELETE',
  };
  return fetchData(`${BASE_URL}/${noteId}`, requestOptions);
}

//Update request
function updateNote(noteId, updatedNote) {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedNote),
  };
  return fetchData(`${BASE_URL}/${noteId}`, requestOptions);
}

export default {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
};
