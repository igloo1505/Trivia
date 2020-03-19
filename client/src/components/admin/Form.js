import React, { useState, useContext, useEffect } from "react";
import { Form, Col, Row, Button, Modal } from "react-bootstrap";
import dataListArray from "../../assets/datalist";
import { connect } from "react-redux";
import {
  addQuestion,
  editQuestion,
  clearCurrent
} from "../../actions/questionActions";

import uuid from "uuid";

const QuestionForm = ({
  user: {
    loggedIn,
    loading,
    user: { name, email, organizationName, organizationReference, city }
  },
  question: { questions, current },
  addQuestion,
  editQuestion,
  clearCurrent
}) => {
  useEffect(() => {
    console.log(current);
    if (current !== null) {
      setQuestion(current[0]);
    } else {
      setQuestion({
        question: "",
        difficulty: "",
        correctAnswer: "",
        wrongAnswerOne: "",
        wrongAnswerTwo: "",
        wrongAnswerThree: "",
        submittedBy: { name, email, organizationName, organizationReference }
      });
    }
  }, [current]);
  const [question, setQuestion] = useState({
    question: "",
    difficulty: "",
    correctAnswer: "",
    wrongAnswerOne: "",
    wrongAnswerTwo: "",
    wrongAnswerThree: "",
    submittedBy: { name, email, organizationName, organizationReference }
  });
  const onEdit = e => {
    e.preventDefault();
    let id = current[0]._id;
    editQuestion(id, question);
  };

  const onChange = e =>
    setQuestion({ ...question, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log(question);
    addQuestion(question);
    setQuestion({
      question: "",
      difficulty: "",
      correctAnswer: "",
      wrongAnswerOne: "",
      wrongAnswerTwo: "",
      wrongAnswerThree: "",
      submittedBy: { name, email, organizationName, organizationReference }
    });
  };

  const {
    difficulty,
    correctAnswer,
    wrongAnswerOne,
    wrongAnswerTwo,
    wrongAnswerThree
  } = question;

  return (
    <div>
      <Form style={{ marginTop: "20px", marginBottom: "50px" }}>
        <Form.Group controlId="Question">
          <Form.Label>Trivia Question</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            name="question"
            value={question.question}
            onChange={onChange}
          />
        </Form.Group>
        <Form.Group controlId="Difficulty">
          <Form.Label>Difficulty</Form.Label>
          <Form.Control
            as="select"
            multiple
            name="difficulty"
            onChange={onChange}
            style={{ height: "7rem" }}
          >
            <option value="100">The President</option>
            <option value="200">Well trained monkey</option>
            <option value="300">C student</option>
            <option value="400">"Chad" from accounting</option>
            <option value="500">Einstein</option>
          </Form.Control>
        </Form.Group>
        <Row className="mobileInputRow">
          <Col xs={12} md={6} className="mobileInput">
            <Form.Control
              placeholder="Correct Answer"
              name="correctAnswer"
              value={correctAnswer}
              onChange={onChange}
            />
          </Col>
          <Col xs={12} md={6} className="mobileInput">
            <Form.Control
              placeholder="Wrong Answer"
              name="wrongAnswerOne"
              value={wrongAnswerOne}
              onChange={onChange}
            />
          </Col>
        </Row>
        <Row className="mobileInputRow">
          <Col xs={12} md={6} className="mobileInput">
            <Form.Control
              placeholder="Wrong Answer"
              name="wrongAnswerTwo"
              value={wrongAnswerTwo}
              onChange={onChange}
            />
          </Col>
          <Col xs={12} md={6} className="mobileInput">
            <Form.Control
              placeholder="Wrong Answer"
              name="wrongAnswerThree"
              value={wrongAnswerThree}
              onChange={onChange}
            />
          </Col>
        </Row>
        {current === null ? (
          <Button
            variant="primary"
            size="lg"
            block
            onClick={e => onSubmit(e)}
            className="submitFormButton"
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="warning"
            size="lg"
            block
            onClick={e => onEdit(e)}
            className="submitFormButton"
          >
            Edit
          </Button>
        )}
        {current ? (
          <Button
            variant="info"
            size="lg"
            block
            onClick={e => clearCurrent()}
            className="submitFormButton"
          >
            Clear
          </Button>
        ) : (
          ""
        )}
      </Form>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  question: state.question
});

export default connect(mapStateToProps, {
  addQuestion,
  editQuestion,
  clearCurrent
})(QuestionForm);
