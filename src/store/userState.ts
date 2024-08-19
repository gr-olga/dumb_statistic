import {createSlice, PayloadAction, Slice} from '@reduxjs/toolkit';

export type TUserSex = 'female' | 'male' | 'neutral';
export type TEyesColor =
    'Blue'
    | 'Brown'
    | 'Green'
    | 'Hazel'
    | 'Amber'
    | 'Gray'
    | 'Red and violet'
    | 'Two different colors';
export type THairColor =
    'Blond'
    | 'Dark blond'
    | 'Medium brown'
    | 'Dark brown'
    | 'Black'
    | 'Reddish-brow'
    | 'Red'
    | 'Gray'
    | 'White'
    | 'I don\'t really remember'
    | 'Bold';

export interface UserState {
  user: {
    name: string;
    birthDate: number;
    sex: TUserSex;
    weight: number;
    height: number;
    eyesColor: TEyesColor;
    hairColor: THairColor;
    hobby: string
  };
}

const initialState: UserState = {
  user: {
    name: 'Mohammed',
    birthDate: new Date(1994, 5, 14).getTime(),
    sex: 'neutral',
    weight: 64,
    height: 165,
    eyesColor: 'Brown',
    hairColor: 'Black',
    hobby: 'reading'
  }
};

const userSlice: Slice<UserState> = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserData(state, action: PayloadAction<UserState['user']>) {
      state.user = action.payload;
    }
    // changeName(state, action: PayloadAction<string>) {
    //   state.user.name = action.payload;
    // },
    // changeBirthDate(state, action: PayloadAction<Date>) {
    //   state.user.birthDate = action.payload;
    // },
    // changeSex(state, action: PayloadAction<TUserSex>) {
    //   state.user.sex = action.payload;
    // },
    // changeWeight(state, action: PayloadAction<number>) {
    //   state.user.weight = action.payload;
    // },
    // changeHeight(state, action: PayloadAction<number>) {
    //   state.user.height = action.payload;
    // },
    // changeEyesColor(state, action: PayloadAction<TEyesColor>) {
    //   state.user.eyesColor = action.payload;
    // },
    // changeHairColor(state, action: PayloadAction<THairColor>) {
    //   state.user.hairColor = action.payload;
    // },
    // changeHobby(state, action: PayloadAction<string>) {
    //   state.user.hobby = action.payload;
    // }
  }
});


export const {updateUserData,changeName, changeBirthDate, changeSex, changeWeight, changeHeight, changeEyesColor,changeHairColor,  changeHobby} = userSlice.actions;
export default userSlice.reducer;