import React, {useState} from 'react';
import {TEyesColor, THairColor, TUserSex, updateUserData, UserState} from '../../store/userState';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import styles from './userForm.module.scss';


export const UserForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user);
  const [name, setName] = useState<string>(currentUser.name);
  const [birthDate, setBirthDate] = useState<number>(currentUser.birthDate);
  const [sex, setSex] = useState<TUserSex>('female');
  const [weight, setWeight] = useState<number>(currentUser.weight);
  const [height, setHeight] = useState<number>(currentUser.height);
  const [eyesColor, setEyesColor] = useState<TEyesColor>(currentUser.eyesColor);
  const [hairColor, setHairColor] = useState<THairColor>(currentUser.hairColor);
  const [hobby, setHobby] = useState<string>(currentUser.hobby);
  const [country, setCountry] = useState<string>('Netherlands');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedUser = {
      name,
      birthDate,
      sex,
      weight,
      height,
      eyesColor,
      hairColor,
      hobby
    };

    dispatch(updateUserData(updatedUser));

    console.log('user', updatedUser);
  };

  return (
      <div className={styles.user_form}>
        <h1>UserForm</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="country">Country</label>
          <input id="country"
          type="text"
                 value={country}
                  onChange={(e) => setCountry(e.target.value)}
          ></input>
          <label htmlFor="username">Name</label>
          <input id="name"
                 type="text"
                 value={name}
                 onChange={(e) => setName(e.target.value)}/>
          <label htmlFor="birthDate">Birth Date</label>
          <input id="birthDate"
                 type="date"
              // value={birthDate}
                 onChange={(e) => setBirthDate(new Date(e.target.value).getTime())}/>
          <label htmlFor="sex">Sex</label>
          <select id="sex"
                  value={sex}
                  onChange={(e) => {
                    setSex(e.target.value as TUserSex);
                  }}>
            <option value="female">&#x2640;</option>
            <option value="male">&#x2642;</option>
            <option value="neutral">&#x26A5;  &#x25B3;</option>
          </select>
          <label htmlFor="weight">Weight</label>
          <input id="weight"
                 type="number"
                 value={weight}
                 onChange={(e) => setWeight(Number(e.target.value))}/>
          <label htmlFor="height">Height on cm</label>
          <input id="height"
                 type="number"
                 value={height}
                 onChange={(e) => setHeight(Number(e.target.value))}/>
          <label htmlFor="eyesColor">Eyes Color</label>
          <select id="eyesColor"
                  value={eyesColor}
                  onChange={(e) => setEyesColor(e.target.value as TEyesColor)}>
            <option value="Blue">Blue</option>
            <option value="Brown">Brown</option>
            <option value="Green">Green</option>
            <option value="Hazel">Hazel</option>
            <option value="Amber">Amber</option>
            <option value="Gray">Gray</option>
            <option value="Red and violet">Red and violet</option>
            <option value="Two different color">Two different colors</option>
          </select>
          <label htmlFor="hairColor">Hair Color</label>
          <select id="hairColor"
                  value={hairColor}
                  onChange={(e) => setHairColor(e.target.value as THairColor)}>
            <option value="Blond">Blond</option>
            <option value="Dark blond">Dark blond</option>
            <option value="Medium brown">Medium brown</option>
            <option value="Dark brown">Dark brown</option>
            <option value="Black">Black</option>
            <option value="Reddish-brow">Reddish-brow</option>
            <option value="Red">Red</option>
            <option value="Gray">Gray</option>
            <option value="White">White</option>
            <option value="I don't really remember">I don't really remember</option>
            <option value="Bold">Bold</option>
          </select>
          <label htmlFor="hobby">Hobby</label>
          <input id="hobby"
                 type="text"
                 value={hobby}
                 onChange={(e) => setHobby(e.target.value)}/>
          <button>Submit</button>
        </form>
      </div>
  );
};