import React, { useState, useContext, useEffect } from "react";
import "../../assets/app.css";
import { Form, Col, Row, Button, Modal, Tabs, Tab } from "react-bootstrap";
import QuestionForm from "./Form";
import dataListArray from "../../assets/datalist";
import { connect } from "react-redux";
import uuid from "uuid";

const QuestionSubmitForm = () => {
  const [key, setKey] = useState("Submit");

  return (
    <Tabs id="admin-key-form" activeKey={key} onSelect={k => setKey(k)}>
      <Tab eventKey="Submit" title="Input">
        <QuestionForm />
      </Tab>
      <Tab eventKey="View" title="View" style={{ color: "black" }}>
        <h1>Header Two Here</h1>
      </Tab>
      <Tab eventKey="Access" title="Access">
        <h1>Header Three Here</h1>
      </Tab>
    </Tabs>
  );
};

export default QuestionSubmitForm;
