import React, { useState } from "react";
import { Form, Col, Row, Button, Modal, Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import { editUserAccess } from "../../actions/userActions";

const AccessPanel = ({
  user: {
    user: { name, adminStatus, organizationReference },
    organization: { organizationName, organizationUserPassword, displayName }
  },
  editUserAccess
}) => {
  const [userPassOne, setUserPassOne] = useState(organizationUserPassword);
  const [userPassTwo, setUserPassTwo] = useState(organizationUserPassword);
  const [DisplayName, setDisplayName] = useState(displayName);
  const orgInfo = {
    referenceID: organizationReference,
    organizationName,
    organizationUserPassword: userPassOne,
    DisplayName
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
              defaultValue={userPassOne}
              onChange={e => setUserPassOne(e.target.value)}
              className="editAccessInput"
            />
          </Col>
          <Col xs={12} md={6}>
            <Form.Control
              placeholder="Confirm User Password"
              defaultValue={userPassTwo}
              onChange={e => setUserPassTwo(e.target.value)}
              className="editAccessInput"
            />
          </Col>
        </Form.Row>
        <h4 style={{ textAlign: "center", marginTop: "20px" }}>
          Set Display Name
        </h4>
        <Form.Row style={{ marginTop: "30px", marginBottom: "30px" }}>
          <Col xs={0} md={4}></Col>
          <Col xs={12} md={4}>
            <Form.Control
              defaultValue={DisplayName}
              onChange={e => setDisplayName(e.target.value)}
              className="editAccessInput"
              style={{ margin: "auto" }}
            />
          </Col>
          <Col xs={0} md={4}></Col>
        </Form.Row>
        <Form.Row>
          <Button
            type="Edit"
            style={{ margin: "auto" }}
            onClick={e => editUserPass(e)}
          >
            Edit Organization Information
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
