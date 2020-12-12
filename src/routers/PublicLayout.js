import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import PublicNavbar from "../components/PublicNavbar";
import AddEditBlogPage from "../pages/AddEditBlogPage";
import BlogDetailPage from "../pages/BlogDetailPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import PrivateRoute from "./PrivateRoute";
import * as types from "../redux/constants/auth.constants";
import authActions from "../redux/actions/auth.actions";

const PublicLayout = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = sessionStorage.getItem(types.ACCESS_TOKEN);
    if (accessToken && !isAuthenticated) {
      dispatch(authActions.reloginRequest(accessToken));
    }
  }, []);

  return (
    <>
      <PublicNavbar />
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/blogs/:id" component={BlogDetailPage} />
          <PrivateRoute exact path="/blog/add" component={AddEditBlogPage} />
          <PrivateRoute
            exact
            path="/blog/edit/:id"
            component={AddEditBlogPage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </>
  );
};
export default PublicLayout;
