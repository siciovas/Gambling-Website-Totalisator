import react, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Moment from 'moment';

const Matches = () => {
    const [allMatches, setAllMatches] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com',
            'X-RapidAPI-Key': 'b681a7b402msh4470b0de5525d25p1d48f1jsne1e6bb92413b'
        }
      };

    useEffect(async () => {}, [])

    const importData = async () => {
        
        
        const data = await fetch(`https://api-basketball.p.rapidapi.com/odds?league=12&season=2021-2022`, options)
        const response = await data.json();
        console.log(response);
        const matches = { matches:
            response.response.map((m) => {
                return (
                    {
                        StartDate: new Date(m.game.date).toISOString(),
                        League: m.league.name,
                        Status: 0,
                        Teams: [
                            {
                                TeamName: m.game.teams.home.name
                            },
                            {
                                TeamName: m.game.teams.away.name
                            }
                        ]    
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
            {allMatches.filter((m) => m.game.status.short === 'NS').map((m => {
                return (
                    <><h1>
                        {m.game.teams.home.name} vs {m.game.teams.away.name}
                    </h1><br /></>
                )
            }))}
        </>
    )
}

export default Matches;