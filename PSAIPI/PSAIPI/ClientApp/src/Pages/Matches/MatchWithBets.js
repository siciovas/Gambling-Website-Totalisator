import { useEffect, useState } from "react"
import { useParams, useHistory } from 'react-router-dom';
import moment from "moment-timezone";
import './MatchWithBets.css';

const MatchWithBets = () => {
    const [allBets, setAllBets] = useState({});
    const [team, setTeam] = useState("");
    const params = useParams();

    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com',
          'X-RapidAPI-Key': 'b681a7b402msh4470b0de5525d25p1d48f1jsne1e6bb92413b'
        }
      };

    useEffect(async () => {
        // const matchId = params.id;
        // const data = await fetch(`https://api-basketball.p.rapidapi.com/odds?league=12&season=2021-2022&game=${matchId}&bookmaker=4`, options)
        // const response = await data.json();
        // setAllBets(response.response[0].bookmakers[0].bets);
        // const team = `${response.response[0].game.teams.home.name} - ${response.response[0].game.teams.away.name} ${moment(response.response[0].game.date).format("YYYY-MM-DD HH:mm")}`;
        // setTeam(team);
        // console.log(response.response[0]);
    }, [])

    return (
        <>
        <h1>{team}</h1>
        <div id="accordion">
            {allBets.length > 0 && allBets.map((b, index) => {
                return (
                    <div class="card w-100 overflow-auto">
                        <div class="card-header" id={"heading" + index}>
                            <h5 class="mb-0">
                                {b.name}
                            </h5>
                        </div>
                        <div class="card-body">
                        <ul class="list-group">
                            {b.values.map((bet) => {
                                return (
                                    <li class="list-group-item mb-1" style={{backgroundColor: "#6D0101", color: "white", fontWeight: "bold" }} >
                                        <div className="d-flex justify-content-between">
                                            <span>{bet.value}</span>
                                            <span>{bet.odd}</span>
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
        </>
    )
}

export default MatchWithBets;