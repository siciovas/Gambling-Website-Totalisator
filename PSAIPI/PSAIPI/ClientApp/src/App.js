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
import Chat from "./Pages/LiveChat/Chat";
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import Maps from "./Pages/Maps/Maps";
import "./custom.css";
import PrivateRoute from "./components/PrivateRoute";

export default class App extends Component {
  static displayName = App.name;

  constructor(props){
    super(props);
    this.state = {notify: false };
  }
  
  componentDidMount(){
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7217/chat")
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      this.setState({ connection: connection })

      connection.on("NotifySupport", (message) => {
        console.log(message);
      });
      connection.start();
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <Layout>
        <PrivateRoute path="/" component={Home} exact />
        <Route path="/login-page" component={LoginPage} />
        <Route path="/register-page" component={RegisterPage} />
        <PrivateRoute path="/leagues" component={Leagues} />
        <PrivateRoute path="/leagueForm" component={LeagueForm} />
        <PrivateRoute path="/league/:id" component={League} />
        <PrivateRoute path="/prizes" component={Prizes} />
        <PrivateRoute path="/matches" component={Matches} />
        <PrivateRoute path="/match/:id/bets" component={MatchWithBets} />
        <PrivateRoute path="/maps" component={Maps} />
        <PrivateRoute path="/supportChat" component={Chat} />
      </Layout>
    );
  }
}
