import react, { useState, useEffect } from "react";
import "./Bets.css";
import logo from "../../Helpers/images/unnamed.jpg";
import { useParams, useHistory } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";

const Bet = ({ betInfo }) => {
    const [bet, setBet] = useState({});
    const [show, setShow] = useState(false);
    const params = useParams();
    const history = useHistory();

    useEffect(async () => {
        const response = await fetch(`https://localhost:7217/api/bet/${params.id}`);
        const data = await response.json();
        setBet(data);
    }, []);

    const deleteBet = async () => {
        const response = await fetch(`https://localhost:7217/api/bet/${params.id}`, { method: 'DELETE' });

        if (!response.ok) {
            console.log("ERROR");
        }
        else if (response.ok) {
            setShow(false);
            history.push("/leagues");
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
                <h3>{league.title}</h3>
            </div>
            <div className="d-flex justify-content-center mb-5">
                <img class="img-thumbnail" src={logo} alt="Card image cap" />
            </div>
            <div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Narys</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leagueMembers.map((x => {
                            return (
                                <tr>
                                    <th scope="col">{x.id}</th>
                                    <th scope="col">{x.user.name + " " + x.user.surname}</th>
                                </tr>
                            )
                        }))}
                    </tbody>
                </table>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Ištrinti {league.title} lygą</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Ar tikrai norite ištrinti šią lygą?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteLeague}>Taip</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default League;
