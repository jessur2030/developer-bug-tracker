import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import issueService from "./issueService";

//initial state for issue
const initialState = {
  issues: [],
  issue: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Create new issue
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

//Get user issues
export const getIssues = createAsyncThunk("issues/all", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    //
    return await issueService.getIssues(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    //reject with value of message
    return thunkAPI.rejectWithValue(message);
  }
});

//Get user issue
export const getIssue = createAsyncThunk(
  "issues/get",
  async (issueId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      //
      return await issueService.getIssue(issueId, token);
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

//Close issue
export const closeIssue = createAsyncThunk(
  "issues/close",
  async (issueId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      //
      return await issueService.closeIssue(issueId, token);
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
  name: "issues",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createIssue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createIssue.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.issue = action.payload;
      })
      //TODO: BUG: not getting reject form the state when there is an error creating a new issue
      .addCase(createIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //Get user issues case
      .addCase(getIssues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIssues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.issues = action.payload;
      })
      .addCase(getIssues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      //Get issue case
      .addCase(getIssue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIssue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.issue = action.payload;
      })
      .addCase(getIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //update close issue
      .addCase(closeIssue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.issues.map((issue) =>
          issue._id === action.payload._id ? (issue.status = "fixed") : issue
        );
      });
  },
});

export const { reset } = issueSlice.actions;
export default issueSlice.reducer;
