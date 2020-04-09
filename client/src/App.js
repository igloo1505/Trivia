import React from "react";
import "./assets/app.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScoreModal from "./components/play/ScoreModal";
import setAuthToken from "./setToken";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./actions/auth/PrivateRoute";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Main from "./components/play/Main";
import { connect } from "react-redux";
import Nav from "./components/Navbar";
import Leaderboard from "./components/Leaderboard";
import Guest from "./components/Guest";
import SignIn from "./components/SignIn";
import Play from "./components/play/Play";
import Admin from "./components/admin/Admin";
import UploadModal from "./components/admin/UploadModal";

function App({ user: { loggedIn } }) {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return (
    <Provider store={store}>
      <div className="App">
        <ScoreModal />
        <Router>
          <Nav />
          <div className="container" style={{ marginTop: "30px" }}>
            <Switch>
              <PrivateRoute exact path="/" component={Guest} />
              <Route exact path="/signIn" component={SignIn} />
              <Route exact path="/leaderboard" component={Leaderboard} />
              <PrivateRoute exact path="/admin" component={Admin} />
              <PrivateRoute exact path="/play" component={Main} />
              <PrivateRoute exact path="/upload" component={UploadModal} />
            </Switch>
          </div>
        </Router>
      </div>
    </Provider>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(App);
