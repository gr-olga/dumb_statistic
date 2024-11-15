import React, {useEffect, useState} from 'react';
import {TUserSex, updateUserData} from '../../store/userState';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import styles from './userForm.module.scss';
import {getCountryList, TCountry} from '../../api';

export const UserForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user);
  const [name, setName] = useState<string>(currentUser.name);
  const [birthDate, setBirthDate] = useState<number>(currentUser.birthDate);
  const [sex, setSex] = useState<TUserSex>(currentUser.sex);
  const [country, setCountry] = useState<TCountry>(currentUser.country);
  const [countriesList, setCountriesList] = useState<Array<TCountry> | null>(
      null
  );

  useEffect(() => {
    async function fetchCountries() {
      const storedCountries = localStorage.getItem('countriesList');

      if (storedCountries) {
        setCountriesList(JSON.parse(storedCountries));
      } else {
        const data = await getCountryList();
        setCountriesList(data);
        localStorage.setItem('countriesList', JSON.stringify(data));
      }
    }
    fetchCountries();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedUser = {
      name,
      birthDate,
      sex,
      country
    };

    dispatch(updateUserData(updatedUser));
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const locID = Number(event.target.value);
    const chosenCountry = countriesList?.find(
        (country) => country.locID === locID
    );
    if (chosenCountry) {
      setCountry(chosenCountry);
    }
  };

  return (
      <div className={styles.user_form}>
        <h1>Enter your data</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="country">Country</label>
          <select id="country" onChange={handleCountryChange}>
            <option value="">Select a country</option>
            {countriesList &&
                countriesList.map((item) => (
                    <option key={item.locID} value={item.locID}>
                      {item.location}
                    </option>
                ))}
          </select>
          <label htmlFor="username">Name</label>
          <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="birthDate">Birth Date</label>
          <input
              id="birthDate"
              type="date"
              // value={birthDate}
              onChange={(e) => setBirthDate(new Date(e.target.value).getTime())}
          />
          <label htmlFor="sex">Sex</label>
          <select
              id="sex"
              value={sex}
              onChange={(e) => {
                setSex(e.target.value as TUserSex);
              }}
          >
            <option value="">Select a sex</option>
            <option value="female">&#x2640;</option>
            <option value="male">&#x2642;</option>
            <option value="neutral">&#x26A5; &#x25B3;</option>
          </select>
          <button>Submit</button>
        </form>
      </div>
  );
};
