import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import dataListArray from "../assets/datalist";
import { setNewUser } from "../actions/userActions";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Query } from "react-apollo";

const SignIn = ({ setNewUser }) => {
  const [user, setUser] = useState({
    name: "",
    password: "",
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
    //!!   Add front end form validation here and 'toast' if not suffice
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
      <Form
        onSubmit={onSubmit}
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
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
          <Col style={{ marginTop: "20px" }}>
            <Form.Label>Organization Code</Form.Label>
            <Form.Control
              type="text"
              name="organization"
              onChange={onChange}
              placeholder="Org. code (required only for admins)"
            />
          </Col>
          <Col style={{ marginTop: "20px" }}>
            <Form.Label>Personal Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={onChange}
              placeholder="Your personal password"
            />
          </Col>
        </Row>
        <Form.Row style={RowStyle}>
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
