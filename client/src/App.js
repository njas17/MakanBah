import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AdminPage from "./components/AdminPage";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
          <Route path="/">
              <LoginPage />
            </Route>
            <Route path="/landingpage">
              <LandingPage />
            </Route>
            <Route path="/adminpage">
              <AdminPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;