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
  const getUser = async (gid) => {
    try {
      const res = await fetch("http://localhost:5000/get/user/" + gid);
      const data = await res.json();
      if (data === undefined || data.length == 0) {
        return false;
      }
      else {
        return true;
      }
    } catch(error) {
      console.error(error.message);
    }
  }

  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", image: "", googleID: "" });

  const responseGoogle = (res) => {
    const profile = res.getBasicProfile();    
    console.log(profile)

    setName(profile.getName());
    setId(profile.getId());
    setEmail(profile.getEmail());

    setUser({
      name: profile.getName(),
      email: profile.getEmail(),
      image: profile.getImageUrl(),
      googleID: profile.getId()
    });

    getUser(profile.getId()).then((res) => {
      if (!res) {
        console.log("user not exist");
        googleInfo();
      }
    })
  };

  const logout = () => {
    setUser({ name: "", email: "", image: "", googleID: "" });
    setIsAuth(false);
  };

// Works but weird. 
// Uploads the info a bunch of times but doesnt miss data anymore

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const googleInfo = async () => {
    const body = {
      user_id: id,
      user_name: name,
      user_email: email,
    };
    const response = await fetch("http://localhost:5000/addGoogle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const jsonData = await response.json()
    console.log("Response from inputting:\n", jsonData);
  };

  useEffect(() => {
    if (user.email.length > 0 || user.name.length > 0) {
      setIsAuth(true);
    }
  }, [user]);
  
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
            <AuthView logout={logout} user={user}/>
            </>
          ) : (
            <UnAuthView responseGoogle={responseGoogle}/>
          )}
        </div>

        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/:building/:resID/Confirmation" exact component={Confirmation} />
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
