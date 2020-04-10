import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { gameOver } from "../../actions/play/playActions";
import { useHistory } from "react-router-dom";
const Timer = ({ gameOver }) => {
  let history = useHistory();
  const redirectFunc = () => {
    history.push("/leaderboard");
  };

  const [time, setTime] = useState(30);
  useEffect(() => {
    let timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);
    if (time <= 0) {
      gameOver();
      redirectFunc();
      clearTimeout(timer);
    }
  }, [time]);

  return (
    <div>
      <h1>{time}</h1>
    </div>
  );
};

export default connect(null, { gameOver })(Timer);
