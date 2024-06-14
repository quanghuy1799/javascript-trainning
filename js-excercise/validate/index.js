function toString(value) {
    return value ? "true" : "false";
}

function validateRequiredValue(value, errorMessage) {
    if (value === '' || value === undefined || value === null) {
        return errorMessage;
    }
    return undefined;
}

function validateEmail(value) {
    const re = /^(([^<>()[\\\]\\.,;:\s@"]+(\.[^<>()[\\\]\\.,;:\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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

const signUpValidationFnSchema = {
    username: [
        { fn: value => validateRequiredValue(value, 'Username is required') }
    ],
    email: [
        { fn: value => validateRequiredValue(value, 'Email is required') },
        { fn: validateEmail }
    ],
    password: [
        { fn: value => validateRequiredValue(value, 'Password is required') },
        { fn: validatePassword }
    ],
    confirmPassword: [
        { fn: value => validateRequiredValue(value, 'Please confirm your password') },
        { fn: (value, formData) => validateConfirmPassword(value, formData, 'password') }
    ]
}

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

document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    const errors = validateForm(data, signUpValidationFnSchema);

    const inputControls = this.querySelectorAll('.input-control');
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
