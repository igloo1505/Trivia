import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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

        setShow(true);
      }
    }
  }, [questionArray]);
  const handlePlay = (e) => {
    // setPlayState(organizationReference);
  };

  return (
    <div>
      <InsufficientToast show={show} />
      <Jumbotron fluid>
        <Container>
          {loggedIn ? <h1>Welcome {name}! </h1> : <h1>"Welcome!"</h1>}
          <p>
            This is a trivia game built using React, Node, Express, and
            Firebase, as well as some smaller packages for Authentication and
            input handling. A unique organization code is required to play. Each
            organization will have one Admin access code, which will allow the
            admin to create their own User access code.
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
