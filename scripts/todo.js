'use strict'

let currentUser = JSON.parse(getFromStorage('currentUser')) || [];
let todoArr = JSON.parse(getFromStorage('TODO_ARRAY')) || [];

const taskInput = document.getElementById('input-task');
const addTaskBtn = document.getElementById('btn-add');
const todoList = document.getElementById('todo-list');

function parseTask(taskData) {
  const task = new Task(taskData.id, taskData.taskName, taskData.owner, taskData.isDone);
  return task;
}

function clearAddTaskForm() {
  taskInput.value = '';
}

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
    console.log(newTask);
    todoArr.push(newTask);
    saveToStorage('TODO_ARRAY', JSON.stringify(todoArr));
    clearAddTaskForm();
    console.log(todoArr);
    renderTask(todoArr);
  }
})


const deleteTask = function (taskId) {
  const newTodoArr = todoArr.filter(task => task.id !== taskId);
  todoArr = newTodoArr;
  saveToStorage('TODO_ARRAY', JSON.stringify(todoArr));
  renderTask(todoArr);
};

const toggleTask = function (taskId) {
  const task = todoArr.find(task => task.id === taskId);
  task.isDone = !task.isDone;
  saveToStorage('TODO_ARRAY', JSON.stringify(todoArr));
  renderTask(todoArr);
};


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
      taskEl.addEventListener('click', () => toggleTask(task.id))
      taskEl.innerHTML = `${task.taskName}<span onclick="deleteTask(${task.id})" class="close">×</span>`;
      todoList.prepend(taskEl);
    }
  }
};

renderTask(todoArr);