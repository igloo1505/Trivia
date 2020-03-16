import React from "react";
import { connect } from "react-redux";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import Smiley from "../assets/smiley.svg";

const NavBar = ({ user: { loggedIn } }) => {
  const NavLinkStyle = {
    marginRight: "10px",
    marginLeft: "auto"
  };
  return (
    <Navbar bg="dark" variant="dark">
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
      <Nav style={NavLinkStyle}>
        {loggedIn ? (
          <Nav>
            <Link to="/admin">Admin</Link>
          </Nav>
        ) : (
          ""
        )}
        {loggedIn ? (
          ""
        ) : (
          <Nav.Link>
            {" "}
            <Link to="/signIn">Sign In</Link>
          </Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
};
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(NavBar);
