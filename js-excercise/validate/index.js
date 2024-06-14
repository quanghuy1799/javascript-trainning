function validateRequiredValue(value) {
    if (value === '' || value === undefined || value === null) {
        return 'This field is required';
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

function validateConfirmPassword(field) {
    return (confirmPassword, formData) => {
        if (confirmPassword !== formData[field]) {
            return "Passwords don't match";
        }
        return undefined;
    }
}

const signUpValidationFnSchema = {
    username: [validateRequiredValue],
    email: [validateRequiredValue, validateEmail],
    password: [validateRequiredValue, validatePassword],
    confirmPassword: [validateRequiredValue, validateConfirmPassword('password')],
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
        for (const validateFn of validationFns) {
            const error = field === 'confirmPassword'
                ? validateFn(formData[field], formData)
                : validateFn(formData[field]);
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
