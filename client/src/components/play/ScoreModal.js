import React from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { resetStatus, setLeader } from "../../actions/play/playActions";

const ScoreModal = ({
  user: {
    user: { name, organizationReference, organizationName, city, state },
  },
  play: { score, totalCorrect, totalIncorrect, totalQuestions, gameEnd },
  resetStatus,
  setLeader,
  ...props
}) => {
  const resetGame = () => {
    props.onHide();
    resetStatus();
  };
  const leader = {
    name: name,
    organizationReference: organizationReference,
    organizationName: organizationName,
    city: city,
    state: state,
    points: score,
  };

  const submitScore = () => {
    props.onHide();
    setLeader(leader);
  };

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {organizationName}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{name}</h4>
          <p>
            Congratulations {name}! You scored {score} points. That's from{" "}
            {totalCorrect.length} correct guesses and {totalIncorrect.length}{" "}
            incorrect guesses over {totalQuestions ? totalQuestions : 0} total
            questions.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => submitScore()}>
            Submit High Score
          </Button>
          <Button onClick={() => resetGame()}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  play: state.play,
});

export default connect(mapStateToProps, { resetStatus, setLeader })(ScoreModal);
