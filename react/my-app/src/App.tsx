import * as React from 'react';
import './App.css';
import {  Lab } from './lab';


/*
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
*/
class App extends React.Component {


  render() {
    return (
      <div className="App">
        <header className="App-header" />
        <Lab url='http://localhost:8080'/>
      </div>
    );
  }
}

export default App;
