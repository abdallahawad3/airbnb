import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./features/register/registerSlice";
import loginSlice from "./features/login/loginSlice";

export const store = configureStore({
  reducer: {
    register: registerSlice,
    login: loginSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
