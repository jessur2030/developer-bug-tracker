import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//create initial state
const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isSuccess: false,
  message: "",
};

//create auth slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //
  },
});

export default authSlice.reducer;
