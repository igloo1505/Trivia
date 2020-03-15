import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Nav from "./components/Navbar";
import Guest from "./components/Guest";
import SignIn from "./components/SignIn";

function App() {
  const client = new ApolloClient({
    uri: "/graphql"
  });
  return (
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
  );
}

export default App;
