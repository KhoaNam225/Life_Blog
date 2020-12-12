import * as types from "../constants/user.constants";
import api from "../../apiService";
import { toast } from "react-toastify";

const getUsersRequest = (accessToken) => async (dispatch) => {
    dispatch({ type: types.GET_USERS_REQUEST, payload: null });
    try {
        const header = { Authorization: `Bearer ${accessToken}`};
        const res = await api.get("/api/users", { headers: header });
        dispatch({type: types.GET_USERS_SUCCESS, payload: res.data.data.users });
    }
    catch (error) {
        toast.error("Error getting all users");
        dispatch({ type: types.GET_USERS_FAILURE, paylaod: null });
    }
}

const userActions = { getUsersRequest };

export default userActions;