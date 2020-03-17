import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Col, Row, Modal, Table } from "react-bootstrap";
import {
  getQuestions,
  setCurrent,
  clearCurrent
} from "../../actions/questionActions";
import DetailModal from "./DetailModal";

const ListView = ({
  user: {
    user: { adminStatus, organizationReference, organizationName }
  },
  question: { questions, filtered, current },
  getQuestions,
  setCurrent,
  clearCurrent
}) => {
  console.log(adminStatus, organizationName, organizationReference);
  useEffect(() => {
    getQuestions(organizationReference);
  }, []);
  const [show, setShow] = useState(false);
  const triggerDetail = e => {
    console.log("e ran as ", e);
    let att = e.getAttribute("value");
    console.log("attribute ", att);
    setCurrent(att);
    setShow(true);
  };
  const onHide = () => {
    setShow(false);
    clearCurrent();
  };

  return (
    <Fragment>
      <DetailModal show={show} onHide={() => onHide} />
      <Table
        striped
        bordered
        hover
        style={{ marginTop: "20px" }}
        onClick={e => triggerDetail(e.target)}
      >
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
              ? filtered.map(ques => (
                  <tr key={ques._id}>
                    <td>{ques.difficulty}</td>
                    <td value={ques._id}>{ques.question}</td>
                    <td>{ques.submittedBy}</td>
                  </tr>
                ))
              : questions.map(ques => (
                  <tr key={ques._id}>
                    <td>{ques.difficulty}</td>
                    <td value={ques._id}>{ques.question}</td>
                    <td>{ques.submittedBy.name}</td>
                  </tr>
                ))}
          </tbody>
        ) : (
          ""
        )}
      </Table>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.user,
  question: state.question
});

export default connect(mapStateToProps, {
  getQuestions,
  setCurrent,
  clearCurrent
})(ListView);
