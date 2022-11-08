'use strict'

const userArr = JSON.parse(getFromStorage('USER_ARRAY')) || [];

const userNameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const loginBtn = document.getElementById('btn-submit');

function clearRegisterForm() {
  userNameInput.value = '';
  passwordInput.value = '';
};

loginBtn.addEventListener('click', function (e) {
  e.preventDefault();
  let checkValidate = true;
  if (userNameInput.value.trim() === '' || passwordInput.value.trim() === '') {
    checkValidate = false;
    alert('Input field must not be empty!');
  } else {
    if (passwordInput.value.length < 8) {
      checkValidate = false;
      alert('Password field must be at least 8 characters!');
    };
  };

  if (checkValidate) {
    let checkUser = false;
    for (const user of userArr) {
      if (user.userName === userNameInput.value.trim()
        && user.password === passwordInput.value.trim()) {
        checkUser = true;
        let currentUser = [user.firstName, user.lastName, user.userName];
        saveToStorage('currentUser', JSON.stringify(currentUser));
        alert('Login successfully!');
        window.location.href = '../index.html';
      };
    };

    if (!checkUser) {
      alert('Wrong user name or password!')
    };
  };
});