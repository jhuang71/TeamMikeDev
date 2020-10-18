import React from "react";
import "./App.css";
import Building from "./Building";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Main from "./Main"
import iit from './images/iit.png';


function App() {
  return (
    <Router>
      <div className="App">
      <a href="/"><img src={iit} width="500" alt="iit logo" height="110" class="iitImage"/></a>

        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/:building" component={Building} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
