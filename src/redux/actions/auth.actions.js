import * as types from "../constants/auth.constants";
import api from "../../apiService";
import { toast } from "react-toastify";
import routeActions from "../actions/route.actions";

const loginRequest = ({ email, password }) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const res = await api.post(`/api/auth/login`, { email, password });
    dispatch(routeActions.redirect("/"));
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });
    // NEW: After getting the login data back from the server
    // we save the access token to localStorage so that after each refresh
    // we will use it to log the user in
    sessionStorage.setItem(types.ACCESS_TOKEN, res.data.data.accessToken);

    toast.success(`Welcome ${res.data.data.user.name}`);
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: types.LOGIN_FAILURE, payload: null });
  }
};

const registerAccount = ({ avatarUrl, name, email, password }) => async (
  dispatch
) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });
  try {
    const res = await api.post(`/api/users`, {
      avatarUrl,
      name,
      email,
      password,
    });
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data });
    dispatch(routeActions.redirect("/login"));
    toast.success(`Welcome ${res.data.data.user.name}`);
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: null });
  }
};

const reloginRequest = (accessToken) => async (dispatch) => {
  dispatch({ type: types.RE_LOGIN_REQUEST, payload: null });
  try {
    const res = await api.get(`/api/users/me`, {
      headers: { "Authorization": `Bearer ${accessToken}`}
    });
    const user = { ...res.data.data };
    const data = { user, accessToken}
    dispatch({ type: types.RE_LOGIN_SUCCESS, payload: data });
  } catch (error) {
    toast.error(error.message);
    dispatch({ type: types.RE_LOGIN_FAILURE, payload: null});
  }
};

const authActions = {
  loginRequest,
  registerAccount,
  reloginRequest
};
export default authActions;
