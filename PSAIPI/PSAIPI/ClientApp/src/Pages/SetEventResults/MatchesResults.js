import react, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import moment from "moment-timezone";

const Matches = () => {
  const [allMatches, setAllMatches] = useState([]);
  const history = useHistory();
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "api-basketball.p.rapidapi.com",
      "X-RapidAPI-Key": "b681a7b402msh4470b0de5525d25p1d48f1jsne1e6bb92413b",
    },
  };

  useEffect(async () => {
    const matchesResponse = await fetch(`https://localhost:7217/api/match/`);
    const matchesResponseJSON = await matchesResponse.json();
    console.log(matchesResponseJSON);
    const t = new Date(matchesResponseJSON[0].startDate).toISOString();
    setAllMatches(matchesResponseJSON);
  }, []);

  const openBets = (id) => {
    history.push(`/event/${id}/bets`);
  };

  return (
    <>
      <h1>NBA Matches</h1>
      <table class="table mt-5">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Rungtynės</th>
            <th scope="col">Pradžios laikas</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allMatches.map((m, index) => {
            return (
              <tr>
                <th scope="row">{++index}</th>
                <td>
                  {m.team1.teamName} vs {m.team2.teamName}
                </td>
                <td>
                  {moment(m.startDate)
                    .add(3, "hours")
                    .format("YYYY-MM-DD HH:mm")}
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => openBets(m.id)}
                  >
                    Select
                  </button>
                </td>
                <td>{moment(m.startDate).format("YYYY-MM-DD HH:mm")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer />
    </>
  );
};

export default Matches;
