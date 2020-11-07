import React, { useState, useEffect } from "react";
import "./App.css";
import Building from "./Building";
import ReserveForm from "./ReserveForm";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Main";
import iit from "./images/iit.png";
import TestButton from "./TestButton";
import Confirmation from "./Confirmation";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import MyAccount from "./MyAccount";

const UnAuthView = ({ responseGoogle }) => {
  // Show Login Button
  return (
    <div className="GoogleButton">
      <GoogleLogin
        clientId="565992343976-3e8cljlucir10s24us3s667l3ujunk29.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        isSignedIn={true}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

const AuthView = ({ logout, user }) => {
  // Show Logout Button
  return (
    <div className="GoogleOutButton">
      <img src={user.image} width="50" height="50" alt="profile img"></img>
      <strong style={{paddingLeft: "15px", paddingRight: "15px"}}>{user.name}</strong>
      <GoogleLogout
        clientId="565992343976-3e8cljlucir10s24us3s667l3ujunk29.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logout}
      />
    </div>
  );
};

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", image: "", googleID: "" });

  const responseGoogle = (res) => {
    const profile = res.getBasicProfile();
    console.log(profile)
    setUser({
      name: profile.getName(),
      email: profile.getEmail(),
      image: profile.getImageUrl(),
      googleID: profile.getId()
    });
  };

  useEffect(() => {
    if (user.email.length > 0 || user.name.length > 0) setIsAuth(true);
  }, [user]);

  const logout = () => {
    setUser({ name: "", email: "", image: "", googleID: "" });
    setIsAuth(false);
  };

  
  return (
    <Router>
      <div className="App">
        <div>
          <a href="/">
            <img
              src={iit}
              width="450"
              alt="iit logo"
              height="100"
              className="iitImage"
            />
          </a>
          {isAuth ? (
            <>
            <MyAccount isAuthed={isAuth} userProfile={user}/>
            <AuthView logout={logout} user={user} />
            </>
          ) : (
            <UnAuthView responseGoogle={responseGoogle} />
          )}
        </div>

        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/:resID/Confirmation" exact component={Confirmation} />
          <Route path="/admin" component={TestButton} />
          <Route
            path="/building/:building"
            exact
            component={Building}
          />
          <Route
            path="/building/:building/:spaceID/ReserveForm"
            exact
            render={() => <ReserveForm isAuthed={isAuth} userProfile={user}/>}
          />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
