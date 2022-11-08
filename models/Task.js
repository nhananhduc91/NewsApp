'use strict'
class Task {
  constructor(id, taskName, owner, isDone) {
    this.id = Date.now();
    this.taskName = taskName;
    this.owner = owner;
    this.isDone = isDone;
  };
};