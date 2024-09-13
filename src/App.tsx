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
  const [start, setStart] = useState<boolean>(false);

  console.log('start', start);

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
      <>
        {!start && (
            <div className={styles.App_start}>
              <p>Fill your data and see how many weeks on your life you already spent and maybe there is still some left
                considering the average life expectancy in your country</p>
              <button
                  className={styles.info_button}
                  onClick={() => setStart(true)}
              >Start
              </button>
            </div>
        )}
        {start && (
            <div className={styles.App}>
              <div className={styles.right_col}>
                <UserForm/>
                <h6>Life expectancy in {userData.user.country.location} for {userData.user.sex} is {lifeExpectancy}</h6>
                <div>
                  <p className={styles.weeks_count__info}>Do you want to see the average steps in life?</p>
                  <button className={styles.info_button}
                          onClick={() => setColorful(true)}>
                    Yes
                  </button>
                  {colorful && (
                      <button className={styles.info_button} onClick={() => setColorful(false)}>
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
        )}
      </>
  );
}

export default App;
