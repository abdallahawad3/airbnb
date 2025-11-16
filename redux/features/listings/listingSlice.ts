/* eslint-disable @typescript-eslint/no-explicit-any */
import { AXIOS_INSTANCE } from "@/config/axios.config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface IListing {
  loading: boolean;
  error: string | null;
}

const initialState: IListing = {
  loading: false,
  error: null,
};

export const addListing = createAsyncThunk(
  "listing/addListing",
  async (listingData: any, { rejectWithValue }) => {
    try {
      const response = await AXIOS_INSTANCE.post("/listings", {
        title: listingData.title,
        description: listingData.description,
        imageSrc: listingData.imageSrc,
        category: listingData.category,
        roomCount: listingData.roomCount,
        bathroomCount: listingData.bathroomCount,
        guestCount: listingData.guestCount,
        location: { value: listingData.location },
        price: listingData.price,
      });
      if (response.status !== 200) {
        throw new Error("Failed to add listing");
      }
      return response.data;
    } catch (error) {
      const serializedError = {
        message:
          error instanceof AxiosError
            ? error?.response?.data?.message ||
              error?.message ||
              "Something went wrong"
            : "Something went wrong",
        status:
          error instanceof AxiosError ? error?.response?.status : undefined,
        data: error instanceof AxiosError ? error?.response?.data : undefined,
      };

      return rejectWithValue(serializedError);
    }
  }
);

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addListing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addListing.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        toast.success("Listing added successfully!");
      })
      .addCase(addListing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default listingSlice.reducer;
