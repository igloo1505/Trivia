import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import dataListArray from "../assets/datalist";
import { setNewUser } from "../actions/userActions";

const SignIn = ({ setNewUser }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    organization: "",
    city: "Milwaukee",
    state: "Wisconsin"
  });
  const onChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };
  const onSubmit = e => {
    //   Add front end form validation here and 'toast' if not suffice
    e.preventDefault();
    setNewUser(user);
    console.log(setNewUser);
    console.log(user);
  };
  const RowStyle = {
    margin: "50px"
  };
  const buttonStyle = {
    marginLeft: "50%",
    transform: "translateX(-50%)",
    width: "min(50%, 200px)"
  };

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Row style={RowStyle}>
          <Col>
            <Form.Control
              placeholder="First name"
              name="name"
              onChange={onChange}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Email"
              name="email"
              onChange={onChange}
            />
          </Col>
        </Row>
        <Row style={RowStyle}>
          <Col>
            <Form.Label>Organization Test</Form.Label>
            <Form.Control
              type="password"
              name="organization"
              onChange={onChange}
              placeholder="Organization Code or Password"
            />
          </Col>
        </Row>
        <Form.Row style={RowStyle}>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control value={user.city} name="city" onChange={onChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              list="stateArray"
              value={user.name}
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
        </Form.Row>
        <Button type="submit" style={buttonStyle}>
          Submit form
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  admin: state.admin
});

export default connect(mapStateToProps, { setNewUser })(SignIn);
