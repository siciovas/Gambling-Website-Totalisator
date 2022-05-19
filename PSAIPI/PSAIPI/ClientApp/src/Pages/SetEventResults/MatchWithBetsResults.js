import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment-timezone";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "./MatchWithBetsResults.css";

const MatchWithBets = () => {
  const [allBets, setAllBets] = useState([]);
  const [matchId, setMatchId] = useState(0);
  const [team, setTeam] = useState("");
  const [betPayload, setBetPayload] = useState({});

  const params = useParams();

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "api-basketball.p.rapidapi.com",
      "X-RapidAPI-Key": "b681a7b402msh4470b0de5525d25p1d48f1jsne1e6bb92413b",
    },
  };

  useEffect(async () => {
    const matchId = params.id;
    const data = await fetch(
      `https://api-basketball.p.rapidapi.com/odds?league=12&season=2021-2022&game=${matchId}&bookmaker=4`,
      options
    );
    const response = await data.json();
    setAllBets(response.response[0].bookmakers[0].bets);
    const team = `${response.response[0].game.teams.home.name} - ${
      response.response[0].game.teams.away.name
    } ${moment(response.response[0].game.date).format("YYYY-MM-DD HH:mm")}`;
    setTeam(team);
    setMatchId(response.response[0].game.id);
    console.log(response.response[0]);
  }, []);

  const handleWin = async (bet, name) => {
    let leagueMemberId = localStorage.getItem("leagueMemberId");
    var payload = {
      betName: `${name} | ${bet.value}`,
      odds: bet.odd,
      date: "2022-05-16T17:53:45.381Z",
      betAmount: 100,
      isValid: true,
      matchId: matchId,
      leagueMemberId: leagueMemberId,
      status: "Won",
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    const response = await fetch(
      `https://localhost:7217/api/MatchApproval/won`,
      requestOptions
    );
    if (leagueMemberId == null) {
      toast.error("Prisijunkite į lygą prieš atliekant spėjimą");
    } else if (response.ok) {
      toast.success("Statymai pažymėti kaip laimėti");
    }
  };

  const handleLoss = async (bet, name) => {
    let leagueMemberId = localStorage.getItem("leagueMemberId");
    if (leagueMemberId == null) {
    }
    var payload = {
      betName: `${name} | ${bet.value}`,
      date: "2022-05-16T17:53:45.381Z",
      betAmount: 100,
      isValid: true,
      matchId: matchId,
      leagueMemberId: leagueMemberId,
      status: "Lost",
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    const response = await fetch(
      `https://localhost:7217/api/MatchApproval/lost`,
      requestOptions
    );
    if (response.ok) {
      toast.success("Statymai pažymėti kaip pralaimėti");
    }
  };

  return (
    <>
      <h1>{team}</h1>

      <div id="accordion">
        {allBets.length > 0 &&
          allBets.map((b, index) => {
            return (
              <div class="card w-100 overflow-auto">
                <div class="card-header" id={"heading" + index}>
                  <h5 class="mb-0">{b.name}</h5>
                </div>
                <div class="card-body">
                  <ul class="list-group">
                    {b.values.map((bet) => {
                      return (
                        <li
                          class="list-group-item mb-1"
                          style={{
                            backgroundColor: "#6D0101",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        >
                          <div className="d-flex justify-content-between">
                            <span>{bet.value}</span>
                            <span>{bet.odd}</span>

                            <Button onClick={() => handleWin(bet, b.name)}>
                              Laimėtas
                            </Button>
                            <Button onClick={() => handleLoss(bet, b.name)}>
                              Pralaimėtas
                            </Button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
      </div>
      <ToastContainer />
    </>
  );
};

export default MatchWithBets;
