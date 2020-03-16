import React from "react";
import "./assets/app.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./actions/auth/PrivateRoute";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { connect } from "react-redux";
import Nav from "./components/Navbar";
import Guest from "./components/Guest";
import SignIn from "./components/SignIn";
import Admin from "./components/admin/Admin";

function App({ user: { loggedIn } }) {
  const client = new ApolloClient({
    uri: "/graphql"
  });
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
