import react, { useState, useEffect } from "react";
import './Leagues.css';
import logo from "../../Helpers/images/unnamed.jpg";
import League from "./League";
import { useHistory } from "react-router-dom";

const Leagues = ({ navigation }) => {
    const [allLeagues, setAllLeagues] = useState([]);
    const history = useHistory();

    useEffect(async () => {
        const response = await fetch("https://localhost:7217/api/league");
        console.log(response);
        const data = await response.json();
        setAllLeagues(data);
    }, []);

    const openLeague = (id) => {
        history.push(`/league/${id}`);
    }

    const addLeague = () => {
        history.push("/leagueForm");
    }

    return (
        <div class="container-sm">
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary" onClick={addLeague}>Pridėti</button>
            </div>
            <h1>Lygų sąrašas</h1>
            <br />
            <div className="d-flex justify-content-center">
                {allLeagues.map((league) => {
                    return (
                        <div class="card" onClick={() => openLeague(league.id)}>
                            <img class="card-img-top" src={logo} alt="Card image cap" />
                            <div class="card-body">
                                <p class="card-text">{league.title}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default Leagues;