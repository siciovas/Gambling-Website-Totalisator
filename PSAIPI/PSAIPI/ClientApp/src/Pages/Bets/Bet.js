import react, { useState, useEffect } from "react";
import "./Bets.css";
import logo from "../../Helpers/images/unnamed.jpg";
import { useParams, useHistory } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";

const Bet = ({ betInfo }) => {
    const [bet, setBet] = useState({});
    const [ready, setReady] = useState(false);
    const [show, setShow] = useState(false);
    const params = useParams();
    const history = useHistory();

    useEffect(async () => {
        const response = await fetch(`https://localhost:7217/api/bet/${params.id}`);
        const data = await response.json();
        setBet(data);

        const response1 = await fetch("https://localhost:7217/api/match");
        console.log(response1);
        const data1 = await response1.json();
      
        var match = data1.find((x) => bet.id == x.matchId);
        console.log(match);
        var temp;
        temp = data;
        console.log("aaa")
        console.log(temp);
        temp.match = match;
      
        setBet(temp);
        console.log(bet);
        setReady(true);

    }, []);

    const deleteBet = async () => {
        const response = await fetch(`https://localhost:7217/api/bet/${params.id}`, { method: 'DELETE' });

        if (!response.ok) {
            console.log("ERROR");
        }
        else if (response.ok) {
            setShow(false);
            history.push("/bets");
        }
    }

    const onDelete = () => {
        setShow(true);
    }

    const handleClose = () => {
        setShow(false);
    }

    const editLeague = () => {
        history.push(`/betForm?id=${bet.id}`);
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary me-5" onClick={editLeague}>Redaguoti</button>
                <button className="btn btn-danger" onClick={onDelete}>Ištrinti</button>
            </div>
            <div className="d-flex justify-content-center">
                {ready &&
                    <div>
                    <h3>{bet.match.team1.teamName} vs {bet.match.team2.teamName}</h3>
                    <h2> {bet.betName }</h2>
                    </div>
                }
               
            </div>
            <div className="d-flex justify-content-center mb-5">
                <img class="img-thumbnail" src={logo} alt="Card image cap" />
            </div>
            <div>
            </div>
        </div>
    )
}

export default Bet;
