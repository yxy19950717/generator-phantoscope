import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from './index.less';
import { addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters } from '../../actions/_todo_action';
import AddTodo from './mods/AddTodo';
import TodoList from './mods/TodoList';
import Footer from './mods/Footer'
import {connect} from 'react-redux';

class Index extends Component {
  render() {
    const {dispatch, visibleTodos, visibilityFilter} = this.props;
    return (
      <div className={styles.container}>
        <Link className={styles.linkHover} to="/">index</Link>
        <Link className={styles.link} to="/test">test_hover</Link>
        <div className={styles.todoWrap}>
          <AddTodo
            onAddClick={(text) => {
              dispatch(addTodo(text));
            }} 
          />
          <TodoList
            todos={visibleTodos}
            onTodoClick={(index) => {
              dispatch(toggleTodo(index));
            }} 
          />
          <Footer
            filter={visibilityFilter}
            onFilterChange={(nextFilter) => {
              dispatch(setVisibilityFilter(nextFilter));
            }}
          />
        </div>
      </div>
    );
  }
}

let selectTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter((todo) => {
        return todo.completed;
      });
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter((todo) => {
        return !todo.completed;
      });
  }
};

let select = (state) => {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter
  };
};

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(Index);