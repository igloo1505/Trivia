import React, { useState, useContext, useEffect } from "react";
import { Form, Col, Row, Button, Modal } from "react-bootstrap";
import dataListArray from "../../assets/datalist";
import { connect } from "react-redux";
import uuid from "uuid";

const QuestionForm = ({ user: { loggedIn, loading } }) => {
  //   useEffect(() => {
  //     if (current !== null) {
  //       setQuestion(current);
  //     } else {
  //       setQuestion({
  //         question: "",
  //         answer: "",
  //         category: "",
  //         points: ""
  //       });
  //     }
  //   }, [questionContext, current]);

  const [question, setQuestion] = useState({
    question: "",
    answerOne: "",
    answerTwo: "",
    answerThree: "",
    answerFour: "",
    difficulty: ""
  });
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    organization: "",
    city: "Milwaukee",
    state: "Wisconsin"
  });
  // const clearAll = () => {
  //   console.log("clear");
  // };

  const onChange = e =>
    setQuestion({ ...question, [e.target.name]: e.target.value });

  const onSubmit = () => {
    console.log(question);
  };
  const RowStyle = {
    margin: "50px"
  };
  const buttonStyle = {
    marginLeft: "50%",
    marginTop: "20px",
    transform: "translateX(-50%)",
    width: "min(50%, 200px)"
  };

  return (
    <div>
      <Form style={{ marginTop: "20px", marginBottom: "20px" }}>
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
        <Button type="submit" style={buttonStyle} onClick={() => onSubmit()}>
          Submit form
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(QuestionForm);
