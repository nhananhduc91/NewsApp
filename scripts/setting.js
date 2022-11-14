'use strict'

//Truy vấn các phần tử html
const pageSizeInput = document.getElementById('input-page-size');
const categoryInput = document.getElementById('input-category');
const saveSettingsBtn = document.getElementById('btn-submit');

//Lấy thông tin user đang đăng nhập từ khi login
let currentUser = JSON.parse(getFromStorage('currentUser')) || [];

saveSettingsBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const settings = {
    newsPerPage: pageSizeInput.value,
    newsCategory: categoryInput.value,
    owner: currentUser[2]
  }
  let checkValidate = true;
  if (pageSizeInput.value.trim() === '') {
    checkValidate = false;
    alert('Please input news per page!')
  }
  if (checkValidate) {
    let userSettings = [];
    userSettings.push(settings);
    saveToStorage('userSettings', JSON.stringify(userSettings));
    window.location.href = '../pages/news.html'
  }
})