/* global document */

import httpUtils from '../utils/httpUtils';
import { renderAllNotes } from './getAndFilterNote';
import { checkInputs, checkbox,setSelectedCategory } from './validation';

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
  const formData = new FormData(noteForm);
  const title = formData.get('title').trim();
  const description = formData.get('description').trim();
  const selectedCategory = getSelectedCategory();

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

        try {
          const response = await fetch(`https://66149e8d2fc47b4cf27c99bc.mockapi.io/notes/${selectedNoteId}`);
          const note = await response.json();

          noteTitleInput.value = note.title;
          noteDescriptionInput.value = note.description;
          categoryBusinessCheckbox.checked = note.category === 'business';
          categorySocialCheckbox.checked = note.category === 'social';
          categoryTravelCheckbox.checked = note.category === 'travel';
          setSelectedCategory(note.category ? `category-${note.category}` : null);

          const addNotesModal = document.getElementById('addnotesmodal');
          if (addNotesModal) {
            addNotesModal.style.display = 'block';
            saveButton.style.display = 'block';
            addButton.style.display = 'none';
          }

          clearErrorMessages(titleError, descriptionError, noteTitleInput, noteDescriptionInput);
          titleHasInteracted = false;
          descriptionHasInteracted = false;
          const formData = new FormData(noteForm);
          checkInputs(formData, titleError, descriptionError, noteTitleInput, noteDescriptionInput, saveButton);
        } catch (error) {
          alert('An error occurred while fetching the note: ' + error.message);
        }
      }
    });
  }
});

function closePopup() {
  const modal = document.getElementById('addnotesmodal');
  modal.style.display = 'none';
  clearErrorMessages(titleError, descriptionError, noteTitleInput, noteDescriptionInput);
  resetForm(noteForm);
  setSelectedCategory(null);
  titleHasInteracted = false;
  descriptionHasInteracted = false;
}

noteTitleInput.addEventListener('input', () => {
  titleHasInteracted = true;
  const formData = new FormData(noteForm);
  checkInputs(formData, titleError, descriptionError, noteTitleInput, noteDescriptionInput, saveButton);
});

noteDescriptionInput.addEventListener('input', () => {
  descriptionHasInteracted = true;
  const formData = new FormData(noteForm);
  checkInputs(formData, titleError, descriptionError, noteTitleInput, noteDescriptionInput, saveButton);
});

closeButton.addEventListener('click', closePopup);
discardButton.addEventListener('click', closePopup);

saveButton.addEventListener('click', editNote);
saveButton.setAttribute('disabled', 'disabled');

export { editNote };
