import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ScoreModal from "./play/ScoreModal";

const Leaderboard = ({
  user: {
    user: { name, organizationName, city, state },
  },
  play: { score, totalCorrect, totalIncorrect, totalQuestions, gameEnd },
}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (gameEnd) {
      setShow(true);
    }
    return () => {
      console.log("cleanup here");
    };
  }, [gameEnd]);

  return (
    <div>
      <ScoreModal show={show} onHide={() => setShow(false)} />
      <h1>Leaderboard goes here</h1>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  play: state.play,
});

export default connect(mapStateToProps)(Leaderboard);
