import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ISearchState {
  isLoggedIn: boolean;
  loading: boolean;
  isOpenSearchModal: boolean;
}

const initialState: ISearchState = {
  isLoggedIn: false,
  loading: false,
  isOpenSearchModal: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    onCloseSearchModal: (state) => {
      state.isOpenSearchModal = false;
    },
    onOpenSearchModal: (state) => {
      state.isOpenSearchModal = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { onCloseSearchModal, onOpenSearchModal, setLoading } =
  searchSlice.actions;
export default searchSlice.reducer;
