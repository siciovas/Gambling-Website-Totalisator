import react, { useState, useEffect } from "react";
import logo from "../../Helpers/images/prize.jpg";
import { useHistory } from "react-router-dom";

const Prizes = ({ navigation }) => {
  const [prizes, setPrizes] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    const response = await fetch("https://localhost:7217/api/prize");
    console.log(response);
    const data = await response.json();
    setPrizes(data);
  }, []);

  return (
    <div class="container-sm">
      <div className="d-flex justify-content-end"></div>
      <h1>Prizų sąrašas</h1>
      <br />
      <div className="d-flex justify-content-center">
        {prizes.map((prize) => {
          return (
            <div class="card">
              <img class="card-img-top" src={logo} alt="Card image cap" />
              <div class="card-body text-center">
                <p class="card-text">
                  <b>{prize.name}</b>
                </p>
                <p class="card-text">Kaina (taškais): {prize.cost}</p>
                <button className="btn btn-success">Atsiimti prizą</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Prizes;
