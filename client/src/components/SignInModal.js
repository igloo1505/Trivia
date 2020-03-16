import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { loginUser } from "../actions/userActions";

const SignInModal = ({ loginUser, ...props }) => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const onChange = e =>
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  const onSubmit = e => {
    e.preventDefault();
    console.log(user);
    loginUser(user);
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Welcome</h4>
        <p>
          Use your personal password, or for admin access use the Organization
          password.
        </p>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={onChange}
            />
            <Form.Text className="text-muted">
              We might sell your email on the black market.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={onChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { loginUser })(SignInModal);
