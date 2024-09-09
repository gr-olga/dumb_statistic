import React, {useEffect, useState} from 'react';
import './App.css';
import {WeeksCount} from './components/WeeksCount/WeeksCount';
import {UserForm} from './components/UserForm/UserForm';
import {useSelector} from 'react-redux';
import {RootState} from './store';
import {getCountryData} from './api';


function App() {

  const currentDate = new Date();
  const baseExpectancyIntersex = 73;
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(baseExpectancyIntersex);
  const userData = useSelector((state: RootState) => state.user);
  const userCountryId = useSelector((state: RootState) => state.user.user.country.locID);

  console.log('111', userCountryId);

  useEffect(() => {
    // getCountryData(userCountryId).then((data) => {
    getCountryData().then((data) => {
          console.log('res', data);
          if (userData.sex === 'female') {
            setLifeExpectancy(Math.round(data.lExFemale));
          } else if (userData.sex === 'male') {
            setLifeExpectancy(Math.round(data.lExMale));
          } else if (userData.sex === 'neutral') {
            setLifeExpectancy(Math.round(data.lEx));
          }
        }
    );
  }, [userCountryId]);

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
