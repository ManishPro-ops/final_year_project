import { configureStore } from "@reduxjs/toolkit";
import maidReducer from "./maidSlice";

const store = configureStore({
  reducer: {
    maids: maidReducer,
  },
});

export default store;