// src/redux/slices/maidSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch maids
export const fetchMaids = createAsyncThunk("maids/fetchMaids", async () => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/maids`);
  return response.data;
});

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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaids.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMaids.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchMaids.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { toggleShowAll, setMaids } = maidSlice.actions;
export default maidSlice.reducer;
