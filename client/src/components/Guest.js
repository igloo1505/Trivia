import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Route, Redirect } from "react-router-dom";
import { Jumbotron, Container, Button } from "react-bootstrap";
import { setPlayState } from "../actions/play/playActions";
import InsufficientToast from "./play/InsufficientToast";

const Guest = ({
  user: {
    loggedIn,
    user: { name, organizationReference },
  },
  play: questionArray,
  setPlayState,
}) => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setPlayState(organizationReference);
  }, []);
  useEffect(() => {
    for (var i = 0; i < questionArray.length; i++) {
      if (questionArray[i] == null) {
        debugger;
        console.log("this atleast ran");
        setShow(true);
      }
    }
  }, [questionArray]);
  const handlePlay = (e) => {
    console.log("call async randomize here");
    // setPlayState(organizationReference);
  };
  return (
    <div>
      <InsufficientToast show={show} />
      <Jumbotron fluid>
        <Container>
          {loggedIn ? <h1>Welcome {name}! </h1> : <h1>"Welcome!"</h1>}
          <p>
            This is a trivia game built using React, Node, and Express, as well
            as some smaller packages for Authentication and input handling. Feel
            free to play as a guest, and if you're lucky maybe you can add your
            name to the leader board.
          </p>
          <p>
            <Link to="/play">
              <Button
                variant="primary"
                size="lg"
                className="playButton"
                onClick={(e) => handlePlay(e)}
              >
                Play
              </Button>
            </Link>
          </p>
        </Container>
      </Jumbotron>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  play: state.play,
});

export default connect(mapStateToProps, { setPlayState })(Guest);
