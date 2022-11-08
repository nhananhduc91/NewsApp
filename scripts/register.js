'use strict'

const registerBtn = document.getElementById('btn-submit');
const firstNameInput = document.getElementById('input-firstname');
const lastNameInput = document.getElementById('input-lastname');
const userNameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const confirmPasswordInput = document.getElementById('input-password-confirm');

const userArr = JSON.parse(getFromStorage('USER_ARRAY')) || [];

function parseUser(userData) {
  const user = new User(userData.firstName, userData.lastName, userData.userName, userData.password);
  return user;
}

function clearRegisterForm() {
  firstNameInput.value = '';
  lastNameInput.value = '';
  userNameInput.value = '';
  passwordInput.value = '';
  confirmPasswordInput.value = '';
}

registerBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const newUser = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    userName: userNameInput.value,
    password: passwordInput.value
  }

  let checkValidate = true;
  if (newUser.firstName.trim() === '' ||
    newUser.lastName.trim() === '' ||
    newUser.userName.trim() === '' ||
    newUser.password.trim() === '' ||
    confirmPasswordInput.value.trim() === '') {
    alert('Input field must not be empty!')
    checkValidate = false;
  } else {
    for (const user of userArr) {
      if (user.userName === newUser.userName) {
        checkValidate = false;
        alert('Username already existed!')
      }
    };

    if (newUser.password.length < 8) {
      checkValidate = false;
      alert('Password field must be at least 8 characters!');
    } else {
      if (confirmPasswordInput.value !== newUser.password) {
        checkValidate = false;
        alert('Confirm password does not match!')
      };
    };

    if (checkValidate) {
      const user = parseUser(newUser);
      userArr.push(user);
      saveToStorage('USER_ARRAY', JSON.stringify(userArr));
      clearRegisterForm();
      alert('Register successfully!');
      window.location.href = '../pages/login.html';
    }
  }
});