import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Col, Row, Modal, Table } from "react-bootstrap";
import {
  getQuestions,
  setCurrent,
  clearCurrent,
} from "../../actions/questionActions";
import DetailModal from "./DetailModal";

const ListView = ({
  user: {
    user: { adminStatus, organizationReference, organizationName },
  },
  question: { questions, filtered, current },
  getQuestions,
  setCurrent,
  clearCurrent,
  onSelect,
}) => {
  useEffect(() => {
    getQuestions(organizationReference);
  }, []);
  const [show, setShow] = useState(false);
  const triggerDetail = (e) => {
    let att = e.getAttribute("value");

    setCurrent(att);
    setShow(true);
  };
  const onHide = () => {
    setShow(false);
    clearCurrent();
  };

  return (
    <Fragment>
      <DetailModal
        show={show}
        setShow={() => setShow()}
        onHide={() => onHide}
        onSelect={onSelect}
      />
      <Table striped bordered hover style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Difficulty</th>
            <th>Question</th>
            <th>Submitted By</th>
          </tr>
        </thead>
        {questions !== null ? (
          <tbody>
            {filtered !== null
              ? filtered.map((ques) => (
                  <tr key={ques._id}>
                    <td value={ques._id}>{ques.difficulty}</td>
                    <td value={ques._id}>{ques.question}</td>
                    <td value={ques._id}>{ques.submittedBy}</td>
                  </tr>
                ))
              : questions.map((ques) => (
                  <tr key={ques._id} onClick={(e) => triggerDetail(e.target)}>
                    <td value={ques._id}>{ques.difficulty}</td>
                    <td value={ques._id}>
                      {"imageHolder" in ques ? "Image" : ques.question}
                    </td>
                    <td value={ques._id}>{ques.submittedBy.name}</td>
                  </tr>
                ))}
          </tbody>
        ) : (
          <Fragment></Fragment>
        )}
      </Table>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  question: state.question,
});

export default connect(mapStateToProps, {
  getQuestions,
  setCurrent,
  clearCurrent,
})(ListView);
