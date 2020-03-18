import React from "react";
import { connect } from "react-redux";
import { Jumbotron, Container, Button } from "react-bootstrap";

const Guest = ({
  user: {
    loggedIn,
    user: { name }
  }
}) => {
  return (
    <div>
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
            <Button variant="primary" size="lg" className="playButton">
              Play
            </Button>
          </p>
        </Container>
      </Jumbotron>
    </div>
  );
};
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Guest);
