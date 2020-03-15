import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, user, ...rest }) => {
  //   const { isAuthenticated, loading } = authContext;
  const { loggedIn, loading } = user;
  return (
    <Route
      {...rest}
      render={props =>
        !loggedIn && !loading ? (
          <Redirect to="/signIn" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(PrivateRoute);
