/* global document*/
import httpUtils from '../utils/httpUtils';
import { renderAllNotes } from './getAndFilterNote';

async function handleDeleteClick(noteId) {
  try {
    await httpUtils.deleteNote(noteId); 
    await renderAllNotes();
    alert('Note deleted successfully!');
  } catch (error) {
    alert('An error occurred while deleting the note: ' + error.message);
  }
}

const noteFullContainer = document.getElementById('note-full-container');

noteFullContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('remove-note')) {
    const noteId = event.target.dataset.id;
    const confirmDelete = confirm('Are you sure you want to delete this note?');
    if (confirmDelete) {
      handleDeleteClick(noteId);
    }
  }
});

export { handleDeleteClick };
