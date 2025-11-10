import { createSlice } from "@reduxjs/toolkit";
interface RentState {
  isRentModalOpen: boolean;
  loading: boolean;
}
const initialState: RentState = {
  isRentModalOpen: false,
  loading: false,
};

const rentSlice = createSlice({
  name: "rent",
  initialState,
  reducers: {
    openRentModal: (state) => {
      state.isRentModalOpen = true;
    },
    closeRentModal: (state) => {
      state.isRentModalOpen = false;
    },
  },
});

export const { openRentModal, closeRentModal } = rentSlice.actions;
export default rentSlice.reducer;
