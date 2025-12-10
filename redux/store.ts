import { configureStore } from "@reduxjs/toolkit";
import registerSlice from "./features/register/registerSlice";
import loginSlice from "./features/login/loginSlice";
import rentSlice from "./features/rent/rentSlice";
import listingSlice from "./features/listings/listingSlice";
import searchSlice from "./features/search/searchSlice";
export const store = configureStore({
  reducer: {
    register: registerSlice,
    login: loginSlice,
    rent: rentSlice,
    listing: listingSlice,
    search: searchSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
