import { createReducer } from "@reduxjs/toolkit";

const intialState = {
  isLoading: false,
  currentTeacherData: null,
  error: null,
  isTeacherAuthenticated: false,
};

const loadCurrentTeacherReducer = createReducer(intialState, (builder) => {
  builder.addCase("LoadTeacherRequest", (state) => {
    state.isLoading = true;
  });
  builder.addCase("LoadTeacherRequestSuccess", (state, action) => {
    state.isLoading = false;
    state.currentTeacherData = action.payload;
    state.isTeacherAuthenticated = true;
  });
  builder.addCase("LoadTeacherRequestFailure", (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isTeacherAuthenticated = false;
  });
});

export default loadCurrentTeacherReducer;
