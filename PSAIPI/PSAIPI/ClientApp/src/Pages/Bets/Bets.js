import react, { useState, useEffect } from "react";
import './Bets.css';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


const Bets = ({ navigation }) => {
    const [allBets, setAllBets] = useState([]);
    const [allMatches, setAllMatches] = useState([]);
    const [ready, setReady] = useState(false);

    const history = useHistory();


    useEffect(async () => {

        const response = await fetch("https://localhost:7217/api/bet");
        console.log(response);
        const data = await response.json();

        const response1 = await fetch("https://localhost:7217/api/match");
        console.log(response1);
        const data1 = await response1.json();
        setAllMatches(data1);
        console.log(allMatches);
        var a = [];
        data.forEach((x) => {
            var match = data1.find((a) => a.id == x.matchId);
            console.log(match);
            x.match = match;
            a.push(x);
        });
        console.log("aaaaaaaaaa")

        setAllBets(a);
        console.log(a);
        setReady(true);

    }, []);

    const openLeague = (id) => {
        history.push(`/bet/${id}`);
    }

 
    const toastErrorr = () => {
        toast.error("User already has league!");
    }

    const Edit = (b) => {
        history.push(`/bet/${b.id}`);
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
                            <th scope="col">Spėjimas</th>
                            <th></th>
                            <th ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {ready && allBets.map((b, index) => {
                            return (
                                <tr>
                                    <th scope="row">{++index}</th>
                                    <td>{b.match.team1.teamName} vs {b.match.team2.teamName}</td>
                                    <td>{b.betName}</td>
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