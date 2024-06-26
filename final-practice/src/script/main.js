const form = document.getElementById('form');

form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(form);
    validateInputs(formData);
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateInputs = formData => {
    const formElements = form.elements;

    const usernameValue = formData.get('username').trim();
    const emailValue = formData.get('email').trim();
    const passwordValue = formData.get('password').trim();
    const password2Value = formData.get('password2').trim();

    if (usernameValue === '') {
        setError(formElements['username'], 'Username is required');
    } else {
        setSuccess(formElements['username']);
    }

    if (emailValue === '') {
        setError(formElements['email'], 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(formElements['email'], 'Provide a valid email address');
    } else {
        setSuccess(formElements['email']);
    }

    if (passwordValue === '') {
        setError(formElements['password'], 'Password is required');
    } else if (passwordValue.length < 8) {
        setError(formElements['password'], 'Password must be at least 8 characters.');
    } else {
        setSuccess(formElements['password']);
    }

    if (password2Value === '') {
        setError(formElements['password2'], 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(formElements['password2'], "Passwords don't match");
    } else {
        setSuccess(formElements['password2']);
    }
};
