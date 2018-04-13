import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {injext, observer, inject} from 'mobx-react';
import styles from './index.less';
import AddTodo from './mods/AddTodo';
import TodoList from './mods/TodoList';
import Footer from './mods/Footer';

@inject('todoStore')
@observer
class Index extends Component {
  render() {
    const {todoStore} = this.props;
    return (
      <div className={styles.container}>
        <Link className={styles.linkHover} to="/">index</Link>
        <Link className={styles.link} to="/test">test_hover</Link>
        <div className={styles.todoWrap}>
          <AddTodo
            onAddClick={(item) => {
              todoStore.addTodo(item);
            }}
          />
          <TodoList
            todos={todoStore.todo}
            onTodoClick={(index) => {
              todoStore.removeTodo(index);
            }}
          />
          <Footer
            onFilterChange={(signal) => {
              todoStore.changeSignal(signal);
            }}
          />
        </div>
      </div>
    );
    return null;
  }
}

export default Index;