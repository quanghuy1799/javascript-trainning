/* global document */
import httpUtils from '../utils/httpUtils';
import { renderAllNotes } from './getNotes';



async function handleDeleteClick() {
  try {
    await httpUtils.deleteNote();
    await renderAllNotes();
    alert('Note deleted successfully!');
  } catch (error) {
    alert('An error occurred while deleting the note: ' + error.message);
  }
}

const deleteIcons = document.querySelectorAll('.remove-note');
deleteIcons.forEach(icon => {
  icon.addEventListener('click', function() {
    const noteId = this.dataset.id;
    const confirmDelete = confirm('Are you sure you want to delete this note?');
    if (confirmDelete) {
      handleDeleteClick(noteId);

    }
  });
});

export { handleDeleteClick };
