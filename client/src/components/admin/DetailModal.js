import React, { Fragment } from "react";
import { Col, Row, Modal, Button } from "react-bootstrap";

import { deleteQuestion, editQuestion } from "../../actions/questionActions";
import { setMenuView } from "../../actions/userActions";
import { connect } from "react-redux";

const DetailModal = ({
  user: {
    user: { adminStatus, organizationReference, organizationName },
  },
  question: { questions, filtered, current },
  getQuestions,
  setCurrent,
  clearCurrent,
  show,
  setShow,
  setKey,
  onHide,
  deleteQuestion,
  key,
  reRoute,
  onSelect,
  onEdit,
  editQuestion,
}) => {
  const onDelete = (e) => {
    e.preventDefault();

    let id = current[0]._id;
    setShow();
    deleteQuestion(id);
  };
  onEdit = (e) => {
    e.preventDefault();

    onSelect("Submit");
    setShow();
  };

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
            <Modal.Title id="detailModal" style={{ fontSize: "1.3rem" }}>
              {current ? current[0].question : ""}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="topMobileRow">
              <Col
                xs={12}
                md={6}
                style={{
                  textAlign: "center",
                  fontSize: "1.2rem",
                  textDecoration: "underline",
                }}
                className="mobilePadding"
              >
                {current ? current[0].correctAnswer : ""}
              </Col>
              <Col
                xs={12}
                md={6}
                style={{ textAlign: "center", fontSize: "1.2rem" }}
                className="mobilePadding"
              >
                {current ? current[0].wrongAnswerOne : ""}
              </Col>
            </Row>
            <Row className="mobileEditRow">
              <Col
                xs={12}
                md={6}
                style={{ textAlign: "center", fontSize: "1.2rem" }}
                className="mobilePadding"
              >
                {current ? current[0].wrongAnswerTwo : ""}
              </Col>
              <Col
                xs={12}
                md={6}
                style={{ textAlign: "center", fontSize: "1.2rem" }}
                className="mobilePadding"
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
                  fontSize: "0.8rem",
                }}
                className="desktopSubmittedBy"
              >
                Submitted By: {current ? current[0].submittedBy.name : ""}
              </p>
              <Button
                type="submit"
                variant="danger"
                className="mobileEditButtons deleteButton"
                onClick={(e) => onDelete(e)}
              >
                Delete!
              </Button>
              <Button
                type="submit"
                variant="warning"
                className="mobileEditButtons"
                onClick={(e) => onEdit(e)}
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
                  fontSize: "0.8rem",
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
const mapStateToProps = (state) => ({
  user: state.user,
  question: state.question,
});

export default connect(mapStateToProps, {
  editQuestion,
  deleteQuestion,
  setMenuView,
})(DetailModal);
