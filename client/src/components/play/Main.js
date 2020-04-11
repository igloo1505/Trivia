import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  correctAnswer,
  wrongAnswer,
  gameOver,
} from "../../actions/play/playActions";
import { getQuestions } from "../../actions/questionActions";
import Play from "./Play";
import Leaderboard from "../Leaderboard";
const Main = ({
  user: {
    user: { organizationReference },
  },
  question: { questions, current, loading },
  play: { questionArray, active, score, totalCorrect, totalIncorrect },
  getQuestions,
  correctAnswer,
  wrongAnswer,
  gameOver,
}) => {
  useEffect(() => {
    if (questionArray && questionArray.length === 0) {
      gameOver();
    }
    // eslint-disable-next-line
  }, [questionArray]);

  return (
    <div>
      {questionArray && questionArray.length >= 1 ? <Play /> : <Leaderboard />}
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  question: state.question,
  play: state.play,
  active: state.play.active,
});

export default connect(mapStateToProps, {
  getQuestions,
  correctAnswer,
  wrongAnswer,
  gameOver,
})(Main);
