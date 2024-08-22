import React, {useEffect, useState} from 'react';
import './App.css';
import {WeeksCount} from './components/WeeksCount/WeeksCount';
import {UserForm} from './components/UserForm/UserForm';
import {useSelector} from 'react-redux';
import {RootState} from './store';


function App() {

  const currentDate = new Date();
  const lifeExpectancyForMen = 70;
  const lifeExpectancyForWomen = 75;
  const lifeExpectancyIntersex = 73;
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(lifeExpectancyIntersex);
  const userData = useSelector((state: RootState) => state.user);

  console.log('111', userData.user);

  useEffect(() => {
    setLifeExpectancy(userData.user.sex === 'male' ? lifeExpectancyForMen :
        userData.user.sex === 'female' ? lifeExpectancyForWomen : lifeExpectancyIntersex);
    console.log('222', userData.user.sex);
  }, [userData.user.sex, userData.user.name]);
  return (
      <div className="App">
        <UserForm/>
        <div>
          <p> Life expectancy for {userData.user.sex} = {lifeExpectancy}</p>
          <WeeksCount
              birthData={userData.user.birthDate}
              currentDate={currentDate}
              lifeExpectancy={lifeExpectancy}
          />
        </div>
      </div>
  );
}

export default App;
