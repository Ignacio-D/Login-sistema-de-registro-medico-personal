// UTILIDADES Y FUNCIONES

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function isValidPassword(password) {
  const isLongEnough = password.length >= 6;
  const hasUpperCase = /[A-Z]/.test(password);
  return { isLongEnough, hasUpperCase };
}

function saveUserToLocalStorage(user) {
  const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  users.push(user);
  localStorage.setItem("registeredUsers", JSON.stringify(users));
}

function checkCredentials(email, password) {
  const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  return users.find(
    (user) => user.email === email && user.password === password
  );
}

// FUNCIÓN PARA EL BOTÓN DE MOSTRAR/OCULTAR CONTRASEÑA
function setupPasswordToggle(buttonId) {
  // Escucha el clic en el documento
  document.addEventListener("click", function (event) {
    // Verifica si el elemento clickeado o su padre es un botón de mostrar/ocultar
    const clickedButton = event.target.closest("button[data-target]");

    if (clickedButton) {
      // Obtenemos el ID del campo de contraseña (del atributo data-target)
      const passwordFieldId = clickedButton.getAttribute("data-target");
      const passwordField = document.getElementById(passwordFieldId);
      const icon = clickedButton.querySelector("i");

      if (passwordField && icon) {
        if (passwordField.type === "password") {
          passwordField.type = "text";

          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        } else {
          passwordField.type = "password";

          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        }
      }
    }
  });
}

// Llamar a la función al inicio de la ejecución del script
setupPasswordToggle();

//LOGIN

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  const inputEmail = document.getElementById("inputEmail");
  const inputPassword = document.getElementById("inputPassword");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  function resetLoginErrors() {
    emailError.textContent = "";
    passwordError.textContent = "";
    inputEmail.classList.remove("is-invalid");
    inputPassword.classList.remove("is-invalid");
  }

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    resetLoginErrors();

    let isValid = true;
    const email = inputEmail.value.trim();
    const password = inputPassword.value.trim();

    // Validación de campos
    if (email === "") {
      emailError.textContent = "El correo electrónico es obligatorio.";
      inputEmail.classList.add("is-invalid");
      isValid = false;
    } else if (!isValidEmail(email)) {
      emailError.textContent = "Introduce un formato de correo válido.";
      inputEmail.classList.add("is-invalid");
      isValid = false;
    }

    if (password === "") {
      passwordError.textContent = "La contraseña es obligatoria.";
      inputPassword.classList.add("is-invalid");
      isValid = false;
    }

    if (isValid) {
      const userFound = checkCredentials(email, password);

      if (userFound) {
        window.location.href = "loginApprove.html";
      } else {
        emailError.textContent =
          "Credenciales inválidas. El usuario o contraseña no coinciden.";
        inputEmail.classList.add("is-invalid");
      }
    }
  });
}

