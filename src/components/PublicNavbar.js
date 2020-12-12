import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../images/logo.png";
import githubIco from "../images/github_icon.png";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import routeActions from "../redux/actions/route.actions";

const PublicNavbar = () => {
  const name = useSelector((state) => state.auth.user.name);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Navbar bg="light" expand="lg" >
      <Navbar.Brand>
        <img src={logo} alt="CoderSchool" width="100px" />
      </Navbar.Brand>
      <Nav className="mr-auto"></Nav>
      <Nav>
        {isAuthenticated ? (
          <Nav.Link style={{ padding: "8px" }} href="/admin/profile">{name}</Nav.Link>
        ) : (
          <Nav.Link href="/login">Login</Nav.Link>
        )}
        <Nav.Link href="/register">Register</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default PublicNavbar;
