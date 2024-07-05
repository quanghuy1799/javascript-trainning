document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('form').addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());
      data.checkbox = this.querySelector('input[name="checkbox"]').checked; // handle checkbox

      const errors = validateForm(data, signUpValidationFnSchema);

      const inputControls = this.querySelectorAll('.input-control, .handle-checkbox');
      inputControls.forEach(inputControl => {
          const errorDisplay = inputControl.querySelector('.error');
          errorDisplay.innerText = '';
          inputControl.classList.remove('error', 'success');
      });

      for (const field in errors) {
          const inputElement = this.querySelector(`[name="${field}"]`);
          if (inputElement) {
              setError(inputElement, errors[field]);
          }
      }

      if (Object.keys(errors).length === 0) {
          inputControls.forEach(inputControl => {
              inputControl.classList.add('success');
          });
          console.log("Form submitted successfully");
      }
  });
});

function validateRequiredValue(value, errorMessage) {
  if (value === '' || value === undefined || value === null) {
      return errorMessage;
  }
  return undefined;
}

function validateEmail(value) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!re.test(String(value).toLowerCase())) {
      return 'Invalid email address';
  }
  return undefined;
}

function validatePassword(password) {
  if (password.length < 8) {
      return 'Password must be at least 8 characters long';
  }
  return undefined;
}

function validateConfirmPassword(confirmPassword, formData, targetField) {
  if (confirmPassword !== formData[targetField]) {
      return "Passwords don't match";
  }
  return undefined;
}

function validatePhoneNumber(phoneNumber) {
  const re = /^[0-9]{10}$/;
  if (!re.test(phoneNumber)) {
      return 'Invalid phone number';
  }
  return undefined;
}

function validateCheckbox(checked) {
  if (!checked) {
      return 'You must agree to the terms and policies';
  }
  return undefined;
}

const signUpValidationFnSchema = {
  firstname: [
      { fn: value => validateRequiredValue(value, 'First name is required') }
  ],
  lastname: [
      { fn: value => validateRequiredValue(value, 'Last name is required') }
  ],
  birthday: [
      { fn: value => validateRequiredValue(value, 'Date of birth is required') }
  ],
  username: [
      { fn: value => validateRequiredValue(value, 'Username is required') }
  ],
  email: [
      { fn: value => validateRequiredValue(value, 'Email is required') },
      { fn: validateEmail }
  ],
  phonenumber: [
      { fn: value => validateRequiredValue(value, 'Phone number is required') },
      { fn: validatePhoneNumber }
  ],
  password: [
      { fn: value => validateRequiredValue(value, 'Password is required') },
      { fn: validatePassword }
  ],
  confirmPassword: [
      { fn: value => validateRequiredValue(value, 'Please confirm your password') },
      { fn: (value, formData) => validateConfirmPassword(value, formData, 'password') }
  ],
  checkbox: [
      { fn: value => validateRequiredValue(value, 'You must agree to the terms and policies') },
      { fn: validateCheckbox}
  ]
};

function setError(element, message) {
  if (!element) return;
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = message;
  inputControl.classList.add('error');
  inputControl.classList.remove('success');
}

function setSuccess(element) {
  if (!element) return;
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');

  errorDisplay.innerText = '';
  inputControl.classList.add('success');
  inputControl.classList.remove('error');
}

function validateForm(formData, validationFnSchema) {
  const errors = {};

  for (const field in validationFnSchema) {
      const validationFns = validationFnSchema[field];
      for (const { fn } of validationFns) {
          const error = fn(formData[field], formData);
          if (error) {
              errors[field] = error;
              break;
          }
      }
  }

  return errors;
}
