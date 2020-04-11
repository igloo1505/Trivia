import React, { useState, useEffect } from "react";
import "../../assets/app.css";
import { Tabs, Tab } from "react-bootstrap";

import { resetStatus } from "../../actions/play/playActions";
import QuestionForm from "./Form";
import AccessPanel from "./AccessPanel";
import ListView from "./ListView";
import { connect } from "react-redux";

const QuestionSubmitForm = ({ user: { admin, menuKey }, resetStatus }) => {
  useEffect(() => {
    setKey(menuKey);
    resetStatus();
    // eslint-disable-next-line
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
