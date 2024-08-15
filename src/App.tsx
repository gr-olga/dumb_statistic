import React from 'react';
import './App.css';
import {WeeksCount} from './components/WeeksCount/WeeksCount';
import {UserForm} from './components/UserForm/UserForm';


function App() {
  const birthDate = new Date('1994-03-15');
  const currentDate = new Date();
  return (
      <div className="App">
        <UserForm/>
        <WeeksCount birthData={birthDate} currentDate={currentDate}/>
      </div>
  );
}

export default App;
