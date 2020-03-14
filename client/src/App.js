import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Nav from "./components/Navbar";
import Guest from "./components/Guest";
import SignIn from "./components/SignIn";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Nav />
          <div className="container" style={{ marginTop: "30px" }}>
            <Switch>
              <Route exact path="/signIn" component={SignIn} />
              <Route exact path="/" component={Guest} />
            </Switch>
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
