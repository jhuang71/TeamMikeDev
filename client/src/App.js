import React from "react";
import "./App.css";
import Building from "./Building";
import ReserveForm from "./ReserveForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Main"
import iit from './images/iit.png';
import TestButton from "./TestButton";


function App() {
  return (
    <Router>
      <div className="App">
        <a href="/"><img src={iit} width="500" alt="iit logo" height="110" class="iitImage" /></a>

        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/ReserveForm" exact component={ReserveForm} />
          <Route path="/:building" component={Building} />
        </Switch>
        <TestButton />
      </div>
    </Router>
  );
}

export default App;
