import { AXIOS_INSTANCE } from "@/config/axios.config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
interface IRegisterState {
  isOpen: boolean;
  loading: boolean;
}

const initialState: IRegisterState = {
  isOpen: false,
  loading: false,
};

export const registerUser = createAsyncThunk(
  "registerUser",
  async (userData: { username: string; email: string; password: string }) => {
    console.log(userData);
    const { data, statusText } = await AXIOS_INSTANCE.post(
      "/register",
      userData
    );
    if (statusText !== "OK") {
      toast.error("Failed to register user");
      throw new Error("Failed to register user");
    }
    toast.success("Registration successful!");
    return data;
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { onClose, onOpen } = registerSlice.actions;
export default registerSlice.reducer;
