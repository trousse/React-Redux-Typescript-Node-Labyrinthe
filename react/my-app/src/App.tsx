import * as React from 'react';
import './App.css';
import { Icoor, GoOnCaseData } from './EventInterfaces';

const io = require('socket.io-client'); 
var socket = io('http://localhost:8080');

socket.on('asigned', (room: string) => {
  console.log(room);
  socket = io('http://localhost:8080/' + room);
  socket.on('gridChange', (grid: string[][]) => {
    let affichage = grid.map( (element) => element.toString())
                        .reduce( (str, Case) => str += '\n' + Case ) ;
    console.log(affichage);
  });

  console.log('in game');
  let last: Icoor = { x: 4, y: 5 };
  let next: Icoor = { x: 6, y: 7 };
  let data: GoOnCaseData = { caseFrom: last, caseTo: next };
  socket.emit('goOnCase', data);
});

class App extends React.Component {

  componentWillMount() {
    
    setTimeout( () => socket.emit('wait') , 4000);
   
  }

  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
