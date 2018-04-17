import * as React from 'react';
import './App.css';
const io = require('socket.io-client');
const socket = io('http://localhost:8080');

class App extends React.Component {

  componentWillMount() {
    
    socket.emit('test', {foo: 'bar'});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header"/>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
