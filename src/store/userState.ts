import {createSlice, PayloadAction, Slice} from '@reduxjs/toolkit';
import {TCountry} from '../api';

export type TUserSex = 'female' | 'male' | 'neutral';

export interface UserState {
  user: {
    name: string;
    birthDate: number;
    sex: TUserSex;
    country: TCountry
  };
}

const initialState: UserState = {
  user: {
    name: 'Mohammed',
    birthDate: new Date(1994, 5, 14).getTime(),
    sex: 'female',
    country: {
      'locID': 8,
      'location': 'Albania',
      'iso2Code': 'AL',
      'iso3Code': 'ALB'
    }
  }
};

const userSlice: Slice<UserState> = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserData(state, action: PayloadAction<UserState['user']>) {
      state.user = action.payload;
    }
  }
});


export const {updateUserData} = userSlice.actions;
export default userSlice.reducer;