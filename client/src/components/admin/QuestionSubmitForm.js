import React, { useState, useContext, useEffect } from "react";
import "../../assets/app.css";
import { Form, Col, Row, Button, Modal, Tabs, Tab } from "react-bootstrap";
import { getQuestions } from "../../actions/questionActions";
import QuestionForm from "./Form";
import ListView from "./ListView";
import dataListArray from "../../assets/datalist";
import { connect } from "react-redux";
import uuid from "uuid";

const QuestionSubmitForm = () => {
  useEffect(() => {
    getQuestions();
  }, []);
  const [key, setKey] = useState("Submit");

  return (
    <Tabs id="admin-key-form" activeKey={key} onSelect={k => setKey(k)}>
      <Tab eventKey="Submit" title="Input">
        <QuestionForm />
      </Tab>
      <Tab eventKey="View" title="View" style={{ color: "black" }}>
        <ListView />
      </Tab>
      <Tab eventKey="Access" title="Access">
        <h1>Header Three Here</h1>
      </Tab>
    </Tabs>
  );
};

export default QuestionSubmitForm;
