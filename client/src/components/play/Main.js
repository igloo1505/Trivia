import React from "react";
import { connect } from "react-redux";
import { correctAnswer, wrongAnswer } from "../../actions/play/playActions";
import { getQuestions } from "../../actions/questionActions";
import Play from "./Play";
const Main = ({
  user: {
    user: { organizationReference },
  },
  question: { questions, current, loading },
  play: { questionArray, active, score, totalCorrect, totalIncorrect },
  getQuestions,
  correctAnswer,
  wrongAnswer,
}) => {
  return (
    <div>
      {questionArray && questionArray.length >= 1 ? (
        <Play />
      ) : (
        <h1>Redirect to finish page here</h1>
      )}
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
})(Main);