//REGISTRO

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  const inputFullName = document.getElementById("inputFullName");
  const inputEmailReg = document.getElementById("inputEmailReg");
  const inputPasswordReg = document.getElementById("inputPasswordReg");
  const inputConfirmPassword = document.getElementById("inputConfirmPassword");
  const inputBirthdate = document.getElementById("inputBirthdate");
  const inputSecurityQuestion = document.getElementById(
    "inputSecurityQuestion"
  );
  const inputSecurityAnswer = document.getElementById("inputSecurityAnswer");

  const fullNameError = document.getElementById("fullNameError");
  const emailRegError = document.getElementById("emailRegError");
  const passwordRegError = document.getElementById("passwordRegError");
  const confirmPasswordError = document.getElementById("confirmPasswordError");
  const birthdateError = document.getElementById("birthdateError");
  const sexoError = document.getElementById("sexoError");
  const questionError = document.getElementById("questionError");
  const answerError = document.getElementById("answerError");

  function resetRegisterErrors() {
    document
      .querySelectorAll(".text-danger")
      .forEach((el) => (el.textContent = ""));
    document
      .querySelectorAll(".form-control")
      .forEach((el) => el.classList.remove("is-invalid"));
    const securityQ = document.getElementById("inputSecurityQuestion");
    if (securityQ) securityQ.classList.remove("is-invalid");
  }

  registerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    resetRegisterErrors();

    let isValid = true;

    const fullName = inputFullName.value.trim();
    const email = inputEmailReg.value.trim();
    const password = inputPasswordReg.value;
    const confirmPassword = inputConfirmPassword.value;
    const birthdate = inputBirthdate.value;
    const selectedSex = document.querySelector(
      'input[name="sexoOptions"]:checked'
    );
    const securityQuestion = inputSecurityQuestion.value;
    const securityAnswer = inputSecurityAnswer.value.trim();

    //VALIDACION
    if (fullName === "") {
      fullNameError.textContent = "El nombre es obligatorio.";
      inputFullName.classList.add("is-invalid");
      isValid = false;
    }

    if (email === "") {
      emailRegError.textContent = "El correo electrónico es obligatorio.";
      inputEmailReg.classList.add("is-invalid");
      isValid = false;
    } else if (!isValidEmail(email)) {
      emailRegError.textContent = "Introduce un formato de correo válido.";
      inputEmailReg.classList.add("is-invalid");
      isValid = false;
    }

    const passValidation = isValidPassword(password);
    if (password === "") {
      passwordRegError.textContent = "La contraseña es obligatoria.";
      inputPasswordReg.classList.add("is-invalid");
      isValid = false;
    } else if (!passValidation.isLongEnough || !passValidation.hasUpperCase) {
      passwordRegError.textContent =
        "Debe tener al menos 6 caracteres y 1 mayúscula.";
      inputPasswordReg.classList.add("is-invalid");
      isValid = false;
    }

    if (confirmPassword === "") {
      confirmPasswordError.textContent = "Debes confirmar la contraseña.";
      inputConfirmPassword.classList.add("is-invalid");
      isValid = false;
    } else if (password !== confirmPassword) {
      confirmPasswordError.textContent = "Las contraseñas no coinciden.";
      inputConfirmPassword.classList.add("is-invalid");
      isValid = false;
    }

    if (birthdate === "") {
      birthdateError.textContent = "La fecha de nacimiento es obligatoria.";
      inputBirthdate.classList.add("is-invalid");
      isValid = false;
    }

    if (!selectedSex) {
      sexoError.textContent = "Debes seleccionar una opción de sexo.";
      isValid = false;
    }

    if (securityQuestion === "") {
      questionError.textContent =
        "Debes seleccionar una pregunta de seguridad.";
      inputSecurityQuestion.classList.add("is-invalid");
      isValid = false;
    }

    if (securityAnswer === "") {
      answerError.textContent = "La respuesta secreta es obligatoria.";
      inputSecurityAnswer.classList.add("is-invalid");
      isValid = false;
    }

    if (isValid) {
      const newUser = {
        fullName: fullName,
        email: email,
        password: password,
        birthdate: birthdate,
        sex: selectedSex ? selectedSex.value : "N/A",
        securityQuestion: securityQuestion,
        securityAnswer: securityAnswer,
      };

      saveUserToLocalStorage(newUser);
      window.location.href = "login.html";
    }
  });
}

//RECUPERACION CONTRASEÑA

const recoveryForm = document.getElementById("recoveryForm");

if (recoveryForm) {
  const inputRecoveryEmail = document.getElementById("inputRecoveryEmail");
  const emailRecoveryError = document.getElementById("emailRecoveryError");

  recoveryForm.addEventListener("submit", function (event) {
    event.preventDefault();

    emailRecoveryError.textContent = "";
    inputRecoveryEmail.classList.remove("is-invalid");

    const email = inputRecoveryEmail.value.trim();
    let isValid = true;

    if (email === "" || !isValidEmail(email)) {
      emailRecoveryError.textContent = "Introduce un formato de correo válido.";
      inputRecoveryEmail.classList.add("is-invalid");
      isValid = false;
    }

    if (isValid) {
      const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
      const userFound = users.find((user) => user.email === email);

      if (userFound) {
        sessionStorage.setItem("recoveryEmail", email);
        window.location.href = "question.html";
      } else {
        emailRecoveryError.textContent =
          "Este correo no está asociado a ninguna cuenta.";
        inputRecoveryEmail.classList.add("is-invalid");
      }
    }
  });
}

//VALIDACIÓN DE IDENTIDAD

