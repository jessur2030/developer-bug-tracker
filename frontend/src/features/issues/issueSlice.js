import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import issueService from "./issueService";

//initial state for tickets
const initialState = {
  issues: [],
  issue: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Create new ticket
export const createIssue = createAsyncThunk(
  "issues/create",
  async (issueData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      //
      return await issueService.createIssue(issueData, token);
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

//create slice
export const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createIssue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createIssue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.issue = action.payload;
      })
      //TODO: BUG: not getting reject form the state when there is an error creating a new issue
      .addCase(createIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = issueSlice.actions;
export default issueSlice.reducer;
