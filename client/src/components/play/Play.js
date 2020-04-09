import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getQuestions } from "../../actions/questionActions";
import { correctAnswer, wrongAnswer } from "../../actions/play/playActions";
import firebase from "firebase";
import { setLoading } from "../../actions/userActions";
import Timer from "./Timer";

const Play = ({
  user: {
    user: { organizationReference },
  },
  question: { questions, current, loading },
  play: { questionArray, active, score, totalCorrect, totalIncorrect },
  getQuestions,
  correctAnswer,
  wrongAnswer,
}) => {
  const [questionDisplay, setQuestionDisplay] = useState(null);
  useEffect(() => {
    getQuestions(organizationReference);
  }, []);

  const [image, setImage] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  var storage = firebase.storage();
  var storageRef = storage.ref();
  useEffect(() => {
    if ("imageHolder" in active) {
      const asyncFunc = async () => {
        setLoading(true);
        setImage(true);
        await storageRef
          .child(active.imageHolder)
          .getDownloadURL()
          .then(function (url) {
            setImageSrc(url);
            console.log("url returns ", url);
          })
          .catch(function (error) {
            console.log(error);
          });
      };
      asyncFunc();
      setLoading(false);
    } else {
      setImage(false);
      setQuestionDisplay(active.question);
    }
  }, [active, getQuestions, correctAnswer]);

  const setAnswer = (index) => {
    if (randomizedAnswerArray[index] === active.correctAnswer) {
      correctAnswer(active);
    } else if (randomizedAnswerArray[index] !== active.correctAnswer) {
      wrongAnswer(active);
    }
  };
  let answerArray = [
    active.correctAnswer,
    active.wrongAnswerOne,
    active.wrongAnswerTwo,
    active.wrongAnswerThree,
  ];
  let randomizedAnswerArray = [];
  for (var i = 0; i < 4; i++) {
    let random = Math.floor(Math.random() * answerArray.length);
    randomizedAnswerArray.push(answerArray[random]);
    answerArray.splice(random, 1);
  }
  console.log("active returns ", active);
  const questionImage = {
    maxWidth: "80%",
    objectFit: "cover",
  };

  return (
    <div>
      <Timer />
      <div className="QuestionContainer">
        {loading ? (
          <h1>test</h1>
        ) : image ? (
          loading ? (
            <h1>Loading</h1>
          ) : (
            <img
              alt=""
              src={imageSrc}
              className="d-inline-block align-top"
              style={questionImage}
            />
          )
        ) : (
          <h3>{questionDisplay}</h3>
        )}
      </div>
      <div className="answerGrid">
        {loading ? (
          <h1>test</h1>
        ) : (
          <div
            className="answerContainer"
            value="0"
            onClick={(e) => setAnswer(0)}
          >
            <h3 className="answerText">{randomizedAnswerArray[0]}</h3>
          </div>
        )}
        {loading ? (
          <h1>test</h1>
        ) : (
          <div
            className="answerContainer"
            value="1"
            onClick={(e) => setAnswer(1)}
          >
            <h3 className="answerText">{randomizedAnswerArray[1]}</h3>
          </div>
        )}
        {loading ? (
          <h1>test</h1>
        ) : (
          <div
            className="answerContainer"
            value="2"
            onClick={(e) => setAnswer(2)}
          >
            <h3 className="answerText">{randomizedAnswerArray[2]}</h3>
          </div>
        )}
        {loading ? (
          <h1>test</h1>
        ) : (
          <div
            className="answerContainer"
            value="3"
            onClick={(e) => setAnswer(3)}
          >
            <h3 className="answerText">{randomizedAnswerArray[3]}</h3>
          </div>
        )}
      </div>
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
})(Play);
