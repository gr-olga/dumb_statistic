import React, {useEffect, useState} from 'react';
import styles from './App.module.scss';
import {WeeksCount} from './components/WeeksCount/WeeksCount';
import {UserForm} from './components/UserForm/UserForm';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './store';
import {setCountryData, TDemographicData} from './store/countryState';
import {AverageLifeData} from './components/AverageLifeData/AverageLifeData';
import {Footer} from './components/Footer/Footer';
import {getCountryData} from './api';

function App() {
  const dispatch = useDispatch();
  const currentDate = new Date();
  const baseExpectancyIntersex = 73;
  const [lifeExpectancy, setLifeExpectancy] = useState<number | void>(
      baseExpectancyIntersex
  );
  const userData = useSelector((state: RootState) => state.user.user);
  const userCountryId = useSelector(
      (state: RootState) => state.user.user.country.locID
  );
  const countryData = useSelector((state: RootState) => state.country);

  const [colorful, setColorful] = useState(false);
  const [start, setStart] = useState<boolean>(false);


  // const calculateLifeExpectancy = useCallback(
  //     (data: TDemographicData): number => {
  //       if (userData.sex === 'female') {
  //         return Math.round(data.lExFemale);
  //       } else if (userData.sex === 'male') {
  //         return Math.round(data.lExMale);
  //       } else if (userData.sex === 'neutral') {
  //         return Math.round(data.lEx);
  //       }
  //     }, [userCountryId, userData, countryData]);
  const calculateLifeExpectancy = (data: TDemographicData, sex: string): number | void => {
    if (!data) {
      console.log('Data is undefined or null');
      return;
    }
    if (sex === 'female') {
      return Math.round(data.lExFemale);
    } else if (sex === 'male') {
      return Math.round(data.lExMale);
    } else if (sex === 'neutral') {
      return Math.round(data.lEx);
    } else {
      console.log('Unknown sex type');
      return; // or return a default value if appropriate
    }
  };


  useEffect(() => {
    getCountryData(userCountryId).then((data) => {
      dispatch(setCountryData(data as TDemographicData));
    });
  }, [userCountryId, dispatch]);


  useEffect(() => {
    setLifeExpectancy(calculateLifeExpectancy(countryData, userData.sex));
  }, [userCountryId, countryData, userData]);


  console.log(22, userData.sex);
  console.log(22, userData);
  console.log(111, calculateLifeExpectancy(countryData, userData.sex));

  return (
      <>
        {!start && (
            <div className={styles.App_start}>
              <p>
                Fill your data and see how many weeks on your life you already spent
                and maybe there is still some left considering the average life
                expectancy in your country.
              </p>
              <button className={styles.info_button} onClick={() => setStart(true)}>
                Start
              </button>
            </div>
        )}
        {start && (
            <div className={styles.App}>
              <div className={styles.right_col}>
                <UserForm/>
                <h6>
                  Life expectancy in {userData.country.location} for{' '}
                  {userData.sex} is {lifeExpectancy}
                </h6>
                <div>
                  <p className={styles.weeks_count__info}>
                    Do you want to see the average steps in life?
                  </p>
                  <button
                      className={styles.info_button}
                      onClick={() => setColorful(true)}
                  >
                    Yes
                  </button>
                  {colorful && (
                      <button
                          className={styles.info_button}
                          onClick={() => setColorful(false)}
                      >
                        Hide
                      </button>
                  )}
                  {colorful && <AverageLifeData/>}
                </div>
              </div>
              <WeeksCount
                  birthData={userData.birthDate}
                  currentDate={currentDate}
                  lifeExpectancy={lifeExpectancy}
                  colorful={colorful}
                  name={userData.name}
              />
            </div>
        )}
        <Footer/>
      </>
  );
};

export default App;
