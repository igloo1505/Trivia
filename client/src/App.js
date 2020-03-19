import React from "react";
import "./assets/app.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import setAuthToken from "./setToken";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./actions/auth/PrivateRoute";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { connect } from "react-redux";
import Nav from "./components/Navbar";
import Guest from "./components/Guest";
import SignIn from "./components/SignIn";
import Play from "./components/play/Play";
import Admin from "./components/admin/Admin";

function App({ user: { loggedIn } }) {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Nav />
          <div className="container" style={{ marginTop: "30px" }}>
            <Switch>
              <PrivateRoute exact path="/" component={Guest} />
              <Route exact path="/signIn" component={SignIn} />
              <PrivateRoute exact path="/admin" component={Admin} />
              <PrivateRoute exact path="/play" component={Play} />
            </Switch>
          </div>
        </Router>
      </div>
    </Provider>
  );
}
const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(App);
