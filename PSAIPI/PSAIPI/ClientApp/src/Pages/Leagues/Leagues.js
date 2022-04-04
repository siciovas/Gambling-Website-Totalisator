import react, { useState, useEffect } from "react";
import './Leagues.css';
import logo from "../../Helpers/images/unnamed.jpg";
import League from "./League";
import { useHistory } from "react-router-dom";

const Leagues = ({ navigation }) => {
    const [allLeagues, setAllLeagues] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const tempLeagues = [];
        [...Array(10)].map((x, i) => tempLeagues.push(`Lyga ${i}`));
        setAllLeagues(tempLeagues);
    }, {});

    const openLeague = (league) => {
        history.push("/league");
    }

    return (
        <div class="container-sm">
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary">Pridėti</button>
            </div>
            <h1>Lygų sąrašas</h1>
            <br />
            <div className="d-flex justify-content-center">
                {allLeagues.map((league) => {
                    return (
                        <div class="card" onClick={() => openLeague(league)}>
                            <img class="card-img-top" src={logo} alt="Card image cap" />
                            <div class="card-body">
                                <p class="card-text">{league}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default Leagues;