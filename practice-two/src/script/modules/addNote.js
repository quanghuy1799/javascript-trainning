/* global document */
import httpUtils from '../utils/httpUtils';
import { renderAllNotes } from './getAndFilterNote';
import { checkInputs, checkbox, setSelectedCategory } from './validation';

const noteTitleInput = document.getElementById('note-has-title');
const noteDescriptionInput = document.getElementById('note-has-description');
const addButton = document.getElementById('btn-n-add');
const addNotesButton = document.getElementById('add-notes');
const closeButton = document.querySelector('.modal-header .close');
const discardButton = document.querySelector('.modal-footer .btn-danger');
const saveButton = document.getElementById('btn-n-save');
const noteForm = document.getElementById('addnotesmodalTitle');

const categoryBusinessCheckbox = document.getElementById('category-business');
const categorySocialCheckbox = document.getElementById('category-social');
const categoryTravelCheckbox = document.getElementById('category-travel');

categoryBusinessCheckbox.addEventListener('click', checkbox);
categorySocialCheckbox.addEventListener('click', checkbox);
categoryTravelCheckbox.addEventListener('click', checkbox);

async function addNoteAndRender() {
  const formData = new FormData(noteForm);
  const title = formData.get('title').trim();
  const description = formData.get('description').trim();

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

function closePopup() {
  const modal = document.getElementById('addnotesmodal');
  modal.style.display = 'none';
  noteForm.reset();
  setSelectedCategory(null);
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
    setSelectedCategory(null);
  });
}

noteTitleInput.addEventListener('input', () => {
  const formData = new FormData(noteForm);
  checkInputs(formData);
});
noteDescriptionInput.addEventListener('input', () => {
  const formData = new FormData(noteForm);
  checkInputs(formData);
});

closeButton.addEventListener('click', closePopup);
discardButton.addEventListener('click', closePopup);

addButton.setAttribute('disabled', 'disabled');

export { addNoteAndRender };
