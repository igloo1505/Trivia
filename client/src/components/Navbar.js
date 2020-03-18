import React, { useState } from "react";
import { connect } from "react-redux";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logOut } from "../actions/userActions";

import Smiley from "../assets/smiley.svg";

const NavBar = ({ user: { loggedIn }, logOut }) => {
  const NavLinkStyle = {
    marginRight: "10px",
    marginLeft: "auto"
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>
        <img
          alt=""
          src={Smiley}
          width="30"
          height="30"
          className="d-inline-block align-top"
          style={{ marginRight: "10px" }}
        />{" "}
        <Link to="/">Javascript Trivia</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="mobileHamburger" />
      <Navbar.Collapse id="mobileHamburger">
        <Nav style={NavLinkStyle}>
          {loggedIn ? (
            <Nav>
              <Link to="/">Home</Link> <Link to="/">LeaderBoard</Link>{" "}
              <Link to="/admin">Admin</Link>{" "}
              <Link to="/" onClick={logOut}>
                Log Out
              </Link>
            </Nav>
          ) : (
            ""
          )}
          {loggedIn ? (
            ""
          ) : (
            <Nav>
              {" "}
              <Link to="/signIn">Sign In</Link>
            </Nav>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, { logOut })(NavBar);
