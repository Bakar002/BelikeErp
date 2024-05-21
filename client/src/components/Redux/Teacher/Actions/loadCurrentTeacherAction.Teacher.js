import axios from "axios";
const loadCurrentTeacherAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadTeacherRequest",
    });
    const response = await axios.get("/api/v1/teacher/load-current-teacher/");
    dispatch({
      type: "LoadTeacherRequestSuccess",
      payload: await response.data,
    });
  } catch (error) {
    dispatch({
      type: "LoadTeacherRequestFailure",
      payload: error.response.data.message,
    });
  }
};

export default loadCurrentTeacherAction;
