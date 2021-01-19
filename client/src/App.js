import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import LoginPage from "./components/LoginPage";
// import {
//   BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useLocation
// } from "react-router-dom";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";
import RegistrationPage from "./components/RegistrationPage";
import { getToken, getUser, removeUserSession } from "./session";

//the main page should have the state whether user is logged in (at least)
//& the token is validated (optional). if this is true, the login link is not visible, instead
//show the logout link. On the opposite, if user is not logged in then login is visible,
// restaurants should be hidden

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      //token: null,
      user: {}
    }
  }

  //get token from session
  componentDidMount = () => {
    const token = getToken();
    if (!token) {
      return;
    }

    const user = getUser();
    if (!user) {
      return;
    }

    fetch("/auth/verify-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({token, user})
    })
      .then(response => response.json())
      .then(data => {
          this.setState({
            isAuthenticated: true,
            user: data.user
          })
      })
      .catch(error => {
        console.error("Error in verify token: ", error);
        this.logout();
      });
  }

  logout = () => {
    removeUserSession();
    this.setState({ isAuthenticated: false});
  }

  setToken = (obj) => {
    this.setState({
      //token: obj.token,
      user: obj.user,
      isAuthenticated: true
    });
  }

  render() {
    const isAuthenticated = this.state.isAuthenticated;

    return (
      <div>
        <BrowserRouter>
          <div>
            <div className="navmakan">
              <NavLink to="/">Home</NavLink >
              { (!isAuthenticated) ? (
              <NavLink to="/loginpage">Login</NavLink >
              ) : (
              <div className="inline">
                <NavLink to="/landingpage">Restaurants</NavLink >
                <NavLink to="/" onClick={() => this.logout()}>Logout</NavLink>
              </div>
              )}
            </div>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route path="/loginpage" component={() =><LoginPage signin={authObj => this.setToken(authObj)} isAuthenticated={isAuthenticated} />} />
              <Route path="/landingpage">
                <LandingPage isAuthenticated={isAuthenticated} />
              </Route>
              <Route path="/registrationpage">
                <RegistrationPage />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}


export default App;