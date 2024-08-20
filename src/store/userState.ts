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
  }
});


export const {updateUserData} = userSlice.actions;
export default userSlice.reducer;