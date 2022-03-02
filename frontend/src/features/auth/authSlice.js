import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
//Get user from localStorage
const user = JSON.parse(localStorage.getItem("user"));
//create initial state
const initialState = {
  user: user ? user : null,
  //isError:any error from the server
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//register new user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      //
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //reject with value of message
      return thunkAPI.rejectWithValue(message);
    }
  }
);
//login
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    //possible error
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.response ||
      error.toString();
    //reject with value of message
    return thunkAPI.rejectWithValue(message);
  }
});

//logout
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

//authSlice
export const authSlice = createSlice({
  //
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
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // @Desc login reducer builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

//
export const { reset } = authSlice.actions;
export default authSlice.reducer;
