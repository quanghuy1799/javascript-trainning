document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const inputs = form.querySelectorAll('input');

  // Attach event listeners
  inputs.forEach(input => input.addEventListener('input', () => validateInput(input)));
  form.addEventListener('submit', handleSubmit);

  function handleSubmit(event) {
    let isFormValid = true;

    inputs.forEach(input => {
      if (!validateInput(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      event.preventDefault();
    }
  }

  function validateInput(input) {
    const value = input.value.trim();
    let errorMessage = '';

    if (isFieldEmpty(value)) {
      errorMessage = `${input.name} cannot be empty.`;
    } else {
      errorMessage = getFieldSpecificError(input, value);
    }

    const isValid = !errorMessage;
    setValidationState(input, isValid, errorMessage);
    return isValid;
  }

  function isFieldEmpty(value) {
    return value === '';
  }

  function getFieldSpecificError(input, value) {
    switch (input.id) {
      case 'firstname':
      case 'lastname':
        return value.length < 3 ? `${input.name} must be at least 3 characters long.` : '';
      case 'username':
        return value.length < 3 ? 'Username must be at least 3 characters long.' : '';
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Please enter a valid email address.' : '';
      case 'phonenumber':
        return !/^[0-9]{10}$/.test(value) ? 'Please enter a valid 10-digit phone number.' : '';
      case 'password':
        return !/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value)
          ? 'Password must be at least 6 characters long, include one uppercase letter, one number, and one special character.'
          : '';
      case 'password2':
        const password = document.getElementById('password').value;
        return value !== password ? 'Passwords do not match.' : '';
      case 'checkbox':
        return !input.checked ? 'You must agree to the terms and policies.' : '';
      default:
        return '';
    }
  }

  function setValidationState(input, isValid, errorMessage) {
    const errorDiv = input.nextElementSibling;

    errorDiv.textContent = errorMessage;
    input.classList.toggle('error', !isValid);
    input.classList.toggle('valid', isValid);
  }
});
