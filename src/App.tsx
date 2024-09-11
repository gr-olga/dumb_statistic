import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import {WeeksCount} from './components/WeeksCount/WeeksCount';
import {UserForm} from './components/UserForm/UserForm';
import {useSelector} from 'react-redux';
import {RootState} from './store';
import {getCountryData} from './api';
import {TDemographicData} from './store/countryState';


function App() {

  const currentDate = new Date();
  const baseExpectancyIntersex = 73;
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(baseExpectancyIntersex);
  const userData = useSelector((state: RootState) => state.user);
  const userCountryId = useSelector((state: RootState) => state.user.user.country.locID);

  console.log('111', userCountryId);

  const countryId = 8;
  const getMemoizedCountryData = useCallback(async (countryId: number) => {
    const data = await getCountryData(countryId);
    return data;
  }, []);
  const calculateLifeExpectancy = useCallback(
      (data: TDemographicData): number | null => {
        if (!data) return null;
        if (userData.sex === 'female') {
          return Math.round(data.lExFemale);
        } else if (userData.sex === 'male') {
          return Math.round(data.lExMale);
        } else if (userData.sex === 'neutral') {
          return Math.round(data.lEx);
        }
        return null;
      }, [userData.sex]);

  useEffect(() => {
    if (userCountryId) {
      getMemoizedCountryData(userCountryId).then((data) => {
        const calculatedLifeExpectancy = calculateLifeExpectancy(data as TDemographicData);
        if (calculatedLifeExpectancy !== null) {
          setLifeExpectancy(calculatedLifeExpectancy);
        }
      });
    }
  }, [userCountryId, calculateLifeExpectancy, getMemoizedCountryData]);

  return (
      <div className="App">
        <UserForm/>
        <div>
          <p> Life expectancy for {userData.user.sex} in {userData.user.country.location} = {lifeExpectancy}</p>
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
