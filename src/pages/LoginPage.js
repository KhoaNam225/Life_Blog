import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import authActions from "../redux/actions/auth.actions";

import routeActions from "../redux/actions/route.actions";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "111@gmail.com",
    password: "111",
  });
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const dispatch = useDispatch();

  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authActions.loginRequest(formData));
  };

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo]);

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                placeholder="email"
                value={formData.email}
                name="email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Button type="submit">Login</Button>
          </Form>
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
