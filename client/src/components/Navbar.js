import React, { useState } from "react";
import { connect } from "react-redux";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { logOut } from "../actions/userActions";

import Smiley from "../assets/smiley.svg";

const NavBar = ({
  user: {
    loggedIn,
    user,
    organization: { organizationName, displayName },
  },
  organization,
  logOut,
}) => {
  const NavLinkStyle = {
    marginRight: "10px",
    marginLeft: "auto",
  };
  const [expandedState, setExpandedState] = useState(false);

  return (
    <Navbar
      collapseOnSelect
      bg="dark"
      variant="dark"
      expand="lg"
      expanded={expandedState}
    >
      <Navbar.Brand>
        <img
          alt=""
          src={Smiley}
          width="30"
          height="30"
          className="d-inline-block align-top"
          style={{ marginRight: "10px" }}
        />{" "}
        {loggedIn ? (
          <Link to="/"> {displayName}</Link>
        ) : (
          <Link to="/"> Javascript Trivia</Link>
        )}
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="mobileHamburger"
        onClick={() => setExpandedState(!expandedState)}
      />
      <Navbar.Collapse id="mobileHamburger">
        <Nav style={NavLinkStyle}>
          {loggedIn ? (
            <Nav>
              <Link to="/" onClick={() => setExpandedState(false)}>
                Home
              </Link>{" "}
              <Link to="/leaderboard" onClick={() => setExpandedState(false)}>
                LeaderBoard
              </Link>{" "}
              {user.adminStatus ? (
                <Link to="/admin" onClick={() => setExpandedState(false)}>
                  Admin
                </Link>
              ) : (
                ""
              )}
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
              <Link to="/signIn" onClick={() => setExpandedState(false)}>
                Sign In
              </Link>
            </Nav>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logOut })(NavBar);
