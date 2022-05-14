import react, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from "react-router-dom";
import moment from 'moment-timezone';

const Matches = () => {
    const [allMatches, setAllMatches] = useState([]);
    const history = useHistory();
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
        const t = new Date(matchesResponseJSON[0].startDate).toISOString();
        setAllMatches(matchesResponseJSON);
    }, [])

    const importData = async () => {
        const data = await fetch(`https://api-basketball.p.rapidapi.com/odds?league=12&season=2021-2022`, options)
        const response = await data.json();
        console.log(response.response[0].game.id);
        
        const data = await fetch(`https://api-basketball.p.rapidapi.com/odds?league=12&season=2021-2022`, options)
        const response = await data.json();
        console.log(response);
        const matches = { matches:
            response.response.map((m) => {
                return (
                    {
                        Id: m.game.id,
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
    }

    const openBets = (id) => {
        const match = allMatches.filter((m) => m.id === id);
        console.log(match[0].startDate < new Date());
        console.log(moment(match[0].startDate).add(3, 'hours').format("YYYY-MM-DD HH:mm:ss"));
        console.log(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
        if(moment(match[0].startDate).add(3, 'hours').format("YYYY-MM-DD HH:mm:ss").localeCompare(moment(new Date()).format("YYYY-MM-DD HH:mm:ss")) == -1
            || moment(match[0].startDate).add(3, 'hours').format("YYYY-MM-DD HH:mm:ss").localeCompare(moment(new Date()).format("YYYY-MM-DD HH:mm:ss")) == 0) {
            toastErrorrTooLate();
        } else {
            history.push(`/match/${id}/bets`);
        }
        
    }

    const toastErrorrTooLate= () => {
        toast.error("Too late to make this bet!");
      }
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
                <th ></th>
                </tr>
            </thead>
            <tbody>
                {allMatches.map((m, index) => {
                    return (
                        <tr>
                        <th scope="row">{++index}</th>
                        <td>{m.team1.teamName} vs {m.team2.teamName}</td>
                        <td>{moment(m.startDate).add(3, 'hours').format("YYYY-MM-DD HH:mm")}</td>
                        <td><button className="btn btn-success" onClick={() => openBets(m.id)}>Bet</button></td>
                        <td>{moment(m.startDate).format("YYYY-MM-DD HH:mm")}</td>
                        </tr>
                    )
                })}
            </tbody>
            </table>
            <ToastContainer />
        </>
    )
}

export default Matches;