import React, { useState, useContext, useEffect } from "react";
import "../../assets/app.css";
import { Form, Col, Row, Button, Modal, Tabs, Tab } from "react-bootstrap";
import store from "../../store";
import { getQuestions } from "../../actions/questionActions";
import { resetStatus } from "../../actions/play/playActions";
import QuestionForm from "./Form";
import AccessPanel from "./AccessPanel";
import ListView from "./ListView";
import { connect } from "react-redux";

const QuestionSubmitForm = ({ user: { admin, menuKey }, resetStatus }) => {
  useEffect(() => {
    setKey(menuKey);
    resetStatus();
  }, [menuKey]);
  const [key, setKey] = useState(menuKey);

  return (
    <Tabs id="admin-key-form" activeKey={key} onSelect={(k) => setKey(k)}>
      <Tab eventKey="Submit" title="Input">
        <QuestionForm onSelect={(k) => setKey(k)} />
      </Tab>
      <Tab eventKey="View" title="View" style={{ color: "black" }}>
        <ListView onSelect={(k) => setKey(k)} />
      </Tab>
      <Tab eventKey="Access" title="Access">
        <AccessPanel />
      </Tab>
    </Tabs>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  question: state.question,
});

export default connect(mapStateToProps, { resetStatus })(QuestionSubmitForm);
