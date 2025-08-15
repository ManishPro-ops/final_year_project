// src/redux/slices/maidSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch maids
const backendUrl = import.meta.env.VITE_BACKEND_URL;
if (!backendUrl) {
  console.error("VITE_BACKEND_URL is not defined in your .env file!");
}

export const fetchMaids = createAsyncThunk(
  "maids/fetchMaids",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendUrl}/api/maids`);
      return response.data;
    } catch (err) {
      console.error("Failed to fetch maids:", err);
      // Pass backend error message or generic message to rejected action
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const maidSlice = createSlice({
  name: "maids",
  initialState: {
    data: [],
    status: "idle", // 'loading' | 'succeeded' | 'failed'
    error: null,
    showAll: false,
  },
  reducers: {
    toggleShowAll: (state) => {
      state.showAll = !state.showAll;
    },
    setMaids: (state, action) => {
      const payload = action.payload;

      // If the response is an object with `data`, use that
      const maids = Array.isArray(payload)
        ? payload
        : Array.isArray(payload.data)
        ? payload.data
        : [];

      state.data = maids;
      state.status = "succeeded";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaids.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMaids.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchMaids.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { toggleShowAll, setMaids } = maidSlice.actions;
export default maidSlice.reducer;
