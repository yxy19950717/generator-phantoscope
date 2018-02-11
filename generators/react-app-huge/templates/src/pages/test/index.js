import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from './index.less';

class Test extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Link className={styles.link} to="/">index</Link>
        <Link className={styles.linkHover} to="/test">test_hover</Link>
      </div>
    );
  }
}


export default Test;

