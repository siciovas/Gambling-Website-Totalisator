import react, { useState, useEffect } from "react";
import "./League.css";
import logo from "../../Helpers/images/unnamed.jpg";
import { useParams, useHistory } from 'react-router-dom';

const League = ({ leagueInfo }) => {
    const [league, setLeague] = useState({});
    const params = useParams();
    const history = useHistory();

    useEffect(async () => {
        const id = params.id;
        const response = await fetch(`https://localhost:7217/api/league/${params.id}`);
        const data = await response.json();
        setLeague(data);
    }, []);

    const deleteLeague = async () => {
        const response = await fetch(`https://localhost:7217/api/league/${params.id}`, { method: 'DELETE' });
        const data = await response.json();

        if (!response.ok){
            console.log("ERROR");
        }
        else if(response.ok){
            history.push("/leagues");
        }
    }

    const editLeague = () =>{
        history.push(`/leagueForm?id=${league.id}`);
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary me-5" onClick={editLeague}>Redaguoti</button>
                <button className="btn btn-danger" onClick={deleteLeague}>Ištrinti</button>
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
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry the Bird</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry the Bird</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry the Bird</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry the Bird</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry the Bird</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry the Bird</td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>Larry the Bird</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default League;