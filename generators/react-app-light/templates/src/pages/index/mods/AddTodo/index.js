import React, { Component, PropTypes } from 'react';
import styles from './index.less';

export default class AddTodo extends Component {
  render() {
    return (
      <div className={styles.AddTodoWrap}>
        <input className={styles.inputWrap} type='text' ref='input' placeholder='please input' />
        <button className={styles.buttonWrap} onClick={(e) => this.handleClick(e)}>
          Add
        </button>
      </div>
    );
  }

  handleClick(e) {
    const node = this.refs.input;
    const text = node.value.trim();
    this.props.onAddClick({
      text,
      completed: false
    });
    node.value = '';
  }
};