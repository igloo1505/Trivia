import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const Scorecard = ({ play: { score } }) => {
  const [scoreDisplay, setScoreDisplay] = useState(0);
  useEffect(() => {
    setScoreDisplay(score);
  }, [score]);

  return (
    <div>
      <h1>{scoreDisplay}</h1>
    </div>
  );
};
const mapStateToProps = (state) => ({
  play: state.play,
});

export default connect(mapStateToProps)(Scorecard);
