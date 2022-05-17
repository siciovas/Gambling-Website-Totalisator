import react, { useState, useEffect } from "react";
import './Bets.css';
import { useParams, useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment-timezone';
import { Modal, Button } from "react-bootstrap";

const Bets = ({ navigation }) => {
    const [allBets, setAllBets] = useState([]);
    const [allMatches, setAllMatches] = useState([]);
    const [ready, setReady] = useState(false);
    const [show, setShow] = useState(false);
    const [betId, setBetId] = useState(-1);



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
 
    const Edit = (b) => {
        if (!ToLateToEdit) {
            console.log("not to late")
        }
        else {
            toastErrorrTooLate();
        }
    }

    const View = (b) => {
        history.push(`/bet/${b.id}`);
    }

    const deleteBet = async () => {
        console.log(betId)
        const response = await fetch(`https://localhost:7217/api/bet/${betId}`, { method: 'DELETE' });

        if (!response.ok) {
            console.log("ERROR");
        }
        else if (response.ok) {
            setShow(false);
            history.push("/bets");
        }
        window.location.reload(false);

    }

    const onDelete = (b) => {
        if (ToLateToEdit) {
            setShow(true);
            setBetId(b.id);
        }
        else {
            toastErrorrTooLate();
        }
       
    }

    const handleClose = () => {
        setShow(false);
    }

    const ToLateToEdit = (b) => 
        moment(b.match.startDate).add(3, 'hours').format("YYYY-MM-DD HH:mm:ss").localeCompare(moment(new Date()).format("YYYY-MM-DD HH:mm:ss")) == -1
            || moment(b.match.startDate).add(3, 'hours').format("YYYY-MM-DD HH:mm:ss").localeCompare(moment(new Date()).format("YYYY-MM-DD HH:mm:ss")) == 0;
    

    const toastErrorrTooLate = () => {
        toast.error("Too late to edit this bet!");
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
                                    <td><button className="btn btn-success" onClick={() => View(b)}>Peržiūrėti</button></td>
                                    <td><button className="btn btn-success" onClick={() => Edit(b)}>Redaguoti</button></td>
                                    <td><button className="btn btn-danger" onClick={() => onDelete(b)}>Trinti</button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ištrinti  spejima</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Ar tikrai norite ištrinti šį spėjimą?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deleteBet()}>Taip</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </div >
    )
}

export default Bets;