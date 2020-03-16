import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  user: { loggedIn, loading },
  component: Component,
  user,
  ...rest
}) => {
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
