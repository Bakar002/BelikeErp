import { createReducer } from "@reduxjs/toolkit";

const intialState = {
  isLoading: false,
  currentAdminData: null,
  error: null,
  isAdminAuthenticated: false,
};

const loadCurrentAdminReducer = createReducer(intialState, (builder) => {
  builder.addCase("LoadAdminRequest", (state) => {
    state.isLoading = true;
  });
  builder.addCase("LoadAdminRequestSuccess", (state, action) => {
    state.isLoading = false;
    state.currentAdminData = action.payload;
    state.isAdminAuthenticated = true;
  });
  builder.addCase("LoadAdminRequestFailure", (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
});

export default loadCurrentAdminReducer;
