'use strict'

//Truy vấn các phần tử html
const loginModal = document.getElementById('login-modal');
const mainContent = document.getElementById('main-content');
const welcomeMessage = document.getElementById('welcome-message');
const logoutBtn = document.getElementById('btn-logout');

//Lấy thông tin user đang đăng nhập từ khi login
let currentUser = JSON.parse(getFromStorage('currentUser')) || [];

//Nếu chưa đăng nhập, hiển thị giao diện login
if (currentUser.length === 0) {
  loginModal.classList.remove('d-none');
};

//Nếu đã đăng nhập, hiển thị lời chào và nút logout
if (currentUser.length > 0) {
  mainContent.classList.remove('d-none');
  welcomeMessage.textContent = `Welcome ${currentUser[1].toUpperCase()}!`;
};

//Nhấn logout thì xóa currentUser, hiện lại giao diện login
logoutBtn.addEventListener('click', function () {
  currentUser = [];
  saveToStorage('currentUser', JSON.stringify(currentUser));
  loginModal.classList.remove('d-none');
  mainContent.classList.add('d-none');
});






