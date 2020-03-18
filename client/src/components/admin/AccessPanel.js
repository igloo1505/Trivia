import React, { useState } from "react";
import { Form, Col, Row, Button, Modal, Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import { editUserAccess } from "../../actions/userActions";

const AccessPanel = ({
  user: {
    user: { name, adminStatus, organizationName, organizationReference }
  },
  editUserAccess
}) => {
  const [userPassOne, setUserPassOne] = useState("");
  const [userPassTwo, setUserPassTwo] = useState("");
  const orgInfo = {
    referenceID: organizationReference,
    organizationName,
    organizationUserPassword: userPassOne
  };

  const editUserPass = e => {
    e.preventDefault();
    if (userPassOne === userPassTwo) {
      let id = organizationReference;
      console.log("sending orgInfo as ", orgInfo);

      editUserAccess({ orgInfo });
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h1 className="mobileHeadline">Admin Settings</h1>
      <h4 style={{ textAlign: "center", marginTop: "20px" }}>
        Set password to allow user access rights.
      </h4>
      <p style={{ textAlign: "center", fontSize: "0.7rem" }}>
        This does not grant Admin privileges
      </p>
      <Form>
        <Form.Row style={{ marginTop: "30px", marginBottom: "30px" }}>
          <Col xs={12} md={6}>
            <Form.Control
              placeholder="User Password"
              onChange={e => setUserPassOne(e.target.value)}
              className="editAccessInput"
            />
          </Col>
          <Col xs={12} md={6}>
            <Form.Control
              placeholder="Confirm User Password"
              onChange={e => setUserPassTwo(e.target.value)}
              className="editAccessInput"
            />
          </Col>
        </Form.Row>
        <Form.Row>
          <Button
            type="Edit"
            style={{ margin: "auto" }}
            onClick={e => editUserPass(e)}
          >
            Change User Password
          </Button>
        </Form.Row>
      </Form>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { editUserAccess })(AccessPanel);
