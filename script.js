const form = document.getElementById("form"),
  name = document.getElementById("name"),
  email = document.getElementById("email"),
  password = document.getElementById("password"),
  password2 = document.getElementById("password2");

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("span");
  small.innerText = message;
};

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

const checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getInputField(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getInputField(input)} must be more than ${min} charecters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getInputField(input)} must be less than ${max} charecters`
    );
  } else {
    showSuccess(input);
  }
};

const checkPasswordMatch = (input1, input2) => {
  if (input1.value === "") {
    showError(input2, "Please enter a password first");
  } else if (input1.value !== input2.value) {
    showError(input2, "Password donot match");
  } else {
    showSuccess(input2);
  }
};

const checkEmail = (input) => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "Email is not valid");
  }
};

const getInputField = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([name, email, password, password2]);
  checkLength(name, 3, 15);
  checkLength(password, 6, 15);
  checkPasswordMatch(password, password2);
  checkEmail(email);
});
