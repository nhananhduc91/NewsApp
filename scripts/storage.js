'use strict'

//Lưu dữ liệu vào local
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
};

//Lấy dữ liệu từ local
function getFromStorage(key) {
  return localStorage.getItem(key);
};