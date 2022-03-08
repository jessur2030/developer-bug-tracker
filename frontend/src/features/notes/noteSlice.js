import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";

//create note initial state
const initialState = {
  //array of notes
  notes: [],
  //booleans
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get issue notes
export const getNotes = createAsyncThunk(
  "notes/getAll",
  async (issueId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      //
      return await noteService.getNotes(issueId, token);
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

//Create issue note
export const createNote = createAsyncThunk(
  "notes/create",
  async ({ noteText, issueId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      //
      return await noteService.createNote(noteText, issueId, token);
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

//Create noteSlice
export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      //Get issue notes case
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      //Create issue note case
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.notes.push(action.payload);
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

//
export const { reset } = noteSlice.actions;
export default noteSlice.reducer;
