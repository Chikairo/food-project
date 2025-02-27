
function checkError() {
  const nameInput = document.querySelector(".name");
  const emailInput = document.querySelector(".email");
  const passwordInput = document.querySelector(".password");

  const nameError = document.querySelector(".name-error");
  const emailError = document.querySelector(".email-error");
  const passwordError = document.querySelector(".password-error");

  const emailValidation = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  nameInput.classList.remove("error");
  emailInput.classList.remove("error");
  passwordInput.classList.remove("error");
  nameError.textContent = "";
  emailError.textContent = "";
  passwordError.textContent = "";

  let isValid = true;

  // Validate Name
  if (nameInput.value === "") {
    nameInput.classList.add("error");
    nameError.textContent = "Name is required";
    isValid = false;
  }

  // Validate Email
  if (emailInput.value === "") {
    emailInput.classList.add("error");
    emailError.textContent = "Email is required";
    isValid = false;
  } else if (!emailValidation.test(emailInput.value)) {
    emailInput.classList.add("error");
    emailError.textContent = "Invalid email format";
    isValid = false;
  }

  // Validate Password
  if (passwordInput.value === "") {
    passwordInput.classList.add("error");
    passwordError.textContent = "Password is required";
    isValid = false;
  } else if (passwordInput.value.length < 4) {
    passwordInput.classList.add("error");
    passwordError.textContent = "Password is too short (min 4 characters)";
    isValid = false;
  } else if (passwordInput.value.length > 10) {
    passwordInput.classList.add("error");
    passwordError.textContent = "Password is too long (max 10 characters)";
    isValid = false;
  }

  return isValid;
}

const button = document.querySelector(".finish");

const orderMessage = document.querySelector(".order");

button.addEventListener("click", (e) => {
  e.preventDefault();

  if (checkError()) {
    orderMessage.classList.remove("success");

    setTimeout(() => {
      orderMessage.classList.add("slide-out-top");
    }, 3000);

    setTimeout(() => {
      orderMessage.classList.add("success");
      orderMessage.classList.remove("slide-out-top");
    }, 3500);


    e.target.form.reset();
  }
  
});
