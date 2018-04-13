import {observable, action, computed} from 'mobx';

export default class TodoStore {
  @observable todoList = [];
  @observable filterSignal = 'SHOW_ALL';

  @action changeSignal(signal) {
    this.filterSignal = signal;
  }
  @action addTodo(todo) {
    this.todoList = [todo].concat(...this.todoList);
  }
  @action removeTodo(index) {
    this.todoList.splice(index, 1);
  }

  @computed get todo() {
    switch(this.filterSignal) {
      case 'SHOW_ALL':
        return this.todoList;
        break;
      case 'SHOW_COMPLETED':
        return this.todoList.filter((todo) => todo.completed);
        break;
      case 'SHOW_ACTIVE':
        return this.todoList.filter((todo) => !todo.completed);
    }
  }
}