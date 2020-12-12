import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, FormGroup, Row } from "react-bootstrap";
import { ClipLoader } from "react-spinners";

const ProfilePage = () => {
  const userName = useSelector(state => state.auth.user.name);
  const email = useSelector(state => state.auth.user.email);
  const loading = useSelector(state => state.auth.loading);

  return loading ? 
  <div className="text-center">
    <ClipLoader color="red" size={150} loading={true} />
  </div> :
   (
    <div>
      <Form>
          <FormGroup as={Row}>
            <Form.Label column sm="2">
              Username:
            </Form.Label>
            <Col sm="8">
              <Form.Control
                name="userName"
                placeholder={userName}
                readOnly
                
              />
            </Col>
          </FormGroup>
          <FormGroup as={Row}>
            <Form.Label column sm="2">
              Email:
            </Form.Label>
            <Col sm="8">
              <Form.Control
                name="email"
                readOnly
                placeholder={email}
              />
            </Col>
          </FormGroup>
        </Form>
    </div>
  );
};

export default ProfilePage;
