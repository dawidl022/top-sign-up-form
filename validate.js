const form = document.querySelector("#sign-up-form")
const requiredInputs = document.querySelectorAll(".form input[required]");

const emailField = document.querySelector(".form input#email");
const passwordField = document.querySelector(".form input#password");
const passwordConfirmField = document.querySelector(".form input#password-confirm");

function checkEmpty(inputElement) {
  if (inputElement.value === "") {
    inputElement.classList.add("empty");
    setErrorMessage(inputElement, "This field is required");
  } else if (inputElement.classList.contains("empty")) {
    inputElement.classList.remove("empty");
    setErrorMessage(inputElement, "");
  }
}

function setErrorMessage(element, text, className = ".error-message") {
  element.parentElement.querySelector(className).textContent = text;
}

function validateEmail() {
  const emailEx = /^[^.](.*[^.])?@[^.-](.*[^.-])?(\.[^.-](.*[^.-])?)*$/i;
  if (!emailField.value.match(emailEx)) {
    emailField.classList.add("error");
    setErrorMessage(emailField, "Please provide a valid email");
  } else {
    emailField.classList.remove("error");
    setErrorMessage(emailField, "");
  }
}

function validatePasswordLength() {
  if (passwordField.value.length < 8) {
    passwordField.classList.add("error");
    passwordField.parentElement.querySelector(".message")
      .classList.add("error-color");
  } else {
    passwordField.classList.remove("error")
    passwordField.parentElement.querySelector(".message")
      .classList.remove("error-color")
  }

  if (passwordConfirmField.value) {
    validatePasswordEquality();
  }
}

function validatePasswordEquality() {
  debugger
  if (passwordConfirmField.value != passwordField.value) {
    passwordField.classList.add("error");
    passwordConfirmField.classList.add("error")
    setErrorMessage(passwordField, "Passwords do not match");
  } else {
    passwordField.classList.remove("error");
    passwordConfirmField.classList.remove("error");
    setErrorMessage(passwordField, "");
    validatePasswordLength();
  }
}

function validateForm() {
  validateEmail();
  validatePasswordEquality();
  requiredInputs.forEach(checkEmpty);
}

function addValidClassIfNoError(formControl) {
  if (!formControl.classList.contains("error")) {
    formControl.classList.add("valid");
  }
}

function applyInteractiveValidation(formControl, validationFunc) {
  formControl.addEventListener("blur", () => {
    validationFunc(formControl);
    addValidClassIfNoError(formControl);
  });

  formControl.addEventListener("keyup", () => {
    if (formControl.classList.contains("error")) {
      validationFunc(formControl);
      addValidClassIfNoError(formControl);
    }
  })
}

applyInteractiveValidation(emailField, validateEmail);
applyInteractiveValidation(passwordField, validatePasswordLength);
applyInteractiveValidation(passwordConfirmField, validatePasswordEquality);

requiredInputs.forEach(input => {
  applyInteractiveValidation(input, checkEmpty)
});

form.addEventListener("submit", e => {
  e.preventDefault();
  validateForm();
})

document.querySelectorAll(".form input:not([required])")
  .forEach(control => control.addEventListener("blur", () => {
    addValidClassIfNoError(control);
  }));
