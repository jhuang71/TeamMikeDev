import React from "react";
import "./App.css";
import Building from "./Building";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import logo from "./img/logo.png";

function App() {
  return (
    <Router>
      <Navbar bg="light">
        <Navbar.Brand>
          <Link to="/">
            <img
            alt=""
            src={logo}
            width="230"
            height="60"
            className="d-inline-block align-top"
            />{" "}
          </Link>
        </Navbar.Brand>
      </Navbar>
      <div className="App">
        <Switch>
          <Route path="/" exact />
          <Route path="/:building" component={Building} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
