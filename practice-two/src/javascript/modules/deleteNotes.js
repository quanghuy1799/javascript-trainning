/* global document */
import httpUtils from '../utils/httpUtils';
import { renderAllNotes } from './getAndFilterNote';

async function handleDelete(noteId) {
  try {
    await httpUtils.deleteNote(noteId);
    await renderAllNotes();
    alert('Note deleted successfully!');
  } catch (error) {
    alert('An error occurred while deleting the note: ' + error.message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const noteFullContainer = document.getElementById('note-full-container');

  if (noteFullContainer) {
    noteFullContainer.addEventListener('click', function (event) {
      if (event.target.classList.contains('remove-note')) {
        const noteId = event.target.dataset.id;
        const confirmDelete = window.confirm(
          'Are you sure you want to delete this note?',
        );
        if (confirmDelete) {
          handleDelete(noteId);
        }
      }
    });
  }
});

export { handleDelete };
