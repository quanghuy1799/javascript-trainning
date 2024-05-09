 /* global document */

 import httpUtils from '../utils/httpUtils';
 import { renderAllNotes } from './getAndFilterNote';

 async function editNote(note) {
   try {
     await httpUtils.updateNote(note);
     showSnackbar('Note added successfully!', 'success');
   } catch (error) {
     showFormErrorMessage('Error adding note: ' + error.message);
   }
 }

 const noteTitleInput = document.getElementById('note-has-title');
 const noteDescriptionInput = document.getElementById('note-has-description');
 const addButton = document.getElementById('btn-n-add');
 const closeButton = document.querySelector('.modal-header .close');
 const discardButton = document.querySelector('.modal-footer .btn-danger');

 let selectedCategory = null;

 function checkbox(event) {
   const checkbox = event.target;
   const categoryId = checkbox.id;
   const categoryName = checkbox.getAttribute('data-category-name');

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

 const categoryBusinessCheckbox = document.getElementById('category-business');
 const categorySocialCheckbox = document.getElementById('category-social');
 const categoryTravelCheckbox = document.getElementById('category-travel');

 categoryBusinessCheckbox.addEventListener('click', checkbox);
 categorySocialCheckbox.addEventListener('click', checkbox);
 categoryTravelCheckbox.addEventListener('click', checkbox);

 async function editNoteAndRender() {
   const title = noteTitleInput.value.trim();
   const description = noteDescriptionInput.value.trim();

   if (title && description && selectedCategory) {
     const note = {
       title: title,
       description: description,
       category: selectedCategory,
     };

     try {
       await httpUtils.createNote(note);
       showSnackbar('Note added successfully!', 'success');
       await renderAllNotes();
       closePopup();
     } catch (error) {
       showFormErrorMessage('Error adding note: ' + error.message);
     }
   } else {
     showFormErrorMessage('Please fill out all fields and select a category.');
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

 function closePopup() {
   const modal = document.getElementById('addnotesmodal');
   modal.style.display = 'none';
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
     snackbarElement.className = `show ${type}`;
     setTimeout(() => {
       snackbarElement.className = snackbarElement.className.replace('show', '');
     }, 3000);
   }
 }

 const noteFullContainer = document.getElementById('note-full-container');
 noteFullContainer.addEventListener('click',editNoteAndRender );
const editButton = getElementById('edit-note')
editButton.addEventListener('click', editNoteAndRender);

 if (addNotesButton) {
  addNotesButton.addEventListener('click', () => {
    const addNotesModal = document.getElementById('addnotesmodal');
    if (addNotesModal) {
      addNotesModal.classList.add('show');
      addNotesModal.style.display = 'block';
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

 export { editNoteAndRender };
