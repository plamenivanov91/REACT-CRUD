import React, { Component } from 'react';
import Board from './components/Board';
import Permissions from './permissions/Permissions';

class App extends Component {
  render() {
    return (
      <div>
        <Permissions />
        <Board />
      </div>
    );
  }
}

export default App;
