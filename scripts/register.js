'use strict'

//Truy vấn các phần tử html
const registerBtn = document.getElementById('btn-submit');
const firstNameInput = document.getElementById('input-firstname');
const lastNameInput = document.getElementById('input-lastname');
const userNameInput = document.getElementById('input-username');
const passwordInput = document.getElementById('input-password');
const confirmPasswordInput = document.getElementById('input-password-confirm');

//Kiểm tra xem đã tồn tại mảng user trong local hay chưa, nếu chưa có thì gán là mảng rỗng
const userArr = JSON.parse(getFromStorage('USER_ARRAY')) || [];

//Hàm dùng để parse dữ liệu user thành 1 instance
function parseUser(userData) {
  const user = new User(userData.firstName, userData.lastName, userData.userName, userData.password);
  return user;
}

//Hàm reset form sau khi đăng ký
function clearRegisterForm() {
  firstNameInput.value = '';
  lastNameInput.value = '';
  userNameInput.value = '';
  passwordInput.value = '';
  confirmPasswordInput.value = '';
}

//Nút submit
registerBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const newUser = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    userName: userNameInput.value,
    password: passwordInput.value
  }

  //Validate các input người dùng đăng ký
  let checkValidate = true;
  if (newUser.firstName.trim() === '' ||
    newUser.lastName.trim() === '' ||
    newUser.userName.trim() === '' ||
    newUser.password.trim() === '' ||
    confirmPasswordInput.value.trim() === '') {
    alert('Input field must not be empty!')
    checkValidate = false;
  } else {
    //Nếu user đã tồn tại, thông báo trùng tên user
    for (const user of userArr) {
      if (user.userName === newUser.userName) {
        checkValidate = false;
        alert('Username already existed!')
      }
    };

    //Kiểm tra password phải đủ 8 ký tự
    if (newUser.password.length < 8) {
      checkValidate = false;
      alert('Password field must be at least 8 characters!');
    } else {
      if (confirmPasswordInput.value !== newUser.password) {
        checkValidate = false;
        alert('Confirm password does not match!')
      };
    };

    //Sau khi validate ok thì parse dữ liệu user, đẩy user vào mảng local, reset form, thông báo đăng ký thành công và chuyển sang trang login
    if (checkValidate) {
      const user = parseUser(newUser);
      userArr.push(user);
      saveToStorage('USER_ARRAY', JSON.stringify(userArr));
      clearRegisterForm();
      alert('Register successfully!');
      window.location.href = '../pages/login.html';
    };
  };
});