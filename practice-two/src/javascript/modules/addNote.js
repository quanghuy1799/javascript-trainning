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
      alert('Error adding note ');
    }
  }
}

function checkInputs() {
  const title = noteTitleInput.value.trim();
  const description = noteDescriptionInput.value.trim();

  if (!title || title.length > 20 || !description || !selectedCategory) {
    addButton.setAttribute('disabled', 'disabled');
  } else {
    addButton.removeAttribute('disabled');
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
    noteTitleInput.value = '';
    noteDescriptionInput.value = '';
    categoryBusinessCheckbox.checked = false;
    categorySocialCheckbox.checked = false;
    categoryTravelCheckbox.checked = false;
    selectedCategory = null;
  });
}

noteTitleInput.addEventListener('input', checkInputs);
noteDescriptionInput.addEventListener('input', checkInputs);

closeButton.addEventListener('click', () => {
  closePopup();
  noteTitleInput.value = '';
  noteDescriptionInput.value = '';
  categoryBusinessCheckbox.checked = false;
  categorySocialCheckbox.checked = false;
  categoryTravelCheckbox.checked = false;
  selectedCategory = null;
});

discardButton.addEventListener('click', () => {
  closePopup();
  noteTitleInput.value = '';
  noteDescriptionInput.value = '';
  categoryBusinessCheckbox.checked = false;
  categorySocialCheckbox.checked = false;
  categoryTravelCheckbox.checked = false;
  selectedCategory = null;
});

addButton.setAttribute('disabled', 'disabled');

export { addNoteAndRender };
