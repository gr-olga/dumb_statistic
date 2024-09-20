import { configureStore, EnhancedStore } from "@reduxjs/toolkit";
import userReducer from "./userState";

const store: EnhancedStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
