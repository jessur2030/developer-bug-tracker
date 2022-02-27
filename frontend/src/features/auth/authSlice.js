import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//Get user from local storage
const user = JSON.parse(localStorage.getItem("user"));
//create initial state
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isSuccess: false,
  message: "",
};

//Register a new user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      //
      return await authService.register(user);
    } catch (error) {
      //possible error
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      //pass error message: if there is an error
      return await thunkAPI.rejectWithValue(message);
    }
  }
);

//Login a user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    //possible error
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    //pass error message: if there is an error
    return await thunkAPI.rejectWithValue(message);
  }
});

//Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  //
  await authService.logout();
});

//create auth slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // @Desc register reducer builder
      //register.pending
      .addCase(register.pending, (state) => {
        //when pending
        state.isLoading = true;
      })
      //register.fulfilled
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      //register.rejected
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // @Desc login reducer builder
      //register.pending
      .addCase(login.pending, (state) => {
        //when pending
        state.isLoading = true;
      })
      //login.fulfilled
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      //login.rejected
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // @Desc logout builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

//export reset from reducers action
export const { reset } = authSlice.actions;

export default authSlice.reducer;
