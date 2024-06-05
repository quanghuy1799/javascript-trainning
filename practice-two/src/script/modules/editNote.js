/* global document */

import httpUtils from '../utils/httpUtils';
import { renderAllNotes } from './getAndFilterNote';

const noteTitleInput = document.getElementById('note-has-title');
const noteDescriptionInput = document.getElementById('note-has-description');
const saveButton = document.getElementById('btn-n-save');
const addButton = document.getElementById('btn-n-add');
const closeButton = document.querySelector('.modal-header .close');
const discardButton = document.querySelector('.modal-footer .btn-danger');
const noteForm = document.getElementById('addnotesmodalTitle');

const categoryBusinessCheckbox = document.getElementById('category-business');
const categorySocialCheckbox = document.getElementById('category-social');
const categoryTravelCheckbox = document.getElementById('category-travel');

const titleError = document.getElementById('title-error');
const descriptionError = document.getElementById('description-error');

categoryBusinessCheckbox.addEventListener('click', checkbox);
categorySocialCheckbox.addEventListener('click', checkbox);
categoryTravelCheckbox.addEventListener('click', checkbox);

let selectedNoteId = null;

let titleHasInteracted = false;
let descriptionHasInteracted = false;

async function editNote() {
  const title = noteTitleInput.value.trim();
  const description = noteDescriptionInput.value.trim();

  if (title && description && selectedCategory) {
    let category = '';

    switch (selectedCategory) {
      case 'category-business':
        category = 'business';
        break;
      case 'category-social':
        category = 'social';
        break;
      case 'category-travel':
        category = 'travel';
        break;
      default:
        break;
    }

    const note = {
      title: title,
      description: description,
      category: category,
    };

    try {
      await httpUtils.updateNote(selectedNoteId, note);
      await renderAllNotes();
      alert('Note updated successfully!');
      closePopup();
    } catch (error) {
      alert('An error occurred while updating the note: ' + error.message);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const noteFullContainer = document.getElementById('note-full-container');
  if (noteFullContainer) {
    noteFullContainer.addEventListener('click', async function (event) {
      if (event.target.classList.contains('edit-note')) {
        selectedNoteId = event.target.dataset.id;

        // Fetch note data based on selectedNoteId
        try {
          const response = await fetch(`https://66149e8d2fc47b4cf27c99bc.mockapi.io/notes/${selectedNoteId}`);
          const note = await response.json();

          // Set the values in the modal
          noteTitleInput.value = note.title;
          noteDescriptionInput.value = note.description;
          categoryBusinessCheckbox.checked = note.category === 'business';
          categorySocialCheckbox.checked = note.category === 'social';
          categoryTravelCheckbox.checked = note.category === 'travel';
          selectedCategory = note.category ? `category-${note.category}` : null;

          const addNotesModal = document.getElementById('addnotesmodal');
          if (addNotesModal) {
            addNotesModal.style.display = 'block';
            saveButton.style.display = 'block';
            addButton.style.display = 'none';
          }

          clearErrorMessages();
          titleHasInteracted = false;
          descriptionHasInteracted = false;
          checkInputs();
        } catch (error) {
          alert('An error occurred while fetching the note: ' + error.message);
        }
      }
    });
  }
});

function checkInputs() {
  const title = noteTitleInput.value.trim();
  const description = noteDescriptionInput.value.trim();

  let isValid = true;

  if (!title) {
    if (titleHasInteracted) {
      titleError.textContent = 'Title is required';
      titleError.style.display = 'block';
      noteTitleInput.classList.add('error-input');
    }
    isValid = false;
  } else if (title.length > 20) {
    if (titleHasInteracted) {
      titleError.textContent = 'Title cannot be longer than 20 characters';
      titleError.style.display = 'block';
      noteTitleInput.classList.add('error-input');
    }
    isValid = false;
  } else {
    titleError.style.display = 'none';
    noteTitleInput.classList.remove('error-input');
  }

  if (!description) {
    if (descriptionHasInteracted) {
      descriptionError.textContent = 'Description is required';
      descriptionError.style.display = 'block';
      noteDescriptionInput.classList.add('error-input');
    }
    isValid = false;
  } else {
    descriptionError.style.display = 'none';
    noteDescriptionInput.classList.remove('error-input');
  }

  if (!selectedCategory) {
    isValid = false;
  }

  if (isValid) {
    saveButton.removeAttribute('disabled');
  } else {
    saveButton.setAttribute('disabled', 'disabled');
  }
}

noteTitleInput.addEventListener('input', () => {
  titleHasInteracted = true;
  checkInputs();
});

noteDescriptionInput.addEventListener('input', () => {
  descriptionHasInteracted = true;
  checkInputs();
});

let selectedCategory = null;

function checkbox(event) {
  const checkbox = event.target;
  const categoryId = checkbox.id;

  if (checkbox.checked) {
    if (selectedCategory && selectedCategory !== categoryId) {
      const prevCheckbox = document.getElementById(selectedCategory);
      if (prevCheckbox) {
        prevCheckbox.checked = false;
      }
    }
    selectedCategory = categoryId;
  } else {
    selectedCategory = null;
  }

  checkInputs();
}

function closePopup() {
  const modal = document.getElementById('addnotesmodal');
  modal.style.display = 'none';
  clearErrorMessages();
  noteForm.reset(); // Reset the form
}

function clearErrorMessages() {
  titleError.style.display = 'none';
  descriptionError.style.display = 'none';
  noteTitleInput.classList.remove('error-input');
  noteDescriptionInput.classList.remove('error-input');
}

closeButton.addEventListener('click', () => {
  closePopup();
  noteForm.reset(); // Reset the form
  selectedCategory = null;
  titleHasInteracted = false;
  descriptionHasInteracted = false;
});

discardButton.addEventListener('click', () => {
  closePopup();
  noteForm.reset(); // Reset the form
  selectedCategory = null;
  titleHasInteracted = false;
  descriptionHasInteracted = false;
});

saveButton.addEventListener('click', editNote);
saveButton.setAttribute('disabled', 'disabled');

export { editNote };