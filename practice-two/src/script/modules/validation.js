// validation.js

const addButton = document.getElementById('btn-n-add');
let selectedCategory = null;

function checkInputs(formData) {
  const title = formData.get('title').trim();
  const description = formData.get('description').trim();

  let isValid = true;

  if (!title) {
    showError('title-error', 'Title is required');
    isValid = false;
  } else if (title.length > 20) {
    showError('title-error', 'Title cannot be longer than 20 characters');
    isValid = false;
  } else {
    hideError('title-error');
  }

  if (!description) {
    showError('description-error', 'Description is required');
    isValid = false;
  } else {
    hideError('description-error');
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

function showError(errorId, message) {
  const errorElement = document.getElementById(errorId);
  errorElement.textContent = message;
  errorElement.style.display = 'block';
  const inputElement = document.getElementById(`note-has-${errorId.split('-')[0]}`);
  inputElement.classList.add('error-input');
}

function hideError(errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.style.display = 'none';
  const inputElement = document.getElementById(`note-has-${errorId.split('-')[0]}`);
  inputElement.classList.remove('error-input');
}

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

function setSelectedCategory(category) {
  selectedCategory = category;
}

export { checkInputs, checkbox, setSelectedCategory };
