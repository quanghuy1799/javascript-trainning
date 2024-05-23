/* global document */
import httpUtils from '../utils/httpUtils';
import { renderAllNotes } from './getAndFilterNote';

const noteTitleInput = document.getElementById('note-has-title');
const noteDescriptionInput = document.getElementById('note-has-description');
const addButton = document.getElementById('btn-n-add');
const addNotesButton = document.getElementById('add-notes');
const closeButton = document.querySelector('.modal-header .close');
const discardButton = document.querySelector('.modal-footer .btn-danger');
const saveButton = document.getElementById('btn-n-save');
const noteForm = document.getElementById('addnotesmodalTitle');

const titleError = document.getElementById('title-error');
const descriptionError = document.getElementById('description-error');

const categoryBusinessCheckbox = document.getElementById('category-business');
const categorySocialCheckbox = document.getElementById('category-social');
const categoryTravelCheckbox = document.getElementById('category-travel');

categoryBusinessCheckbox.addEventListener('click', checkbox);
categorySocialCheckbox.addEventListener('click', checkbox);
categoryTravelCheckbox.addEventListener('click', checkbox);

async function addNoteAndRender() {
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
      await httpUtils.createNote(note);
      alert('Note added successfully!');
      await renderAllNotes();
      closePopup();
    } catch (error) {
      alert('Error adding note');
    }
  }
}

function checkInputs() {
  const title = noteTitleInput.value.trim();
  const description = noteDescriptionInput.value.trim();

  let isValid = true;

  if (!title) {
    titleError.textContent = 'Title is required';
    titleError.style.display = 'block';
    noteTitleInput.classList.add('error-input');
    isValid = false;
  } else if (title.length > 20) {
    titleError.textContent = 'Title cannot be longer than 20 characters';
    titleError.style.display = 'block';
    noteTitleInput.classList.add('error-input');
    isValid = false;
  } else {
    titleError.style.display = 'none';
    noteTitleInput.classList.remove('error-input');
  }

  if (!description) {
    descriptionError.textContent = 'Description is required';
    descriptionError.style.display = 'block';
    noteDescriptionInput.classList.add('error-input');
    isValid = false;
  } else {
    descriptionError.style.display = 'none';
    noteDescriptionInput.classList.remove('error-input');
  }

  if (!selectedCategory) {
    isValid = false;
  }

  if (isValid) {
    addButton.removeAttribute('disabled');
  } else {
    addButton.setAttribute('disabled', 'disabled');
  }
}

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
}

function closePopup() {
  const modal = document.getElementById('addnotesmodal');
  modal.style.display = 'none';
  noteForm.reset();
  selectedCategory = null;
}

addButton.addEventListener('click', addNoteAndRender);
if (addNotesButton) {
  addNotesButton.addEventListener('click', () => {
    const addNotesModal = document.getElementById('addnotesmodal');
    if (addNotesModal) {
      addNotesModal.style.display = 'block';
      addButton.style.display = 'block';
      saveButton.style.display = 'none';
    }
    noteForm.reset();
    selectedCategory = null;
  });
}

noteTitleInput.addEventListener('input', checkInputs);
noteDescriptionInput.addEventListener('input', checkInputs);

closeButton.addEventListener('click', closePopup);
discardButton.addEventListener('click', closePopup);

addButton.setAttribute('disabled', 'disabled');

export { addNoteAndRender };
