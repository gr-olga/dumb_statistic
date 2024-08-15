import React from 'react';
import './App.css';
import {WeeksCount} from './components/WeeksCount/WeeksCount';


function App() {
  const birthDate = new Date('1994-03-15');
  const currentDate = new Date();
  return (
      <div className="App">
        <h1>WeeksCount</h1>
        <WeeksCount birthData={birthDate} currentDate={currentDate}/>
      </div>
  );
}

export default App;