const questionForm = document.getElementById("questionForm");

if (questionForm) {
  const recoveryEmail = sessionStorage.getItem("recoveryEmail");
  const displayedQuestion = document.getElementById("displayedQuestion");
  const inputAnswer = document.getElementById("inputSecurityAnswerRecovery");
  const answerError = document.getElementById("answerRecoveryError");

  if (!recoveryEmail) {
    window.location.href = "recoverPassword.html";
  }

  const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  const userToRecover = users.find((user) => user.email === recoveryEmail);

  if (!userToRecover) {
    window.location.href = "recoverPassword.html";
  }

  if (displayedQuestion && userToRecover) {
    displayedQuestion.textContent = userToRecover.securityQuestion;
  }

  questionForm.addEventListener("submit", function (event) {
    event.preventDefault();
    answerError.textContent = "";
    inputAnswer.classList.remove("is-invalid");

    const submittedAnswer = inputAnswer.value.trim();
    let isValid = true;

    if (submittedAnswer === "") {
      answerError.textContent = "La respuesta es obligatoria.";
      inputAnswer.classList.add("is-invalid");
      isValid = false;
    }

    if (isValid) {
      if (
        submittedAnswer.toLowerCase() ===
        userToRecover.securityAnswer.toLowerCase()
      ) {
        sessionStorage.setItem("recoverySuccess", "true");
        window.location.href = "newPassword.html";
      } else {
        answerError.textContent = "Respuesta incorrecta. Inténtalo de nuevo.";
        inputAnswer.classList.add("is-invalid");
      }
    }
  });
}

//CAMBIO DE CONTRASEÑA (newPassword.html)

const newPasswordForm = document.getElementById("newPasswordForm");

if (newPasswordForm) {
  const recoveryEmail = sessionStorage.getItem("recoveryEmail");
  const recoverySuccess = sessionStorage.getItem("recoverySuccess");

  if (!recoveryEmail || recoverySuccess !== "true") {
    alert(
      "Acceso denegado. Por favor, inicia el proceso de recuperación desde el principio."
    );
    window.location.href = "recoverPassword.html";
  }

  const inputNewPassword = document.getElementById("inputNewPassword");
  const inputConfirmNewPassword = document.getElementById(
    "inputConfirmNewPassword"
  );
  const newPasswordError = document.getElementById("newPasswordError");
  const confirmNewPasswordError = document.getElementById(
    "confirmNewPasswordError"
  );

  newPasswordForm.addEventListener("submit", function (event) {
    event.preventDefault();

    newPasswordError.textContent = "";
    confirmNewPasswordError.textContent = "";
    inputNewPassword.classList.remove("is-invalid");
    inputConfirmNewPassword.classList.remove("is-invalid");

    const newPassword = inputNewPassword.value;
    const confirmPassword = inputConfirmNewPassword.value;
    let isValid = true;

    const passValidation = isValidPassword(newPassword);

    if (newPassword === "") {
      newPasswordError.textContent = "La nueva contraseña es obligatoria.";
      inputNewPassword.classList.add("is-invalid");
      isValid = false;
    } else if (!passValidation.isLongEnough || !passValidation.hasUpperCase) {
      newPasswordError.textContent =
        "Debe tener al menos 6 caracteres y 1 mayúscula.";
      inputNewPassword.classList.add("is-invalid");
      isValid = false;
    }

    if (confirmPassword === "") {
      confirmNewPasswordError.textContent = "Debes confirmar la contraseña.";
      inputConfirmNewPassword.classList.add("is-invalid");
      isValid = false;
    } else if (newPassword !== confirmPassword) {
      confirmNewPasswordError.textContent = "Las contraseñas no coinciden.";
      inputConfirmNewPassword.classList.add("is-invalid");
      isValid = false;
    }

    if (isValid) {
      const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];

      const userIndex = users.findIndex((user) => user.email === recoveryEmail);

      if (userIndex !== -1) {
        users[userIndex].password = newPassword;

        localStorage.setItem("registeredUsers", JSON.stringify(users));

        sessionStorage.removeItem("recoveryEmail");
        sessionStorage.removeItem("recoverySuccess");

        window.location.href = "login.html";
      }
    }
  });
}
