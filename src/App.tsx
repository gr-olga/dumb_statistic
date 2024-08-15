import React from 'react';
import './App.css';
import {WeeksCount} from './components/WeeksCount/WeeksCount';

function WeeksCountProps(props: { age: number }) {
  return null;
}

function App() {
  return (
      <div className="App">
        <h1>WeeksCount</h1>
        <WeeksCount age={30}/>
      </div>
  );
}

export default App;
