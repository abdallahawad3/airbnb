import { createSlice } from "@reduxjs/toolkit";
interface IRegisterState {
  isOpen: boolean;
  loading: boolean;
}

const initialState: IRegisterState = {
  isOpen: false,
  loading: false,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    onOpen: (state) => {
      state.isOpen = true;
    },
    onClose: (state) => {
      state.isOpen = false;
    },
  },
});

export const { onClose, onOpen } = registerSlice.actions;
export default registerSlice.reducer;
