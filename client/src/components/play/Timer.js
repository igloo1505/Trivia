import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { gameOver } from "../../actions/play/playActions";
import { useHistory } from "react-router-dom";

const Timer = ({
  user: {
    organization: { organizationTime },
  },
  gameOver,
}) => {
  let history = useHistory();
  const redirectFunc = () => {
    history.push("/leaderboard");
  };

  const [time, setTime] = useState(organizationTime);
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
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { gameOver })(Timer);
