const form = document.querySelector("#sign-up-form")
const requiredInputs = document.querySelectorAll(".form input[required]");
const emailField = document.querySelector(".form input#email");
const passwordField = document.querySelector(".form input#password");
const passwordConfirmField = document.querySelector(".form input#password-confirm");

function checkEmpty(inputElement) {
  if (inputElement.value === "") {
    inputElement.classList.add("empty");
    inputElement.parentElement.querySelector(".error-message").textContent = "This field is required";
  } else if (inputElement.classList.contains("empty")) {
    inputElement.classList.remove("empty");
    inputElement.parentElement.querySelector(".error-message").textContent = "";
  }
}

function validateEmail() {
  const emailEx = /^[^.](.*[^.])?@[^.-](.*[^.-])?(\.[^.-](.*[^.-])?)*$/i;
  if (!emailField.value.match(emailEx)) {
    emailField.classList.add("error");
    emailField.parentElement.querySelector(".error-message").textContent = "Please provide a valid email"
  } else {
    emailField.classList.remove("error");
    emailField.parentElement.querySelector(".error-message").textContent = ""
  }
}

function validatePasswordLength() {
  if (passwordField.value.length < 8) {
    passwordField.classList.add("error");
    passwordField.parentElement.querySelector(".message").classList.add("error-color")
  } else {
    passwordField.classList.remove("error")
    passwordField.parentElement.querySelector(".message").classList.remove("error-color")
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
    passwordField.parentElement.querySelector(".error-message").textContent = "Passwords do not match"
  } else {
    passwordField.classList.remove("error");
    passwordConfirmField.classList.remove("error");
    passwordField.parentElement.querySelector(".error-message").textContent = "";
    validatePasswordLength();
  }
}

function validateForm() {
  validateEmail();
  validatePasswords();
  requiredInputs.forEach(checkEmpty);
}

function applyInteractiveValidation(formControl, validationFunc) {
  formControl.addEventListener("blur", () => {
    validationFunc(formControl);
  });

  formControl.addEventListener("keyup", () => {
    if (formControl.classList.contains("error")) {
      validationFunc(formControl);
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
