'use strict'

//Kiểm tra xem đã tồn tại mảng user trong local hay chưa, nếu chưa có thì gán là mảng rỗng
const userArr = JSON.parse(getFromStorage('USER_ARRAY')) || [];

//Truy vấn các phần tử html
const userNameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const loginBtn = document.getElementById('btn-submit');

//Hàm reset form sau khi đăng nhập
function clearRegisterForm() {
  userNameInput.value = '';
  passwordInput.value = '';
};

//Nút submit
loginBtn.addEventListener('click', function (e) {
  e.preventDefault();
  let checkValidate = true;
  //Kiểm tra input đầu vào không được để trống và pass phải điền đủ 8 ký tự
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
      //Kiểm tra nếu login thành công, chuyển hướng sang trang chủ, lưu user login vào chỉ 1 user đang đăng nhập
      if (user.userName === userNameInput.value.trim()
        && user.password === passwordInput.value.trim()) {
        checkUser = true;
        let currentUser = [user.firstName, user.lastName, user.userName];
        saveToStorage('currentUser', JSON.stringify(currentUser));
        alert('Login successfully!');
        window.location.href = '../index.html';
      };
    };

    //Trường hợp sai user name hoặc password
    if (!checkUser) {
      alert('Wrong user name or password or regist a new user!')
    };
  };
});