'use strict'

const loginModal = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');
const welcomeMessage = document.getElementById('welcome-message');
const logoutBtn = document.getElementById('btn-logout');

let currentUser = JSON.parse(getFromStorage('currentUser')) || [];
if (currentUser.length === 0) {
  loginModal.classList.remove('d-none');
};

if (currentUser.length > 0) {
  mainContent.classList.remove('d-none');
  welcomeMessage.textContent = `Welcome ${currentUser[1].toUpperCase()}!`;
};

logoutBtn.addEventListener('click', function () {
  currentUser = [];
  saveToStorage('currentUser', JSON.stringify(currentUser));
  loginModal.classList.remove('d-none');
  mainContent.classList.add('d-none');
});






