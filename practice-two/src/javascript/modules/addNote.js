import httpUtils from '../utils/httpUtils';
import { renderAllNotes } from './getNotes';
/* global document */

async function addNote(note) {
  try {
    await httpUtils.createNote(note);
    showSnackbar('Note added successfully!', 'success');
  } catch (error) {
    showFormErrorMessage('Error adding note: ' + error.message);
  }
}

const addNotesButton = document.getElementById('add-notes');
if (addNotesButton) {
  addNotesButton.addEventListener('click', () => {
    const addNotesModal = document.getElementById('addnotesmodal');
    if (addNotesModal) {
      addNotesModal.style.display = 'show';
    }
  });
}

const addNoteButton = document.getElementById('btn-n-add');
if (addNoteButton) {
  addNoteButton.addEventListener('click', async () => {
    const noteTitleInput = document.getElementById('note-has-title');
    const noteDescriptionInput = document.getElementById(
      'note-has-description',
    );

    const noteTitle = noteTitleInput ? noteTitleInput.value.trim() : '';
    const noteDescription = noteDescriptionInput
      ? noteDescriptionInput.value.trim()
      : '';

    if (!noteTitle) {
      showFormErrorMessage('Title is required.');
      return;
    } else if (noteTitle.length > 20) {
      showFormErrorMessage('Title must be at most 20 characters.');
      return;
    }

    if (!noteDescription) {
      showFormErrorMessage('Description is required.');
      return;
    }

    const note = {
      title: noteTitle,
      description: noteDescription,
    };

    await addNote(note);
    await renderAllNotes();
  });
}

function showFormErrorMessage(message) {
  const errorMessageElement = document.getElementById('form-error-message');
  if (errorMessageElement) {
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
  }
}

function showSnackbar(message, type) {
  const snackbarElement = document.getElementById('snackbar');
  if (snackbarElement) {
    snackbarElement.textContent = message;
    snackbarElement.classList.add(type);
    snackbarElement.classList.add('show');
    setTimeout(() => {
      snackbarElement.classList.remove(type);
      snackbarElement.classList.remove('show');
    }, 3000);
  }
}

export { addNote };
