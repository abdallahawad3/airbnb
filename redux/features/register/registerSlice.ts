import { createSlice } from "@reduxjs/toolkit";
interface IRegisterState {
  isOpen: boolean;
}

const initialState: IRegisterState = {
  isOpen: false,
};

export const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    onClose: (state) => {
      state.isOpen = false;
    },
    onOpen: (state) => {
      state.isOpen = true;
    },
  },
});

export const { onClose, onOpen } = registerSlice.actions;
export default registerSlice.reducer;
