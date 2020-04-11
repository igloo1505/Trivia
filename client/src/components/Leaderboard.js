import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import ScoreModal from "./play/ScoreModal";
import { getLeaders } from "../actions/play/playActions";

const Leaderboard = ({
  user: {
    user: { name, organizationReference, organizationName, city, state },
  },
  play: {
    leaders,
    score,
    totalCorrect,
    totalIncorrect,
    totalQuestions,
    gameEnd,
  },
  getLeaders,
}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    getLeaders(organizationReference);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (gameEnd) {
      setShow(true);
    }
  }, [gameEnd]);

  return (
    <div>
      <ScoreModal show={show} onHide={() => setShow(false)} />
      <h1 style={{ textAlign: "center" }}>{organizationName} Leaderboard</h1>
      <ListGroup
        variant="flush"
        style={{ marginTop: "50px", marginBottom: "50px" }}
      >
        {leaders
          ? leaders.map((leader) => (
              <ListGroup.Item key={leader._id}>
                <span>{leader.name}</span>
                <span style={{ marginLeft: "50px" }}>{leader.city}</span>
                <span
                  style={{
                    float: "right",
                    fontSize: "1.2rem",
                    fontWeight: "200",
                  }}
                >
                  {leader.points}
                </span>
              </ListGroup.Item>
            ))
          : ""}
      </ListGroup>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  play: state.play,
});

export default connect(mapStateToProps, { getLeaders })(Leaderboard);
