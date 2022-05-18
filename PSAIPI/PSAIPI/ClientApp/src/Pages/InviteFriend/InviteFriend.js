import { useState } from "react"
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const InviteFriend = () => {
    const [details, setDetails] = useState({ email: "", password: "" });
    const params = useParams();

    const submitHandler = async (e) => {
        e.preventDefault();
    
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(details),
        };
        const response = await fetch(
          `https://localhost:7217/api/login/`,
          requestOptions
        );
        if (response.ok) {
          const userPayload = await response.json();
          console.log(userPayload);
          localStorage.setItem("userId", JSON.stringify(userPayload.id));
          localStorage.setItem("isLogged", JSON.stringify(true));
          localStorage.setItem("roleId", JSON.stringify(userPayload.roleId));
          joinLeague();
        } else if (response.status === 401) {
          toastError();
        }
      };

      const joinLeague = async () => {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        };
        const userId = JSON.parse(localStorage.getItem("userId"));
        const response = await fetch(
          `https://localhost:7217/api/league/joinLeague/${userId}/${params.id}`,
          requestOptions
        );
        console.log(response.status);
        if(response.ok){
            toast.success("You have successfully joined to league");
        }
        if (response.status === 409) {
          toast.error("You already has league");
        }
      };

      const toastError = () => {
        toast.error("Impossible to login.");
      };

    return (
        <div>
          <h1>{`Norėdami prisijungti į ${params.league} lygą suveskite paskyros duomenis`}</h1>
          <div className="d-flex justify-content-center">
            <form onSubmit={submitHandler}>
              <div class="form-group">
                <label for="exampleFormControlInput1">Email</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" value={details.email} onChange={e => setDetails(detail => ({ ...detail, email: e.target.value }))} />
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Password</label>
                <input type="password" class="form-control" id="exampleFormControlInput1" value={details.password} onChange={e => setDetails(detail => ({ ...detail, password: e.target.value }))} />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-success mt-2">Prisijungti</button>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
    )
}

export default InviteFriend;