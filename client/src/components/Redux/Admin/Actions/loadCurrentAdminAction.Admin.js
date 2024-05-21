import axios from "axios";
const loadCurrentAdminAction = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadAdminRequest",
    });
    const response = await axios.get("/api/v1/admin/load-current-admin/");
    dispatch({
      type: "LoadAdminRequestSuccess",
      payload: await response.data,
    });
  } catch (error) {
    dispatch({
      type: "LoadAdminRequestFailure",
      payload: error.response.data.message,
    });
  }
};

export default loadCurrentAdminAction;
