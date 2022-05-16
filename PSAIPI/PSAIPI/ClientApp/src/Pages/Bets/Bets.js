import react, { useState, useEffect } from "react";
import './Bets.css';
import logo from "../../Helpers/images/unnamed.jpg";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const Bets = ({ navigation }) => {
    const [allBets, setAllBets] = useState([]);
    const history = useHistory();

    useEffect(async () => {
        const response = await fetch("https://localhost:7217/api/bet");
        console.log(response);
        const data = await response.json();
        setAllBets(data);
    }, []);

    const openLeague = (id) => {
        history.push(`/bet/${id}`);
    }

 
    const toastErrorr = () => {
        toast.error("User already has league!");
    }

    const Edit = (b) => {

    }

    return (
        <div class="container-sm">
            <div className="d-flex justify-content-end">
            </div>
            <h1>Spėjimų sąrašas</h1>
            <br />
            <div className="d-flex justify-content-center">
                <table class="table mt-5">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Rungtynės</th>
                            <th scope="col">Spėjamas laimėtojas</th>
                            <th></th>
                            <th ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allBets.map((b, index) => {
                            return (
                                <tr>
                                    <th scope="row">{++index}</th>
                                    <td>{b.match.team1.teamName} vs {b.match.team2.teamName}</td>
                                    <td>{b.match.winnerTeamName}</td>
                                    <td><button className="btn btn-success" onClick={() => Edit(b)}>Edit</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div >
    )
}

export default Bets;