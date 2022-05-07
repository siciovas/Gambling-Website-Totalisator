import react, { useState, useEffect } from "react";
import './Leagues.css';
import logo from "../../Helpers/images/unnamed.jpg";
import League from "./League";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


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

    const joinLeague = async (id) => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          };
        const response = await fetch(`https://localhost:7217/api/league/joinLeague/${1}/${id}`, requestOptions);
        console.log(response.status);
        if (response.status === 409) {
            toastErrorr();
          }
    }

    const toastErrorr= () => {
        toast.error("User already has league!");
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
                        <div class="card" >
                            <img class="card-img-top" src={logo} alt="Card image cap" onClick={() => openLeague(league.id)} />
                            <div class="card-body text-center">
                                <p class="card-text">{league.title}</p>
                                <button className="btn btn-success" onClick={() => joinLeague(league.id)} >Prisijungti</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            <ToastContainer />
        </div >
    )
}

export default Leagues;