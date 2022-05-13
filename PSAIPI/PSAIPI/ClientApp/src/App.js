import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import Leagues from "./Pages/Leagues/Leagues";
import League from "./Pages/Leagues/League";
import LeagueForm from "./Pages/Leagues/LeagueForm";
import Prizes from "./Pages/Prizes/Prizes";
import Maps from "./Pages/Maps/Maps";
import "./custom.css";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/login-page" component={LoginPage} />
        <Route path="/register-page" component={RegisterPage} />
        <Route path="/leagues" component={Leagues} />
        <Route path="/leagueForm" component={LeagueForm} />
        <Route path="/league/:id" component={League} />
        <Route path="/prizes" component={Prizes} />
      </Layout>
    );
  }
}
