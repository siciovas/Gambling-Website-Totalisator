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
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import Maps from "./Pages/Maps/Maps";
import Bets from "./Pages/Bets/Bets";
import Bet from "./Pages/Bets/Bet";
import BetForm from "./Pages/Bets/BetForm";
import ResetPassword from "./Pages/ResetPassword";
import "./custom.css";
import PrivateRoute from "./components/PrivateRoute";
import { ToastContainer, toast } from "react-toastify";
import SupportRating from "./Pages/SupportRating/SupportRating";
import InviteFriend from "./Pages/InviteFriend/InviteFriend";
import GenerateInviteFriendLink from "./Pages/InviteFriend/GenerateInviteFriendLink";
import MatchesResults from "./Pages/SetEventResults/MatchesResults";
import MatchWithBetsResults from "./Pages/SetEventResults/MatchWithBetsResults";

export default class App extends Component {
  static displayName = App.name;

  constructor(props) {
    super(props);
    this.state = {notify: false, connection: null };
  }
  
  async componentDidMount(){
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7217/chat")
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      const roleId = localStorage.getItem("roleId");

     

      console.log(roleId);
      connection.on("NotifySupport", (message) => {
        if (roleId == 2) {
          this.toastError();
        }
      });
     
      connection.start();
      this.setState({ connection: connection })
    } catch (e) {
      console.log(e);
    }
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": "api-basketball.p.rapidapi.com",
        "X-RapidAPI-Key": "b681a7b402msh4470b0de5525d25p1d48f1jsne1e6bb92413b",
      },
    };
    this.timer = setInterval(async () => {
      const data = await fetch(
        `https://api-basketball.p.rapidapi.com/odds?league=12&season=2021-2022`,
        options
      );
      const response = await data.json();
      console.log(response);
      const matches = {
        matches: response.response.map((m) => {
          return {
            Id: m.game.id,
            StartDate: new Date(m.game.date).toISOString(),
            League: m.league.name,
            Status: 0,
            Team1: {
              TeamName: m.game.teams.home.name,
            },
            Team2: {
              TeamName: m.game.teams.away.name,
            },
          };
        }),
      };
      console.log(matches);
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(matches),
      };
      console.log("a");
      const response1 = await fetch(
        `https://localhost:7217/api/match/`,
        requestOptions
      );
    }, 43200000);
  }

  toastError = () => {
    toast.info(this.SupportToast, { autoClose: false });
  };

  sendMessage = async () => {
    try {
      await this.state.connection.invoke("SupportBusy", "Support is busy right now");
    } catch (e) {
      console.log(e);
    }
  }

   SupportToast = () => (
    <div>
      <span>Need support</span>
      <button className="btn btn-success" onClick={this.sendMessage}>Notify that support is busy</button>
    </div>
  );

  render() {
    return (
      <Layout>
        <PrivateRoute path="/" component={Home} exact />
        <Route path="/login-page" component={LoginPage} />
        <Route path="/register-page" component={RegisterPage} />
        <Route path="/resetPassword" component={ResetPassword} />
        <PrivateRoute path="/leagues" component={Leagues} />
        <PrivateRoute path="/leagueForm" component={LeagueForm} />
        <PrivateRoute path="/league/:id" component={League} />
        <PrivateRoute path="/prizes" component={Prizes} />
        <PrivateRoute path="/matches" component={Matches} />
        <PrivateRoute path="/match/:id/bets" component={MatchWithBets} />
        <PrivateRoute path="/maps" component={Maps} />
        <PrivateRoute path="/bets" component={Bets} />
        <PrivateRoute path="/bet/:id" component={Bet} />
        <PrivateRoute path="/betForm/:id" component={BetForm} />
        <PrivateRoute path="/supportChat" component={Chat} />
        <PrivateRoute path="/supportRate" component={SupportRating} />
        <Route path="/invite/:id/:league" component={InviteFriend} />
        <PrivateRoute
          path="/generate-link"
          component={GenerateInviteFriendLink}
        />
        <PrivateRoute path="/events" component={MatchesResults} />
        <PrivateRoute
          path="/event/:id/bets"
          exact
          component={MatchWithBetsResults}
        />
        <ToastContainer />
        <PrivateRoute path="/generate-link" component={GenerateInviteFriendLink} />
        <PrivateRoute path="/match/:id" component={Match} />
      </Layout>
    );
  }
}
