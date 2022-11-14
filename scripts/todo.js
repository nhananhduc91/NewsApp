'use strict'

//Lấy thông tin user hiện tại và list todo của user đó
let currentUser = JSON.parse(getFromStorage('currentUser')) || [];
let todoArr = JSON.parse(getFromStorage('TODO_ARRAY')) || [];

//Truy vấn các phần từ html
const taskInput = document.getElementById('input-task');
const addTaskBtn = document.getElementById('btn-add');
const todoList = document.getElementById('todo-list');

function parseTask(taskData) {
  const task = new Task(taskData.id, taskData.taskName, taskData.owner, taskData.isDone);
  return task;
}

//Hàm reset form thêm task
function clearAddTaskForm() {
  taskInput.value = '';
}

//Hàm thêm task
addTaskBtn.addEventListener('click', function () {
  const taskData = {
    id: Date.now(),
    taskName: taskInput.value,
    owner: currentUser[2],
    isDone: false
  }
  let checkValidate = true;
  if (taskInput.value.trim() === '') {
    checkValidate = false;
    alert('Task input must not be empty!')
  }

  if (checkValidate) {
    const newTask = parseTask(taskData);
    todoArr.push(newTask);
    saveToStorage('TODO_ARRAY', JSON.stringify(todoArr));
    clearAddTaskForm();
    renderTask(todoArr);
  }
})

//Hàm xóa task và lưu vào local
const deleteTask = function (taskId) {
  const newTodoArr = todoArr.filter(task => task.id !== taskId);
  todoArr = newTodoArr;
  saveToStorage('TODO_ARRAY', JSON.stringify(todoArr));
  renderTask(todoArr);
};

//Hàm chuyển đã làm và chưa làm, sau đó lưu vào local
const toggleTask = function (taskId) {
  const task = todoArr.find(task => task.id === taskId);
  task.isDone = !task.isDone;
  saveToStorage('TODO_ARRAY', JSON.stringify(todoArr));
  renderTask(todoArr);
};

//Render các task dựa vào dữ liệu đã làm hay chưa
function renderTask(todoArr) {
  todoList.innerHTML = '';
  for (const task of todoArr) {
    if (task.owner === currentUser[2]) {
      const taskEl = document.createElement('li');
      if (task.isDone) {
        taskEl.classList.add('checked');
      } else {
        taskEl.classList.remove('checked');
      }
      taskEl.innerHTML = `<p class="task-name mb-0" onclick = "toggleTask(${task.id})">${task.taskName}</p>
      <span onclick="deleteTask(${task.id})" class="close">×</span>`;
      todoList.prepend(taskEl);
    }
  }
};

//Gọi hàm lúc mới load
renderTask(todoArr);