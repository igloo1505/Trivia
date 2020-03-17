import React from "react";
import { Jumbotron, Container, Button } from "react-bootstrap";

const Guest = () => {
  return (
    <div>
      <Jumbotron fluid>
        <Container>
          <h1>Welcome!</h1>
          <p>
            This is a trivia game built using React, Node, and Express, as well
            as some smaller packages for Authentication and input handling. Feel
            free to play as a guest, and if you're lucky maybe you can add your
            name to the leader board.
          </p>
          <p>
            <Button variant="primary">Play</Button>
          </p>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Guest;
