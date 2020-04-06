import React, { useState, useContext, useEffect } from "react";
import { Form, Col, Row, Button, Modal } from "react-bootstrap";
import dataListArray from "../../assets/datalist";
import UploadModal from "./UploadModal";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  addQuestion,
  editQuestion,
  clearCurrent,
  clearImageState
} from "../../actions/questionActions";

import uuid from "uuid";

const QuestionForm = ({
  user: {
    loggedIn,
    loading,
    user: { name, email, organizationName, organizationReference, city },
  },
  question: { questions, current, imageHolder },
  addQuestion,
  editQuestion,
  clearCurrent,
  clearImageState,
}) => {
  useEffect(() => {
    console.log("current", current);
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
        submittedBy: { name, email, organizationName, organizationReference },
      });
    }
  }, [current]);
  //! Setting form for question select with image
  useEffect(() => {
    console.log("imageholder", imageHolder);
    if (imageHolder !== null) {
      setQuestion({
        question:
          "An image has been uploaded, only fill out the answer portion, or select 'clear image'",
        difficulty: "",
        correctAnswer: "",
        wrongAnswerOne: "",
        wrongAnswerTwo: "",
        wrongAnswerThree: "",
        submittedBy: { name, email, organizationName, organizationReference },
      });
    } else {
      setQuestion({
        question: "",
        difficulty: "",
        correctAnswer: "",
        wrongAnswerOne: "",
        wrongAnswerTwo: "",
        wrongAnswerThree: "",
        submittedBy: { name, email, organizationName, organizationReference },
      });
    }
  }, [imageHolder]);
  const [showUpload, setShowUpload] = useState(false);
  const [question, setQuestion] = useState({
    question: "",
    difficulty: "",
    correctAnswer: "",
    wrongAnswerOne: "",
    wrongAnswerTwo: "",
    wrongAnswerThree: "",
    submittedBy: { name, email, organizationName, organizationReference },
  });
  const onEdit = (e) => {
    e.preventDefault();
    let id = current[0]._id;
    editQuestion(id, question);
  };
  const clearImage = () => clearImageState()

  const onChange = (e) =>
    setQuestion({ ...question, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(question);
    {imageHolder?
    
      addQuestion({question: "", imageHolder, difficulty, correctAnswer, wrongAnswerOne, wrongAnswerTwo, wrongAnswerThree}):
      addQuestion(question);
    }
    setQuestion({
      question: "",
      difficulty: "",
      correctAnswer: "",
      wrongAnswerOne: "",
      wrongAnswerTwo: "",
      wrongAnswerThree: "",
      submittedBy: { name, email, organizationName, organizationReference },
    });
  };

  const {
    difficulty,
    correctAnswer,
    wrongAnswerOne,
    wrongAnswerTwo,
    wrongAnswerThree,
  } = question;

  return (
    <div>
      <UploadModal show={showUpload} onHide={() => setShowUpload(false)} />
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
            onClick={(e) => onSubmit(e)}
            className="submitFormButton"
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="warning"
            size="lg"
            block
            onClick={(e) => onEdit(e)}
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
            onClick={(e) => clearCurrent()}
            className="submitFormButton"
          >
            Clear
          </Button>
        ) : (
          <Button
            variant="primary"
            size="lg"
            block
            onClick={(e) => setShowUpload(true)}
            style={{ marginTop: "20px" }}
            className="submitFormButton"
          >
            Upload
          </Button>
        )}
        {imageHolder ?  <Button
          variant="info"
          size="lg"
          block
          onClick={(e) => clearImage(e)}
          style={{ marginTop: "20px" }}
          className="submitFormButton"
        >
          Clear Image
        </Button> : ""}
      </Form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  question: state.question,
});

export default connect(mapStateToProps, {
  addQuestion,
  editQuestion,
  clearCurrent,
  clearImageState
})(QuestionForm);
