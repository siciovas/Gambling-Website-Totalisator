import { useState, useEffect } from "react";
import "./LeagueForm.css";
import { useHistory, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LeagueForm = () => {
  const [leaguePayload, setLeaguePayload] = useState({ title: "", description: "", creatorId: 1 });
  const history = useHistory();
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");

  useEffect(async () => {
    if (id !== null) {
      const response = await fetch(`https://localhost:7217/api/league/${id}`);
      const data = await response.json();
      setLeaguePayload(data);
    }
  }, []);

  const submitLeague = async (e) => {
    e.preventDefault();
    if (id !== null) {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leaguePayload)
      };
      const response = await fetch(`https://localhost:7217/api/league/`, requestOptions);
      if (response.ok) {
        const id = await response.json();
        history.push(`/league/${id}`);
      } else if(response.status === 409) {
        toastError();
      }
    } else {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leaguePayload)
      };
      const response = await fetch(`https://localhost:7217/api/league/`, requestOptions);
      if (response.ok) {
        const addedId = await response.json();
        history.push(`/league/${addedId}`);
      } else if(response.status === 409) {
        toastError();
      }
    }
  }

  const toastError = () => {
    toast.error("League is already exists.");
  }

  return (
    <div>
      <h1>{id ? "Redaguoti" : "Pridėti"} lygą</h1>
      <div className="d-flex justify-content-center">
        <form onSubmit={submitLeague}>
          <div class="form-group">
            <label for="exampleFormControlInput1">Lygos pavadinimas</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" value={leaguePayload.title} onChange={e => setLeaguePayload(leaguePayload => ({ ...leaguePayload, title: e.target.value }))} />
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Lygos aprašymas</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" value={leaguePayload.description} onChange={e => setLeaguePayload(leaguePayload => ({ ...leaguePayload, description: e.target.value }))}></textarea>
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-success mt-2">{id ? "Atnaujinti" : "Pridėti"}</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  )

}

export default LeagueForm;