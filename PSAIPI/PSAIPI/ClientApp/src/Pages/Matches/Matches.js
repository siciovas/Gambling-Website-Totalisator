import react, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment-timezone';

const Matches = () => {
    const [allMatches, setAllMatches] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com',
            'X-RapidAPI-Key': 'b681a7b402msh4470b0de5525d25p1d48f1jsne1e6bb92413b'
        }
      };

    useEffect(async () => {
        const matchesResponse = await fetch(`https://localhost:7217/api/match/`);
        const matchesResponseJSON = await matchesResponse.json();
        console.log(matchesResponseJSON);
        setAllMatches(matchesResponseJSON);
    }, [])

    const importData = async () => {
        
        
        const data = await fetch(`https://api-basketball.p.rapidapi.com/odds?league=12&season=2021-2022`, options)
        const response = await data.json();
        console.log(response);
        const matches = { matches:
            response.response.map((m) => {
                return (
                    {
                        EndDate: new Date(m.game)
                        StartDate: new Date(m.game.date).toISOString(),
                        League: m.league.name,
                        Status: 0,
                        Team1:
                            {
                                TeamName: m.game.teams.home.name
                            },
                        Team2:
                            {
                                TeamName: m.game.teams.away.name
                            }
                    })  
            })
        }
        console.log(matches);
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(matches)
          };
          console.log("a");
          const response1 = await fetch(`https://localhost:7217/api/match/`, requestOptions);
          console.log(response1);
        // console.log(response);
        // setAllMatches(response.response);
    }

    return (
        <>
            <h1>NBA Matches</h1>
            <button className="btn btn-success" onClick={() => importData()}>Import data</button>
            <table class="table mt-5">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Rungtynės</th>
                <th scope="col">Pradžios laikas</th>
                </tr>
            </thead>
            <tbody>
                {allMatches.map((m, index) => {
                    return (
                        <tr>
                        <th scope="row">{++index}</th>
                        <td>{m.team1.teamName} vs {m.team2.teamName}</td>
                        <td>{moment(m.startDate).add(3, 'hours').format("YYYY-MM-DD HH:mm")}</td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
            
        </>
    )
}

export default Matches;