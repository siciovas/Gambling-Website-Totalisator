import react, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { useHistory, useParams } from "react-router-dom";
import moment from 'moment-timezone';
import "./Match.css";
const Match = () => {
    const [match, setMatch] = useState();
    const params = useParams();

    useEffect(async () => {
        const id = params.id;
        const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com',
              'X-RapidAPI-Key': 'b681a7b402msh4470b0de5525d25p1d48f1jsne1e6bb92413b'
            }
          };
          const response = await fetch(`https://api-basketball.p.rapidapi.com/games?id=${id}`, options);
          const data = await response.json();
          console.log(data.response[0]);
          setMatch(data.response[0]);
    }, []);

    return (
        <> {match != undefined &&
            <><div className="participants d-flex">
                <div className="participant-home d-flex">
                    <span>{match.teams.home.name}</span>
                    <img className="team-logo" src={match.teams.home.logo}></img>
                </div>
                <div className="match-summary d-flex flex-column justify-content-center">
                    <div className="date d-flex justify-content-center">
                        {moment(match.date).format("YYYY-MM-DD")}
                    </div>
                    {match.status.short == "FT" &&
                        <div className="score d-flex justify-content-center">
                            {match.scores.home.total} - {match.scores.away.total}
                        </div>}
                </div>
                <div className="participant-away d-flex">
                    <span>{match.teams.away.name}</span>
                    <img src={match.teams.away.logo}></img>
                </div>
            </div><div className="section">
                    <div className="score-service d-flex">
                        <div className="section-header">Score</div>
                        <div className="qrt1">QT1</div>
                        <div className="qrt2">QT2</div>
                        <div className="qrt3">QT3</div>
                        <div className="qrt4">QT4</div>
                        <div className="ot">OT</div>
                    </div>
                    <div className="score-summary">
                        <div className="home-service d-flex">
                            <div className="team-home">
                                <span>{match.teams.home.name}</span>
                            </div>
                            <div className="home-qrt1">{match.scores.home.quarter_1 && match.scores.home.quarter_1}</div>
                            <div className="home-qrt2">{match.scores.home.quarter_2 && match.scores.home.quarter_2}</div>
                            <div className="home-qrt3">{match.scores.home.quarter_3 && match.scores.home.quarter_3}</div>
                            <div className="home-qrt4">{match.scores.home.quarter_4 && match.scores.home.quarter_4}</div>
                            <div className="home-ot">{match.scores.home.over_time && match.scores.home.over_time}</div>
                        </div>
                        <div className="away-service d-flex">
                            <div className="team-away">
                                <span>{match.teams.away.name}</span>
                            </div>
                            <div className="away-qrt1">{match.scores.away.quarter_1 && match.scores.away.quarter_1}</div>
                            <div className="away-qrt2">{match.scores.away.quarter_2 && match.scores.away.quarter_2}</div>
                            <div className="away-qrt3">{match.scores.away.quarter_3 && match.scores.away.quarter_3}</div>
                            <div className="away-qrt4">{match.scores.away.quarter_4 && match.scores.away.quarter_4}</div>
                            <div className="away-ot">{match.scores.away.over_time && match.scores.away.over_time}</div>
                        </div>
                    </div>
                </div></>
            }
        </>
    )
}

export default Match;