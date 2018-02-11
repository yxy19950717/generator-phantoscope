import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Index from '../pages/index';
import Test from '../pages/test'; 

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Index}/>
          <Route path="/test" component={Test}/>
        </div>
      </BrowserRouter>
    );
  }
}
