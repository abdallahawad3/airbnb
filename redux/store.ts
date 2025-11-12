import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./features/register/registerSlice";
import loginSlice from "./features/login/loginSlice";
import rentSlice from "./features/rent/rentSlice";
import listingSlice from "./features/listings/listingSlice";

export const store = configureStore({
  reducer: {
    register: registerSlice,
    login: loginSlice,
    rent: rentSlice,
    listing: listingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
