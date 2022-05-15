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
import Matches from "./Pages/Matches/Matches";
import MatchWithBets from "./Pages/Matches/MatchWithBets";
import Maps from "./Pages/Maps/Maps";
import "./custom.css";
import PrivateRoute from "./components/PrivateRoute";

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <PrivateRoute path="/" component={Home} exact />
        <Route path="/login-page" component={LoginPage} />
        <PrivateRoute path="/register-page" component={RegisterPage} />
        <PrivateRoute path="/leagues" component={Leagues} />
        <PrivateRoute path="/leagueForm" component={LeagueForm} />
        <PrivateRoute path="/league/:id" component={League} />
        <PrivateRoute path="/prizes" component={Prizes} />
        <PrivateRoute path="/matches" component={Matches} />
        <PrivateRoute path="/match/:id/bets" component={MatchWithBets} />
        <PrivateRoute path="/maps" component={Maps} />
      </Layout>
    );
  }
}
