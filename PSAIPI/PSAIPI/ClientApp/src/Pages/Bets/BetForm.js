import react, { useState, useEffect } from "react";
import "./Bets.css";
import logo from "../../Helpers/images/unnamed.jpg";
import { useHistory, useLocation, useParams} from 'react-router-dom';
import { Modal, Button, Form, select } from "react-bootstrap";

const BetForm = ({ betInfo }) => {
    const [bet, setBet] = useState({});
    const [ready, setReady] = useState(false);
    const [show, setShow] = useState(false);
    const [selectedBet, setSelectedBet] = useState("");
    const [allOptions, setAllOptions] = useState([]);
    const params = useParams();
    const history = useHistory();
    const search = useLocation().search;
    const id = new URLSearchParams(search).get("id");

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'api-basketball.p.rapidapi.com',
            'X-RapidAPI-Key': 'b681a7b402msh4470b0de5525d25p1d48f1jsne1e6bb92413b'
        }
    };

    useEffect(async () => {
        const response = await fetch(`https://localhost:7217/api/bet/${params.id}`);
        const data = await response.json();
        setBet(data);

        const response1 = await fetch("https://localhost:7217/api/match");
        console.log(response1);
        const data1 = await response1.json();
        console.log(data)
        console.log(data1)
        var match = data1.find((x) => data.matchId === x.id);
        console.log(match);
        var temp;
        temp = data;
        console.log("aaa")
        console.log(temp);
        temp.match = match;

        setBet(temp);
        console.log(temp);
        
        const data2 = await fetch(`https://api-basketball.p.rapidapi.com/odds?league=12&season=2021-2022&game=${match.id}&bookmaker=4`, options)
        console.log(data2);
        const response2 = await data2.json();
        console.log(response2)
        var bets = [];
        bets = response2.response[0].bookmakers[0].bets;
        console.log(bets);
        console.log(response2.response[0]);

        var visi = [];
        bets.forEach((x) => {
            var a = [];
            a = x.values;
            a.forEach((b) => {
                visi.push(`${x.name} ${b.value} ${b.odd}`)
            })
        })
        console.log(visi);

        setAllOptions(visi);
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

    const editBet = async (e) => {
        e.preventDefault();
        var payload =
        {
            betName: selectedBet,
            date: bet.date,
            id: bet.id,
            betAmount: 100,
            isValid: true,
            matchId: bet.matchId,
            leagueMemberId: bet.leagueMemberId
        };
        console.log(payload);
        
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            };
            const response = await fetch(`https://localhost:7217/api/bet/`, requestOptions);
            if (response.ok) {
                const id = await response.json();
                history.push(`/bets`);
            } else if (response.status === 409) {
            }
         
    }

    const handleChange = (e) => {
        console.log("Selected!!");
        setSelectedBet(e.target.value)
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-center">
                <h1>Cia galite redaguoti spėjima</h1>
            </div>
            <div className="d-flex justify-content-center">
                {ready &&
                    <div>
                  {/*  <h3>{bet.match.team1.teamName} vs. {bet.match.team2.teamName}</h3>*/}
                    </div>
                }

            </div>
            <div className="d-flex justify-content-center mb-5">
                <img class="img-thumbnail" src={logo} alt="Card image cap" />
            </div>
            <div>
                {ready &&
                    <div>
                    <h3>Pasirinkite kita baigti: </h3>
                    <Form>
                        <select onChange={handleChange} class="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                            {allOptions.map((opt) => {
                                return (
                                    <option> { opt } </option>
                                );
                            })}
                        </select>
                        <Button onClick={editBet}>Redaguoti</Button>
                    </Form>
                    </div>
                }
            </div>
        </div>
    )
}

export default BetForm;