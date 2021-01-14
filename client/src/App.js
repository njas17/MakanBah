import React, { useContext, createContext, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";


function App() {

  return (
    <div>

      <Router>
        <div>
          <div className="navmakan">
            <Link to="/">Home</Link> 
            <Link to="/login">Login</Link> 
            <Link to="/main">Main</Link> 
          </div>
          <Switch>
            <Route path="/">
              <HomePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}



export default App;