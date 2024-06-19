// validation.js

const addButton = document.getElementById('btn-n-add');
let selectedCategory = null;

function isFormValid(formData) {
  const title = formData.get('title').trim();
  const description = formData.get('description').trim();

  let isValid = true;

  if (!isTextInputValid('title', title, 20)) {
    isValid = false;
  }

  if (!isTextInputValid('description', description)) {
    isValid = false;
  }

  if (!isCategorySelected()) {
    isValid = false;
  }

  toggleButton(isValid);

  return isValid;
}

function isTextInputValid(field, value, maxLength = null) {
  if (!value) {
    showError(`${field}-error`, `${capitalize(field)} is required`);
    return false;
  } else if (maxLength && value.length > maxLength) {
    showError(
      `${field}-error`,
      `${capitalize(field)} cannot be longer than ${maxLength} characters`,
    );
    return false;
  } else {
    hideError(`${field}-error`);
    return true;
  }
}

function isCategorySelected() {
  if (!selectedCategory) {
    showError('category-error', 'Category is required');
    return false;
  } else {
    hideError('category-error');
    return true;
  }
}

function toggleButton(isValid) {
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
  const inputElement = document.getElementById(
    `note-has-${errorId.split('-')[0]}`,
  );
  inputElement.classList.add('error-input');
}

function hideError(errorId) {
  const errorElement = document.getElementById(errorId);
  errorElement.style.display = 'none';
  const inputElement = document.getElementById(
    `note-has-${errorId.split('-')[0]}`,
  );
  inputElement.classList.remove('error-input');
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export { isFormValid };
