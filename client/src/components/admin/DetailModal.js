import React, { Fragment, useState } from "react";
import { Col, Row, Modal, Button, Table } from "react-bootstrap";
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

  return (
    <Fragment>
      {current !== null ? (
        <Modal
          show={show}
          onHide={onHide()}
          dialogClassName="modal-90w"
          aria-labelledby="detailModal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="detailModal">
              {current ? current[0].question : ""}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row style={{ marginTop: "50px" }}>
              <Col
                xs={12}
                md={6}
                style={{
                  textAlign: "center",
                  fontSize: "1.5rem",
                  textDecoration: "underline"
                }}
              >
                {current ? current[0].correctAnswer : ""}
              </Col>
              <Col
                xs={12}
                md={6}
                style={{ textAlign: "center", fontSize: "1.2rem" }}
              >
                {current ? current[0].wrongAnswerOne : ""}
              </Col>
            </Row>
            <Row className="mobileEditRow">
              <Col
                xs={12}
                md={6}
                style={{ textAlign: "center", fontSize: "1.2rem" }}
              >
                {current ? current[0].wrongAnswerTwo : ""}
              </Col>
              <Col
                xs={12}
                md={6}
                style={{ textAlign: "center", fontSize: "1.2rem" }}
              >
                {current ? current[0].wrongAnswerThree : ""}
              </Col>
            </Row>
            <Row>
              <p
                style={{
                  marginTop: "auto",
                  marginBottom: "0px",
                  marginLeft: "10px",
                  fontSize: "0.8rem"
                }}
                className="desktopSubmittedBy"
              >
                Submitted By: {current ? current[0].submittedBy.name : ""}
              </p>
              <Button
                type="submit"
                variant="danger"
                className="mobileEditButtons"
              >
                Delete!
              </Button>
              <Button
                type="submit"
                variant="warning"
                className="mobileEditButtons"
              >
                Edit
              </Button>
            </Row>
            <Row>
              <p
                style={{
                  marginTop: "10px",
                  marginBottom: "0px",
                  marginLeft: "10px",
                  fontSize: "0.8rem"
                }}
                className="mobileSubmittedBy"
              >
                Submitted By: {current ? current[0].submittedBy.name : ""}
              </p>
            </Row>
          </Modal.Body>
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
