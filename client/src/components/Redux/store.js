import { configureStore } from "@reduxjs/toolkit";
import loadCurrentAdminReducer from "./Admin/Reducers/loadCurrentAdminReducer.Admin";
import loadCurrentStudentReducer from "./Student/Reducers/loadCurrentStudentReducer.Student";
import loadCurrentTeacherReducer from "./Teacher/Reducers/loadCurrentTeacherReducer.Teacher";
const store = configureStore({
  reducer: {
    currentAdminData: loadCurrentAdminReducer,
    currentStudentData: loadCurrentStudentReducer,
    currentTeacherData: loadCurrentTeacherReducer,
  },
});

export default store;
