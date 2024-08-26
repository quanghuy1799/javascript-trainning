document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  const inputs = form.querySelectorAll('input');

  // Real-time validation
  inputs.forEach((input) => {
    input.addEventListener('input', () => validateInput(input));
  });

  // Form submission event
  form.addEventListener('submit', function (event) {
    let isValid = true;
    inputs.forEach((input) => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });
    if (!isValid) {
      event.preventDefault();
    }
  });

  function validateInput(input) {
    const value = input.value.trim();
    let errorMessage = '';
    let isValid = true;

    switch (input.id) {
      case 'firstname':
      case 'lastname':
        if (value === '') {
          errorMessage = `${input.name} cannot be empty.`;
          isValid = false;
        } else if (value.length < 3) {
          errorMessage = `${input.name} must be at least 3 characters long.`;
          isValid = false;
        }
        break;

      case 'username':
        if (value.length < 3) {
          errorMessage = 'Username must be at least 3 characters long.';
          isValid = false;
        }
        break;

      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          errorMessage = 'Please enter a valid email address.';
          isValid = false;
        }
        break;

      case 'phonenumber':
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(value)) {
          errorMessage = 'Please enter a valid 10-digit phone number.';
          isValid = false;
        }
        break;

      case 'password':
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordPattern.test(value)) {
          errorMessage = 'Password must be at least 6 characters long, include one uppercase letter, one number, and one special character.';
          isValid = false;
        }
        break;

      case 'password2':
        const password = document.getElementById('password').value;
        if (value !== password) {
          errorMessage = 'Passwords do not match.';
          isValid = false;
        }
        break;

      case 'checkbox':
        if (!input.checked) {
          errorMessage = 'You must agree to the terms and policies.';
          isValid = false;
        }
        break;

      default:
        break;
    }

    setValidationState(input, isValid, errorMessage);
    return isValid;
  }

  function setValidationState(input, isValid, errorMessage) {
    const errorDiv = input.nextElementSibling;
    if (!isValid) {
      errorDiv.textContent = errorMessage;
      input.classList.add('error');
      input.classList.remove('valid');
    } else {
      errorDiv.textContent = '';
      input.classList.remove('error');
      input.classList.add('valid');
    }
  }
});
