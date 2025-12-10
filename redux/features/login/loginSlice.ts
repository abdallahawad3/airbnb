import { AXIOS_INSTANCE } from "@/config/axios.config";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface ILoginState {
  isLoggedIn: boolean;
  loading: boolean;
  isOpenLoginModal: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
}

const initialState: ILoginState = {
  isLoggedIn: false,
  loading: false,
  isOpenLoginModal: false,
  user: null,
};

export const loginUser = createAsyncThunk(
  "loginUser",
  async (
    userData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const { data, status } = await AXIOS_INSTANCE.post("/login", userData);
      if (status === 200) {
        toast.success("Login successful!");
        return data;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    onCloseLoginModal: (state) => {
      state.isOpenLoginModal = false;
    },
    onOpenLoginModal: (state) => {
      state.isOpenLoginModal = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        toast.error(
          (action.payload as { message: string })?.message ||
            "Login failed! Please try again."
        );
      });
  },
});

export const { onCloseLoginModal, onOpenLoginModal, setLoading } =
  loginSlice.actions;
export default loginSlice.reducer;
