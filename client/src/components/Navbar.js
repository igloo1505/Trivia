import React from "react";
import { Nav, Navbar } from "react-bootstrap";

import Smiley from "../assets/smiley.svg";

const NavBar = () => {
  const NavLinkStyle = {
    marginRight: "10px",
    marginLeft: "auto"
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src={Smiley}
          width="30"
          height="30"
          className="d-inline-block align-top"
          style={{ marginRight: "10px" }}
        />{" "}
        Javascript Trivia
      </Navbar.Brand>
      <Nav style={NavLinkStyle}>
        <Nav.Link href="./signIn">Sign In</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
