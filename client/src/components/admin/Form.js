import React, { useState, useContext, useEffect } from "react";
import { Form, Col, Row, Button, Modal } from "react-bootstrap";
import dataListArray from "../../assets/datalist";
import { connect } from "react-redux";
import { addQuestion } from "../../actions/questionActions";
import uuid from "uuid";

const QuestionForm = ({
  user: {
    loggedIn,
    loading,
    user: { name, email, organizationName, organizationReference, city }
  },
  addQuestion
}) => {
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
    difficulty: "",
    correctAnswer: "",
    wrongAnswerOne: "",
    wrongAnswerTwo: "",
    wrongAnswerThree: "",
    submittedBy: { name, email, organizationName, organizationReference }
  });

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
  const RowStyle = {
    margin: "50px"
  };

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
            defaultValue={[question.difficulty]}
            onChange={onChange}
          >
            <option value="100">Trump</option>
            <option value="200">Well trained monkey</option>
            <option value="300">C student</option>
            <option value="400">"Chad" from accounting</option>
            <option value="500">Einstein</option>
          </Form.Control>
        </Form.Group>
        <Row style={RowStyle}>
          <Col xs={12} md={6} style={{ marginTop: "5px" }}>
            <Form.Control
              placeholder="Correct Answer"
              name="correctAnswer"
              value={question.correctAnswer}
              onChange={onChange}
            />
          </Col>
          <Col xs={12} md={6} style={{ marginTop: "5px" }}>
            <Form.Control
              placeholder="Wrong Answer"
              name="wrongAnswerOne"
              value={question.wrongAnswerOne}
              onChange={onChange}
            />
          </Col>
        </Row>
        <Row style={RowStyle}>
          <Col xs={12} md={6} style={{ marginTop: "5px" }}>
            <Form.Control
              placeholder="Wrong Answer"
              name="wrongAnswerTwo"
              value={question.wrongAnswerTwo}
              onChange={onChange}
            />
          </Col>
          <Col xs={12} md={6} style={{ marginTop: "5px" }}>
            <Form.Control
              placeholder="Wrong Answer"
              name="wrongAnswerThree"
              value={question.wrongAnswerThree}
              onChange={onChange}
            />
          </Col>
        </Row>
        <Button
          variant="primary"
          size="lg"
          block
          onClick={e => onSubmit(e)}
          style={{ width: "70%", margin: "auto" }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { addQuestion })(QuestionForm);
