import React, { Fragment, useState } from "react";
import { Col, Row, Modal, Table } from "react-bootstrap";
import store from "../../store";
import { deleteQuestion, editQuestion } from "../../actions/questionActions";
import { connect } from "react-redux";

const DetailModal = ({
  user: {
    user: { adminStatus, organizationReference, organizationName }
  },
  question: { questions, filtered, current },
  getQuestions,
  setCurrent,
  clearCurrent,
  show,
  onHide
}) => {
  const state = store.getState();
  if (current) {
    console.log(state.question.current.question);
    console.log("questions in state as ", current.submittedBy);
    console.log("questions in state as array", current[0].submittedBy);
  }

  return (
    <Fragment>
      {current !== null ? (
        <Modal
          show={show}
          onHide={onHide()}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              {current ? current[0].question : ""}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
        </Modal>
      ) : (
        ""
      )}
    </Fragment>
  );
};
const mapStateToProps = state => ({
  user: state.user,
  question: state.question
});

export default connect(mapStateToProps, { editQuestion, deleteQuestion })(
  DetailModal
);
