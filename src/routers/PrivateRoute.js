import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import * as types from "../redux/constants/auth.constants";

const PrivateRoute = ({ ...rest }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const accessToken = sessionStorage.getItem(types.ACCESS_TOKEN);

  if (isAuthenticated || accessToken) return <Route {...rest} />;
  delete rest.component;
  return <Route {...rest} render={(props) => <Redirect to="/login" />} />;
};

export default PrivateRoute;
