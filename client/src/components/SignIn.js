import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { connect } from "react-redux";

import dataListArray from "../assets/datalist";
import { setNewUser } from "../actions/userActions";
import SignInModal from "./SignInModal";
import { Redirect } from "react-router-dom";

const SignIn = ({ user: { loggedIn, loading }, setNewUser }) => {
  const [modalShow, setModalShow] = useState(false);
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    organizationString: "",
    city: "Milwaukee",
    state: "Wisconsin",
  });
  const handleModal = (e) => {
    e.preventDefault();
    setModalShow(true);
  };

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    //!!   Add front end form validation here and 'toast' if not suffice
    e.preventDefault();
    setNewUser(user);
  };
  const RowStyle = {
    margin: "30px",
  };
  const buttonStyle = {
    marginLeft: "50%",
    marginTop: "20px",
    transform: "translateX(-50%)",
    width: "min(50%, 200px)",
  };
  if (loggedIn && !loading) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <SignInModal show={modalShow} onHide={() => setModalShow(false)} />
      <Form style={{ marginTop: "20px", marginBottom: "50px" }}>
        <Row style={RowStyle}>
          <Col xs={12} md={6} style={{ marginTop: "20px" }}>
            <Form.Control
              placeholder="First name"
              name="name"
              onChange={onChange}
            />
          </Col>
          <Col xs={12} md={6} style={{ marginTop: "20px" }}>
            <Form.Control
              placeholder="Email"
              name="email"
              onChange={onChange}
            />
          </Col>
        </Row>
        <Row style={RowStyle}>
          <Col xs={12} md={6} style={{ marginTop: "20px" }}>
            <Form.Label>Organization Code</Form.Label>
            <Form.Control
              type="text"
              name="organizationString"
              onChange={onChange}
              placeholder="Org. code or Admin code"
            />
          </Col>
          <Col xs={12} md={6} style={{ marginTop: "20px" }}>
            <Form.Label>Personal Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={onChange}
              placeholder="Your personal password"
            />
          </Col>
        </Row>
        <Row style={RowStyle}>
          <Form.Group as={Col} controlId="formGridCity" xs={12} md={6}>
            <Form.Label>City</Form.Label>
            <Form.Control value={user.city} name="city" onChange={onChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState" xs={12} md={6}>
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              list="stateArray"
              value={user.state}
              name="state"
              onChange={onChange}
            >
              {dataListArray.map((st, key) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>
        <Button type="submit" style={buttonStyle} onClick={(e) => onSubmit(e)}>
          Register
        </Button>
        <Button
          type="signIn"
          style={buttonStyle}
          onClick={(e) => handleModal(e)}
        >
          Have an account ?
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  admin: state.admin,
});

export default connect(mapStateToProps, { setNewUser })(SignIn);
