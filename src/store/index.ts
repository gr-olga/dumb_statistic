import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import userReducer from "./userState";
import countryReducer from "./countryState";

const store: EnhancedStore = configureStore({
  reducer: {
    user: userReducer,
    country: countryReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
