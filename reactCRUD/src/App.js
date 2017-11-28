import React, { Component } from 'react';
import logo from './logo.svg';
import Form from './components/Form';
import Board from './components/Board';

class App extends Component {
  render() {
    return (
      <div>
      <Form />
      <Board />
      </div>
    );
  }
}

export default App;
