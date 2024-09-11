import React, {useCallback, useEffect, useState} from 'react';
import styles from './App.module.scss';
import {WeeksCount} from './components/WeeksCount/WeeksCount';
import {UserForm} from './components/UserForm/UserForm';
import {useSelector} from 'react-redux';
import {RootState} from './store';
import {getCountryData} from './api';
import {TDemographicData} from './store/countryState';
import {AverageLifeData} from './components/AverageLifeData/AverageLifeData';


function App() {

  const currentDate = new Date();
  const baseExpectancyIntersex = 73;
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(baseExpectancyIntersex);
  const userData = useSelector((state: RootState) => state.user);
  const userCountryId = useSelector((state: RootState) => state.user.user.country.locID);
  const [colorful, setColorful] = useState(false);

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
      <div className={styles.App}>
        <div className={styles.right_col}>
          <UserForm/>
          <div>
            <p className={styles.weeks_count__info}>Do you want to see the average steps in life?</p>
            <button className={styles.weeks_count__info_button}
                    onClick={() => setColorful(true)}>
              Yes
            </button>
            {colorful && (
                <button className={styles.weeks_count__info_button} onClick={() => setColorful(false)}>
                  Hide
                </button>
            )}
            {colorful && (
                <AverageLifeData/>
            )}
          </div>
        </div>
        <WeeksCount
            birthData={userData.user.birthDate}
            currentDate={currentDate}
            lifeExpectancy={lifeExpectancy}
            colorful={colorful}
        />
      </div>
  );
}

export default App;
