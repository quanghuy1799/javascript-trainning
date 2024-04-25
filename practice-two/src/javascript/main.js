/* global document */
import { renderAllNotes } from './modules/getNotes';
import { addNote } from './modules/addNote';

document.addEventListener('DOMContentLoaded', renderAllNotes);

const addNotesButton = document.getElementById('add-notes');
if (addNotesButton) {
  addNotesButton.addEventListener('click', async () => {
    const addNotesModal = document.getElementById('addnotesmodal');
    if (addNotesModal) {
      addNotesModal.classList.add('show');
      addNotesModal.style.display = 'block';
    }
  });
}

const noteTitleInput = document.getElementById('note-has-title');
const noteDescriptionInput = document.getElementById('note-has-description');

const addNoteButton = document.getElementById('btn-n-add');

function checkInputs() {
  const title = noteTitleInput.value.trim();
  const description = noteDescriptionInput.value.trim();

  if (title) {
    addNoteButton.setAttribute('disabled', 'disabled');
  }

  if (title.length > 20) {
    noteTitleInput.classList.add('error-input');
    addNoteButton.setAttribute('disabled', 'disabled');
    return;
  } else {
    noteTitleInput.classList.remove('error-input');
  }

  if (!description) {
    addNoteButton.setAttribute('disabled', 'disabled');
    return;
  }

  addNoteButton.removeAttribute('disabled');
}

noteTitleInput.addEventListener('input', checkInputs);
noteDescriptionInput.addEventListener('input', checkInputs);

addNoteButton.addEventListener('click', async () => {
  const note = {
    title: noteTitleInput.value.trim(),
    description: noteDescriptionInput.value.trim(),
  };

  await addNote(note);
  await renderAllNotes();
});

addNoteButton.setAttribute('disabled', 'disabled');

addNoteButton.addEventListener('click', async () => {
  const title = noteTitleInput.value.trim();
  const description = noteDescriptionInput.value.trim();

  if (title && description) {
    const note = {
      title: title,
      description: description,
    };

    await addNote(note);

    await renderAllNotes();

    closePopup();
  }
});

function closePopup() {
  const popup = document.getElementById('addnotesmodal');
  popup.style.display = 'none';
}

const closeButton = document.querySelector('.modal-header .close');
const discardButton = document.querySelector('.modal-footer .btn-danger');

closeButton.addEventListener('click', closeModals);
closeButton.addEventListener('click', () => {
  const titleInput = document.getElementById('note-has-title');
  const descriptionInput = document.getElementById('note-has-description');
  titleInput.value = '';
  descriptionInput.value = '';
});
discardButton.addEventListener('click', closeModals);
discardButton.addEventListener('click', () => {
  const titleInput = document.getElementById('note-has-title');
  const descriptionInput = document.getElementById('note-has-description');
  titleInput.value = '';
  descriptionInput.value = '';
});

function closeModals() {
  const modal = document.getElementById('addnotesmodal');

  modal.style.display = 'none';
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
